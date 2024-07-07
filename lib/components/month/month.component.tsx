import type React from "react";
import styles from "./month.module.css";

interface MonthHeaderProps {
  visibleMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  locale: string;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  visibleMonth,
  onPrevMonth,
  onNextMonth,
  locale,
}) => {
  const monthName = visibleMonth.toLocaleString(locale, { month: "long" });
  const year = visibleMonth.getFullYear();

  return (
    <div className={styles.monthHeader}>
      <button type="button" onClick={onPrevMonth}>
        &lt;
      </button>
      <span>{`${monthName} ${year}`}</span>
      <button type="button" onClick={onNextMonth}>
        &gt;
      </button>
    </div>
  );
};
