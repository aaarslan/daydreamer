import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React, { useContext, useMemo, useId } from "react";
import { DatepickerContext } from "../../provider";

const Calendar: React.FC = React.memo(() => {
  const {
    currentDate,
    setCurrentDate,
    daysOfWeek,
    selectedDate,
    setSelectedDate,
    locale,
  } = useContext(DatepickerContext);

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };
  const uniqueKey = useId();
  const handleTodayClick = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const onDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const daysToRender = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate), { locale });
    const end = endOfWeek(endOfMonth(currentDate), { locale });
    let days = eachDayOfInterval({ start, end });

    while (days.length < 42) {
      days = [...days, addDays(days[days.length - 1], 1)];
    }

    return days;
  }, [currentDate, locale]);

  return (
    <div className="datepicker-container">
      <div className="datepicker-grid">
        <button
          type="button"
          className="month-change"
          onClick={() => handleMonthChange(-1)}
        >
          {"<"}
        </button>
        <div className="current-month" style={{ gridColumn: "span 5" }}>
          {format(currentDate, "MMMM yyyy", { locale })}
        </div>
        <button
          type="button"
          className="month-change"
          onClick={() => handleMonthChange(1)}
        >
          {">"}
        </button>
        {daysOfWeek.map((day, index) => (
          <div key={`${uniqueKey + index}`} className="day-of-week">
            {day}
          </div>
        ))}
        {daysToRender.map((date, index) => {
          const isSelected = selectedDate && isSameDay(selectedDate, date);
          const isCurrentDay = isSameDay(date, new Date());
          const isCurrentMonth = isSameMonth(date, currentDate);
          const dayClass = `day ${isSelected ? "selected" : ""} ${
            isCurrentDay ? "today" : ""
          } ${isCurrentMonth ? "" : "overflow"}`;

          return (
            <div
              key={`${uniqueKey + index}`}
              className={dayClass}
              onClick={() => isCurrentMonth && onDateSelect(date)}
              onKeyUp={() => {}}
              onKeyDown={() => {}}
            >
              {format(date, "d", { locale })}
            </div>
          );
        })}
      </div>
      <button type="button" className="today-button" onClick={handleTodayClick}>
        Today
      </button>
    </div>
  );
});

export { Calendar };
