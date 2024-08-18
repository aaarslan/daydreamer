import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Datepicker, type DatepickerProps } from "../datepicker";
import styles from "./datepickerinput.module.css";

interface DatepickerInputProps extends Omit<DatepickerProps, "onChange"> {
  onChange: (date: Date | Date[] | null) => void;
  placeholder?: string;
  inputFormat?: string;
}

export const DatepickerInput: React.FC<DatepickerInputProps> = ({
  onChange,
  value,
  placeholder = "Select date",
  inputFormat = "MM/dd/yyyy",
  selectionMode = "single",
  ...datepickerProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date | Date[] | undefined | null): string => {
    if (!date || date === null) return "";
    const dateFormatter = new Intl.DateTimeFormat(
      datepickerProps.locale || "en-US",
      { dateStyle: "short" },
    );

    if (Array.isArray(date)) {
      if (selectionMode === "range" && date.length === 2) {
        return `${dateFormatter.format(date[0])} - ${dateFormatter.format(date[1])}`;
      }
      return date.map((d) => dateFormatter.format(d)).join(", ");
    }
    return dateFormatter.format(date);
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
          aria-expanded={isOpen}
        />
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear date selection"
          >
            ×
          </button>
        )}
      </div>
      {isOpen && (
        <div className={styles.calendarContainer}>
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
};
