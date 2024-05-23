import type React from "react";
import { useTheme } from "../../../providers";
import styles from "./month.module.css";

type MonthProps = {
  month: number;
  selected: boolean;
  disabled: boolean;
  onClick?: (month: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

const Month: React.FC<MonthProps> = ({
  month,
  selected,
  disabled,
  onClick,
  className,
  style,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) onClick(month);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.month} ${theme.month} ${
        selected ? `${styles.selectedMonth} ${theme.selectedMonth}` : ""
      } ${disabled ? `${styles.disabledMonth} ${theme.disabledMonth}` : ""} ${
        className ?? ""
      }`}
      style={style}
    >
      {`Month ${month}`}
    </button>
  );
};

export { Month };
export type { MonthProps };
