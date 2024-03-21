/**
 * Datepicker Root Component
 *
 * This component sets up the datepicker context and renders the DatepickerComponent.
 * It can optionally accept a `locale` prop to set the initial locale.
 */
import type { Locale } from "date-fns";
import { DatepickerComponent } from "./datepicker";
import "./datepicker.css";
import { DatepickerProvider } from "./provider";

interface DatepickerProps {
  locale?: Locale;
  onDateChange?: (date: Date | null) => void;
}

function Datepicker({ locale, onDateChange }: DatepickerProps) {
  return (
    <DatepickerProvider initialLocale={locale} onDateChange={onDateChange}>
      <DatepickerComponent />
    </DatepickerProvider>
  );
}
export { Datepicker };
