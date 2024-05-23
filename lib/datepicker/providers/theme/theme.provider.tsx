import { createContext, useContext } from "react";

type Theme = {
  day: string;
  selectedDay: string;
  disabledDay: string;
  week: string;
  selectedWeek: string;
  disabledWeek: string;
  month: string;
  selectedMonth: string;
  disabledMonth: string;
  year: string;
  selectedYear: string;
  disabledYear: string;
};

const ThemeContext = createContext<Theme>({
  day: "",
  selectedDay: "",
  disabledDay: "",
  week: "",
  selectedWeek: "",
  disabledWeek: "",
  month: "",
  selectedMonth: "",
  disabledMonth: "",
  year: "",
  selectedYear: "",
  disabledYear: "",
});

const ThemeProvider: React.FC<{ theme: Theme; children: React.ReactNode }> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};

export { ThemeContext, ThemeProvider };
export type { Theme };
