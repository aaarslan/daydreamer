import type React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { DateFormatter } from "../../utils/date-formatter";
import { Datepicker, type DatepickerProps } from "../datepicker";
import styles from "./datepickerinput.module.css";

export interface DatepickerInputProps
  extends Omit<DatepickerProps, "onChange"> {
  /** Callback fired when date selection changes, can return null for cleared selection */
  onChange: (date: Date | Date[] | null) => void;

  /** Placeholder text for the input field */
  placeholder?: string;

  /** Input date format (currently not used, formatting handled by DateFormatter) */
  inputFormat?: string;

  /** Additional CSS class name for the container */
  className?: string;

  /** Whether the input should be disabled */
  disabled?: boolean;

  /** Whether to show the clear button when a date is selected */
  showClearButton?: boolean;

  /** Custom icon component for the input */
  icon?: React.ReactNode;

  /** Position of the calendar dropdown */
  dropdownPosition?: "bottom" | "top" | "auto";
}

export const DatepickerInput: React.FC<DatepickerInputProps> = memo(
  ({
    onChange,
    value,
    placeholder = "Select date",
    inputFormat = "MM/dd/yyyy",
    selectionMode = "single",
    ...datepickerProps
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const formatter = new DateFormatter(datepickerProps.locale || "en-US", {
      dateStyle: "short",
    });

    const formatDate = (date: Date | Date[] | undefined | null): string => {
      if (!date || date === null) return "";
      return formatter.format(date);
    };

    const handleInputClick = () => {
      setIsOpen(true);
    };

    const handleDateChange = (newDate: Date | Date[]) => {
      onChange(newDate);
      if (
        selectionMode === "single" ||
        (selectionMode === "range" &&
          Array.isArray(newDate) &&
          newDate.length === 2)
      ) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        setIsOpen(true);
      }
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onChange(null);
    };

    return (
      <div className={styles.container} ref={containerRef}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            value={formatDate(value)}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly
            aria-haspopup="true"
            aria-label={`Date picker input. Current value: ${formatDate(value) || "No date selected"}`}
          />
          {value && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear date selection"
              tabIndex={0}
            >
              ×
            </button>
          )}
        </div>
        {isOpen && (
          <div
            className={styles.calendarContainer}
            role="dialog"
            aria-modal="true"
            aria-label="Date picker"
          >
            <Datepicker
              {...datepickerProps}
              value={value}
              onChange={handleDateChange}
              selectionMode={selectionMode}
            />
          </div>
        )}
      </div>
    );
  },
);
