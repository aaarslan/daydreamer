import { css } from "@linaria/core";
import { styled } from "@linaria/react";
/**
 * Datepicker Root Component
 *
 * This component sets up the datepicker context and renders the DatepickerComponent.
 * It can optionally accept a `locale` prop to set the initial locale.
 */
import type { Locale } from "date-fns";
import { DatepickerComponent } from "./datepicker";

import { DatepickerProvider } from "./provider";

interface DatepickerProps {
  locale?: Locale;
  onDateChange?: (date: Date | null) => void;
}

const InitialTheme = css`
    --date-input-bg-color: white;
    --date-input-border-radius: 5px;
    --date-input-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --date-input-focus-border-color: #007bff;
    --date-input-focus-box-shadow: 0 0 0 2px rgba(0, 123, 255, .25);
    --placeholder-color: #aaa;
    --calendar-bg-color: #eff1f5;
    --calendar-border-radius: 8px;
    --button-cursor: pointer;
    --day-bg-color: #ccd0da;
    --day-hover-bg-color: #9ca0b0;
    --selected-day-bg-color: #40a02b;
    --today-bg-color: #04a5e5;
    --weekend-day-color: #fe640b;
    --font-color-default: #4c4f69;
`;

const Container = styled.div`
  ${InitialTheme}
`;

function Datepicker({ locale, onDateChange }: DatepickerProps) {
  return (
    <DatepickerProvider initialLocale={locale} onDateChange={onDateChange}>
      <Container className={InitialTheme}>
        <DatepickerComponent />
      </Container>
    </DatepickerProvider>
  );
}
export { Datepicker };
