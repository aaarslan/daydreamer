import type React from "react";
import styles from "./month.module.css";

interface MonthHeaderProps {
  visibleMonth: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  locale: string;
  customStyles?: React.CSSProperties;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  visibleMonth,
  onPrevMonth,
  onNextMonth,
  locale,
  customStyles = {},
}) => {
  const monthName = visibleMonth.toLocaleString(locale, { month: "long" });
  const year = visibleMonth.getFullYear();

  return (
    <div className={styles.monthHeader} style={customStyles}>
      <button
        type="button"
        onClick={onPrevMonth}
        disabled={!onPrevMonth}
        className={styles.navButton}
      >
        &lt;
      </button>
      <span className={styles.monthYear}>{`${monthName} ${year}`}</span>
      <button
        type="button"
        onClick={onNextMonth}
        disabled={!onNextMonth}
        className={styles.navButton}
      >
        &gt;
      </button>
    </div>
  );
};
