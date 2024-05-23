import type React from "react";
import { useTheme } from "../../../providers";
import styles from "./week.module.css";

type WeekProps = {
  week: number;
  selected: boolean;
  disabled: boolean;
  onClick?: (week: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

const Week: React.FC<WeekProps> = ({
  week,
  selected,
  disabled,
  onClick,
  className,
  style,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) onClick(week);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.week} ${theme.week} ${
        selected ? `${styles.selectedWeek} ${theme.selectedWeek}` : ""
      } ${disabled ? `${styles.disabledWeek} ${theme.disabledWeek}` : ""} ${
        className ?? ""
      }`}
      style={style}
    >
      {`Week ${week}`}
    </button>
  );
};

export { Week };
export type { WeekProps };
