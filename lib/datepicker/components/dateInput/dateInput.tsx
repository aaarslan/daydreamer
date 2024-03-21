import { useNumberFormat } from "@react-input/number-format";
import { format, getDaysInMonth } from "date-fns";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { DatepickerContext } from "../../provider";
import { CalendarIcon } from "./calendarIcon";

export interface DateInputProps {
  placeholder?: "/" | "-" | "." | string;
  maxYear?: number;
  minYear?: number;
}

const DateInput: React.FC<DateInputProps> = ({
  placeholder = "/",
  minYear = 1900,
  maxYear = 2100,
}: DateInputProps) => {
  const { selectedDate, setSelectedDate, locale, open, setOpen } =
    useContext(DatepickerContext);

  const [month, setMonth] = useState(
    selectedDate ? selectedDate.getMonth() + 1 : "",
  );
  const [day, setDay] = useState(selectedDate ? selectedDate.getDate() : "");
  const [year, setYear] = useState(
    selectedDate ? selectedDate.getFullYear() : "",
  );

  const dayRef = useNumberFormat({
    locales: locale?.code,
    signDisplay: "never",
    groupDisplay: false,
    maximumIntegerDigits: 2,
    minimumFractionDigits: 0,
  });

  const yearRef = useNumberFormat({
    locales: locale?.code,
    signDisplay: "never",
    groupDisplay: false,
    maximumIntegerDigits: 4,
    minimumFractionDigits: 0,
  });

  const monthRef = useNumberFormat({
    locales: locale?.code,
    signDisplay: "never",
    groupDisplay: false,
    maximumIntegerDigits: 2,
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    if (selectedDate) {
      const newMonth = selectedDate.getMonth() + 1;
      const newDay = selectedDate.getDate();
      const newYear = selectedDate.getFullYear();
      setMonth(newMonth.toString());
      setDay(newDay.toString());
      setYear(newYear.toString());
    }
  }, [selectedDate]);

  const updateSelectedDate = (y: number, m: number, d: number) => {
    if (
      y >= minYear &&
      y <= maxYear &&
      m >= 1 &&
      m <= 12 &&
      d >= 1 &&
      d <= getDaysInMonth(new Date(y, m - 1))
    ) {
      setSelectedDate(new Date(y, m - 1, d));
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMonth = Number.parseInt(e.target.value);
    if (newMonth > 12) {
      newMonth = 12;
    }
    setMonth(newMonth.toString());
    updateSelectedDate(
      year ? Number.parseInt(year.toString()) : new Date().getFullYear(),
      newMonth,
      day ? Number.parseInt(day.toString()) : 1,
    );
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDay = Number.parseInt(e.target.value);
    const maxDay = getDaysInMonth(
      new Date(
        Number.parseInt(year.toString()) || new Date().getFullYear(),
        month ? Number.parseInt(month.toString()) - 1 : 0,
      ),
    );
    if (newDay > maxDay) {
      newDay = maxDay;
    }
    setDay(newDay.toString());
    updateSelectedDate(
      year ? Number.parseInt(year.toString()) : new Date().getFullYear(),
      month ? Number.parseInt(month.toString()) : 1,
      newDay,
    );
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleYearBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let newYear = Number.parseInt(e.target.value);
    if (Number.isNaN(newYear)) {
      newYear = new Date().getFullYear();
    }
    if (newYear >= 0 && newYear <= 99) {
      newYear += 2000;
    }
    if (newYear < minYear) {
      newYear = minYear;
    } else if (newYear > maxYear) {
      newYear = maxYear;
    }
    setYear(newYear.toString());
    updateSelectedDate(
      newYear,
      month ? Number.parseInt(month.toString()) : 1,
      day ? Number.parseInt(day.toString()) : 1,
    );
  };

  return (
    <div className="date-input-container">
      <input
        ref={monthRef}
        className="date-input"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={month}
        onChange={handleMonthChange}
        min="1"
        max="12"
        placeholder={format(new Date(), "MM", { locale })}
      />
      <span
        className={
          month || day || year
            ? "date-input-separator"
            : "date-input-separator placeholder-color"
        }
      >
        {placeholder}
      </span>
      <input
        ref={dayRef}
        className="date-input"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={day}
        onChange={handleDayChange}
        min="1"
        max="31"
        placeholder={format(new Date(), "dd", { locale })}
      />
      <span
        className={
          month || day || year
            ? "date-input-separator"
            : "date-input-separator placeholder-color"
        }
      >
        {placeholder}
      </span>
      <input
        ref={yearRef}
        className="date-input-year"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={year}
        onChange={handleYearChange}
        onBlur={handleYearBlur}
        min={minYear}
        max={maxYear}
        placeholder={format(new Date(), "yyyy", { locale })}
      />
      <button
        type="button"
        className="date-input-button"
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon height={14} width={14} />
      </button>
    </div>
  );
};

export { DateInput };
