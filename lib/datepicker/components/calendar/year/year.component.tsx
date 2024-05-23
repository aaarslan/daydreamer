import type React from "react";
import { useTheme } from "../../../providers";
import styles from "./year.module.css";

type YearProps = {
  year: number;
  selected: boolean;
  disabled: boolean;
  onClick?: (year: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

const Year: React.FC<YearProps> = ({
  year,
  selected,
  disabled,
  onClick,
  className,
  style,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) onClick(year);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.year} ${theme.year} ${
        selected ? `${styles.selectedYear} ${theme.selectedYear}` : ""
      } ${disabled ? `${styles.disabledYear} ${theme.disabledYear}` : ""} ${
        className ?? ""
      }`}
      style={style}
    >
      {`Year ${year}`}
    </button>
  );
};

export { Year };
export type { YearProps };
