import type React from "react";
import styles from "./day.module.css";

interface DayProps {
  date: Date;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isOverflow: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  onClick: () => void;
  customStyles?: {
    day?: React.CSSProperties;
    selected?: React.CSSProperties;
    range?: React.CSSProperties;
    disabled?: React.CSSProperties;
  };
}

export const Day: React.FC<DayProps> = ({
  date,
  isSelected,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isDisabled,
  isToday,
  isOverflow,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  onClick,
  customStyles = {},
}) => {
  const classNames = [
    styles.day,
    isSelected && styles.selected,
    isInRange && styles.inRange,
    isRangeStart && styles.rangeStart,
    isRangeEnd && styles.rangeEnd,
    isDisabled && styles.disabled,
    isToday && !isSelected && styles.today,
    isOverflow && styles.overflow,
    isFirstDayOfMonth && styles.firstDayOfMonth,
    isLastDayOfMonth && styles.lastDayOfMonth,
  ]
    .filter(Boolean)
    .join(" ");

  const combinedStyles = {
    ...customStyles.day,
    ...(isSelected && customStyles.selected),
    ...(isInRange && customStyles.range),
    ...(isDisabled && customStyles.disabled),
  };

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={isDisabled || isOverflow}
      style={combinedStyles}
    >
      {date.getDate()}
    </button>
  );
};
