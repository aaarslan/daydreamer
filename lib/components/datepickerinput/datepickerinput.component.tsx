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

  /** Size variant of the input */
  size?: "small" | "medium" | "large";

  /** Whether the input is in a loading state */
  loading?: boolean;

  /** Error message to display */
  error?: string;

  /** Whether the input is required */
  required?: boolean;

  /** Custom date range separator for display */
  rangeSeparator?: string;
}

export const DatepickerInput: React.FC<DatepickerInputProps> = memo(
  ({
    onChange,
    value,
    placeholder = "Select date",
    inputFormat = "MM/dd/yyyy",
    selectionMode = "single",
    disabled = false,
    showClearButton = true,
    icon,
    dropdownPosition = "bottom",
    size = "medium",
    loading = false,
    error,
    required = false,
    rangeSeparator = " - ",
    className,
    ...datepickerProps
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const formatter = new DateFormatter(datepickerProps.locale || "en-US", {
      dateStyle: "short",
    });

    const formatDate = (date: Date | Date[] | undefined | null): string => {
      if (!date || date === null) return "";

      if (Array.isArray(date)) {
        if (selectionMode === "range" && date.length === 2) {
          return `${formatter.format(date[0])}${rangeSeparator}${formatter.format(date[1])}`;
        }
        if (selectionMode === "multiple") {
          return date.map((d) => formatter.format(d)).join(", ");
        }
        if (date.length === 1) {
          return formatter.format(date[0]);
        }
        return "";
      }

      return formatter.format(date);
    };

    const handleInputClick = () => {
      if (!disabled && !loading) {
        setIsOpen(true);
      }
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
      if (disabled || loading) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onChange(null);
    };

    const containerClasses = [
      styles.container,
      className,
      styles[size],
      disabled && styles.disabled,
      loading && styles.loading,
      error && styles.error,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses} ref={containerRef}>
        <div className={styles.inputWrapper}>
          {icon && <div className={styles.iconWrapper}>{icon}</div>}
          <input
            type="text"
            className={styles.input}
            value={formatDate(value)}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            required={required}
            aria-haspopup="true"
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${containerRef.current?.id || "datepicker"}-error`
                : undefined
            }
            aria-label={`Date picker input. Current value: ${formatDate(value) || "No date selected"}`}
          />
          {loading && (
            <div className={styles.loadingSpinner}>
              <span aria-hidden="true">⟳</span>
              <span className="sr-only">Loading</span>
            </div>
          )}
          {value && showClearButton && !loading && !disabled && (
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
        {error && (
          <div
            className={styles.errorMessage}
            id={`${containerRef.current?.id || "datepicker"}-error`}
            role="alert"
          >
            {error}
          </div>
        )}
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
