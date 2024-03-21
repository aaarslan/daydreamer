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
import {
  CalendarActions,
  CalendarContainer,
  CalendarGrid,
  ClearButton,
  CurrentMonth,
  Day,
  DayOfWeek,
  MonthChangeButton,
  TodayButton,
  YearChangeButton,
} from "./calendar.styled";

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
    <CalendarContainer>
      <CalendarGrid>
        <YearChangeButton type="button" onClick={() => handleMonthChange(-12)}>
          {"<<"}
        </YearChangeButton>
        <MonthChangeButton type="button" onClick={() => handleMonthChange(-1)}>
          {"<"}
        </MonthChangeButton>
        <CurrentMonth>
          {format(currentDate, "MMMM yyyy", { locale })}
        </CurrentMonth>
        <MonthChangeButton type="button" onClick={() => handleMonthChange(1)}>
          {">"}
        </MonthChangeButton>
        <YearChangeButton type="button" onClick={() => handleMonthChange(12)}>
          {">>"}
        </YearChangeButton>
        {daysOfWeek.map((day, index) => (
          <DayOfWeek key={`${uniqueKey + index}`}>{day}</DayOfWeek>
        ))}
        {daysToRender.map((date, index) => {
          const isSelected = selectedDate && isSameDay(selectedDate, date);
          const isCurrentDay = isSameDay(date, new Date());
          const isCurrentMonth = isSameMonth(date, currentDate);
          let dayClass = `day ${isSelected ? "selected" : ""}  ${
            isCurrentMonth ? "" : "overflow"
          }`;
          if (!selectedDate && isCurrentDay) {
            dayClass += " today";
          }

          return (
            <Day
              key={`${uniqueKey + index}`}
              className={dayClass}
              onClick={() => isCurrentMonth && onDateSelect(date)}
              onKeyUp={() => {}}
              onKeyDown={() => {}}
            >
              {format(date, "d", { locale })}
            </Day>
          );
        })}
      </CalendarGrid>
      <CalendarActions>
        <TodayButton type="button" onClick={handleTodayClick}>
          Today
        </TodayButton>
        <ClearButton
          type="button"
          onClick={() => setSelectedDate(null)}
          disabled={!selectedDate}
        >
          Clear
        </ClearButton>
      </CalendarActions>
    </CalendarContainer>
  );
});

export { Calendar };
