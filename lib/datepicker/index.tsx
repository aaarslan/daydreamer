/**
 * Datepicker Root Component
 *
 * This component sets up the datepicker context and renders the DatepickerComponent.
 * It can optionally accept a `locale` prop to set the initial locale.
 */

import { Calendar } from "./components/calendar";
import { type Theme, ThemeProvider } from "./providers";

type DatepickerProps = {
  theme: Theme;
};

const initialTheme: Theme = {
  day: "#000000",
  selectedDay: "#EFEFEF",
  disabledDay: "#666666",
  week: "",
  selectedWeek: "",
  disabledWeek: "",
  month: "",
  selectedMonth: "",
  disabledMonth: "",
  year: "",
  selectedYear: "",
  disabledYear: "",
};

function Datepicker({ theme }: DatepickerProps) {
  return (
    <ThemeProvider theme={theme ? theme : initialTheme}>
      <Calendar />
    </ThemeProvider>
  );
}

export { Datepicker };
