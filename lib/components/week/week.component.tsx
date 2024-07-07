import type React from "react";
import styles from "./week.module.css";

interface WeekdayHeaderProps {
  locale: string;
  firstDayOfWeek: number;
}

export const WeekdayHeader: React.FC<WeekdayHeaderProps> = ({
  locale,
  firstDayOfWeek,
}) => {
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, firstDayOfWeek + i).toLocaleString(locale, {
      weekday: "short",
    }),
  );

  return (
    <div className={styles.weekdayHeader}>
      {weekdays.map((day) => (
        <span key={day}>{day}</span>
      ))}
    </div>
  );
};
