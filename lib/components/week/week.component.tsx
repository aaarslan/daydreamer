import type React from "react";
import { memo } from "react";
import styles from "./week.module.css";

interface WeekdayHeaderProps {
  locale: string;
  firstDayOfWeek: number;
  customStyles?: React.CSSProperties;
}

export const WeekdayHeader: React.FC<WeekdayHeaderProps> = memo(
  ({ locale, firstDayOfWeek, customStyles = {} }) => {
    const weekdays = Array.from({ length: 7 }, (_, i) =>
      new Date(2024, 0, firstDayOfWeek + i).toLocaleString(locale, {
        weekday: "short",
      }),
    );

    return (
      <div className={styles.weekdayHeader} style={customStyles}>
        {weekdays.map((day) => (
          <span
            key={day}
            className={styles.weekday}
            title={`Column for ${day}`}
          >
            {day}
          </span>
        ))}
      </div>
    );
  },
);
