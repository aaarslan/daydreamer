import type React from "react";
import { useCallback, useId, useMemo, useState } from "react";
import { Day } from "../day";
import { MonthHeader } from "../month";
import { WeekdayHeader } from "../week";
import styles from "./datepicker.module.css";

export interface DatepickerProps {
  onChange: (date: Date | Date[]) => void;
  value?: Date | Date[] | null;
  dateFormat?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  firstDayOfWeek?: number;
  selectionMode?: "single" | "range" | "multiple";
  numberOfMonths?: number;
  customStyles?: {
    container?: React.CSSProperties;
    day?: React.CSSProperties;
    selectedDay?: React.CSSProperties;
    rangeDay?: React.CSSProperties;
    disabledDay?: React.CSSProperties;
    monthHeader?: React.CSSProperties;
    weekdayHeader?: React.CSSProperties;
  };
}

export function Datepicker({
  onChange,
  value,
  locale = "en-US",
  minDate,
  maxDate,
  isDateDisabled,
  firstDayOfWeek = 0,
  selectionMode = "single",
  numberOfMonths = 1,
  customStyles = {},
}: DatepickerProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  });
  const [visibleMonth, setVisibleMonth] = useState(() => {
    return value
      ? Array.isArray(value)
        ? new Date(value[0].getFullYear(), value[0].getMonth(), 1)
        : new Date(value.getFullYear(), value.getMonth(), 1)
      : new Date();
  });

  const dayId = useId();

  const handlePrevMonth = useCallback(() => {
    setVisibleMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setVisibleMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  }, []);

  const calendarDays = useMemo(() => {
    const monthsArray = [];
    for (let i = 0; i < numberOfMonths; i++) {
      const currentMonth = new Date(visibleMonth);
      currentMonth.setMonth(currentMonth.getMonth() + i);
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const days = [];

      // Add days from previous month
      const prevMonthDays = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
      for (let j = prevMonthDays; j > 0; j--) {
        const date = new Date(year, month, 1 - j);
        days.push({ date, isOverflow: true });
      }

      // Add days of current month
      for (
        let date = new Date(firstDay);
        date <= lastDay;
        date.setDate(date.getDate() + 1)
      ) {
        days.push({ date: new Date(date), isOverflow: false });
      }

      // Add days from next month
      const daysNeeded = 42 - days.length; // 6 rows of 7 days
      for (let j = 1; j <= daysNeeded; j++) {
        const date = new Date(year, month + 1, j);
        days.push({ date, isOverflow: true });
      }

      monthsArray.push(days);
    }
    return monthsArray;
  }, [visibleMonth, firstDayOfWeek, numberOfMonths]);

  const isDateDisabledWrapper = useCallback(
    (date: Date) => {
      if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
      if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
        return true;
      return isDateDisabled ? isDateDisabled(date) : false;
    },
    [minDate, maxDate, isDateDisabled],
  );

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (!isDateDisabledWrapper(date)) {
        let newSelectedDates: Date[];
        switch (selectionMode) {
          case "single":
            newSelectedDates = [date];
            break;
          case "range":
            if (selectedDates.length === 0 || selectedDates.length === 2) {
              newSelectedDates = [date];
            } else {
              newSelectedDates = [selectedDates[0], date].sort(
                (a, b) => a.getTime() - b.getTime(),
              );
            }
            break;
          case "multiple":
            newSelectedDates = selectedDates.some(
              (d) => d.toDateString() === date.toDateString(),
            )
              ? selectedDates.filter(
                  (d) => d.toDateString() !== date.toDateString(),
                )
              : [...selectedDates, date];
            break;
          default:
            newSelectedDates = [date];
        }
        setSelectedDates(newSelectedDates);
        onChange(
          selectionMode === "single" ? newSelectedDates[0] : newSelectedDates,
        );
      }
    },
    [onChange, isDateDisabledWrapper, selectionMode, selectedDates],
  );

  return (
    <div className={styles.datepicker} style={customStyles.container}>
      {calendarDays.map((monthDays, monthIndex) => (
        <div key={`month-${monthIndex}`} className={styles.month}>
          <MonthHeader
            visibleMonth={
              new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth() + monthIndex,
                1,
              )
            }
            onPrevMonth={monthIndex === 0 ? handlePrevMonth : undefined}
            onNextMonth={
              monthIndex === numberOfMonths - 1 ? handleNextMonth : undefined
            }
            locale={locale}
            customStyles={customStyles.monthHeader}
          />
          <WeekdayHeader
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            customStyles={customStyles.weekdayHeader}
          />
          <div className={styles.calendarGrid}>
            {monthDays.map(({ date, isOverflow }, index) => {
              const isSelected = selectedDates.some(
                (d) => d.toDateString() === date.toDateString(),
              );
              const isInRange =
                selectionMode === "range" &&
                selectedDates.length === 2 &&
                date >= selectedDates[0] &&
                date <= selectedDates[1];
              const isRangeStart =
                selectionMode === "range" &&
                selectedDates.length > 0 &&
                date.toDateString() === selectedDates[0].toDateString();
              const isRangeEnd =
                selectionMode === "range" &&
                selectedDates.length === 2 &&
                date.toDateString() === selectedDates[1].toDateString();

              return (
                <Day
                  key={`${dayId}-${monthIndex}-${index}`}
                  date={date}
                  isSelected={isSelected}
                  isInRange={isInRange}
                  isRangeStart={isRangeStart}
                  isRangeEnd={isRangeEnd}
                  isDisabled={isDateDisabledWrapper(date)}
                  isToday={new Date().toDateString() === date.toDateString()}
                  isOverflow={isOverflow}
                  onClick={() => handleDateSelect(date)}
                  isFirstDayOfMonth={date.getDate() === 1}
                  isLastDayOfMonth={
                    new Date(
                      date.getFullYear(),
                      date.getMonth() + 1,
                      0,
                    ).getDate() === date.getDate()
                  }
                  customStyles={{
                    day: customStyles.day,
                    selected: customStyles.selectedDay,
                    range: customStyles.rangeDay,
                    disabled: customStyles.disabledDay,
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
