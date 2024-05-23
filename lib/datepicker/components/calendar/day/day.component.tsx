import type React from "react";
import { useTheme } from "../../../providers";
import styles from "./day.module.css";

type DayProps = {
  day: number;
  selected: boolean;
  disabled: boolean;
  onClick?: (day: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  tooltip?: string;
  dataAttributes?: { [key: string]: string };
  renderContent?: (day: number) => React.ReactNode;
  onMouseEnter?: (day: number) => void;
  onMouseLeave?: (day: number) => void;
  onFocus?: (day: number) => void;
  onBlur?: (day: number) => void;
};

const Day: React.FC<DayProps> = ({
  day,
  selected,
  disabled,
  onClick,
  className,
  style,
  ariaLabel,
  tooltip,
  dataAttributes,
  renderContent,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) onClick(day);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.day} ${theme.day} ${
        selected ? `${styles.selected} ${theme.selectedDay}` : ""
      } ${disabled ? `${styles.disabled} ${theme.disabledDay}` : ""} ${
        className ?? ""
      }`}
      style={style}
      aria-label={ariaLabel}
      title={tooltip}
      {...(dataAttributes &&
        Object.keys(dataAttributes).reduce(
          (acc: { [key: string]: string }, key) => {
            acc[`data-${key}`] = dataAttributes[key];
            return acc;
          },
          {},
        ))}
      onMouseEnter={() => onMouseEnter?.(day)}
      onMouseLeave={() => onMouseLeave?.(day)}
      onFocus={() => onFocus?.(day)}
      onBlur={() => onBlur?.(day)}
    >
      {renderContent ? renderContent(day) : day}
    </button>
  );
};

export { Day };
export type { DayProps };
