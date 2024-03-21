import { styled } from "@linaria/react";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: var(--calendar-bg-color);
  border-radius: var(--calendar-border-radius);
  color: var(--datepicker-text);
  font-size: 1rem;
  user-select: none;
  transition: background-color 0.2s ease;
  position: relative;
  z-index: 1;
  min-width: 300px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
`;

export const MonthChangeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--datepicker-text);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--datepicker-text-hover);
  }
  &:active {
    color: var(--selected-day-bg-color);
    border: none;
    box-shadow: none;
    transform: scale(0.95);
  }
`;

export const YearChangeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--datepicker-text);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--datepicker-text-hover);
  }
  &:active {
    color: var(--selected-day-bg-color);
    border: none;
    box-shadow: none;
    transform: scale(0.95);
  }
`;

export const CurrentMonth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 3;
  font-size: 1rem;
  transition: color 0.2s ease;
`;

export const DayOfWeek = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: color 0.2s ease;
`;

export const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &.selected {
    background-color: var(--selected-day-bg-color);
    color: white;
  }

  &.today:not(.selected) {
    background-color: var(--today-bg-color);
    color: white;
  }

  &.overflow {
    opacity: 0.5;
  }

  &:hover {
    color: var(--day-hover-bg-color);
  }
`;

export const CalendarActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const TodayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--font-color-default);
  cursor: var(--button-cursor);
  font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: var(--datepicker-today-hover);
    color: var(--datepicker-today-text-hover);
  }
  &:active {
    color: var(--selected-day-bg-color);
    border: none;
    box-shadow: none;
    transform: scale(0.95);
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--font-color-default);
  cursor: var(--button-cursor);
  font-size: 1rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: var(--datepicker-today-hover);
    color: var(--datepicker-today-text-hover);
  }
  &:active {
    color: var(--selected-day-bg-color);
    border: none;
    box-shadow: none;
    transform: scale(0.95);
  }
`;
