import { useCallback, useId, useMemo, useState } from "react";
import { Day } from "../day";
import { MonthHeader } from "../month";
import { WeekdayHeader } from "../week";
import styles from "./datepicker.module.css";

namespace Datepicker {
  export interface Props {
    onChange: (date: Date | Date[]) => void;
    value?: Date;
    dateFormat?: string;
    locale?: string;
    minDate?: Date;
    maxDate?: Date;
    isDateDisabled?: (date: Date) => boolean;
    firstDayOfWeek?: number;
    selectionMode?: "single" | "range";
  }
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
}: Datepicker.Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [selectedRange, setSelectedRange] = useState<Date[]>([]);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    return value
      ? new Date(value.getFullYear(), value.getMonth(), 1)
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
    const days = [];
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Add days from previous month
    const prevMonthDays = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
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
    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isOverflow: true });
    }

    return days;
  }, [visibleMonth, firstDayOfWeek]);

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
        if (selectionMode === "single") {
          setSelectedDate(date);
          onChange(date);
        } else {
          handleDateRangeSelect(date);
        }
      }
    },
    [onChange, isDateDisabledWrapper, selectionMode],
  );

  const handleDateRangeSelect = useCallback(
    (date: Date) => {
      if (selectedRange.length === 0 || selectedRange.length === 2) {
        setSelectedRange([date]);
      } else if (selectedRange.length === 1) {
        const [start] = selectedRange;
        const end = date;
        const range = [start, end].sort((a, b) => a.getTime() - b.getTime());
        setSelectedRange(range);
        onChange(range);
      }
    },
    [selectedRange, onChange],
  );

  return (
    <div className={styles.datepicker}>
      <MonthHeader
        visibleMonth={visibleMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        locale={locale}
      />
      <WeekdayHeader locale={locale} firstDayOfWeek={firstDayOfWeek} />
      <div className={styles.calendarGrid}>
        {calendarDays.map(({ date, isOverflow }, index) => {
          const isSelected =
            selectionMode === "single"
              ? selectedDate?.toDateString() === date.toDateString()
              : selectedRange.some(
                  (d) => d.toDateString() === date.toDateString(),
                );
          const isInRange =
            selectionMode === "range" &&
            selectedRange.length === 2 &&
            date >= selectedRange[0] &&
            date <= selectedRange[1];
          const isRangeStart =
            selectionMode === "range" && selectedRange.length > 0
              ? date.toDateString() === selectedRange[0].toDateString()
              : false;
          const isRangeEnd =
            selectionMode === "range" && selectedRange.length === 2
              ? date.toDateString() === selectedRange[1].toDateString()
              : false;

          return (
            <Day
              key={`${dayId}-${index}`}
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
            />
          );
        })}
      </div>
    </div>
  );
}
