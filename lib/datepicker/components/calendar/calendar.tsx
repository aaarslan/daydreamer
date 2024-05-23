import type React from "react";
import { useState } from "react";
import { type Theme, ThemeProvider } from "../../providers";
import styles from "./calendar.module.css";
import { Day } from "./day";
import { Month } from "./month";
import { Week } from "./week";
import { Year } from "./year";

const Calendar: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month" | "year">("day");

  const theme: Theme = {
    day: styles.day,
    selectedDay: styles.selectedDay,
    disabledDay: styles.disabledDay,
    week: styles.week,
    selectedWeek: styles.selectedWeek,
    disabledWeek: styles.disabledWeek,
    month: styles.month,
    selectedMonth: styles.selectedMonth,
    disabledMonth: styles.disabledMonth,
    year: styles.year,
    selectedYear: styles.selectedYear,
    disabledYear: styles.disabledYear,
  };

  const renderView = () => {
    switch (view) {
      case "day":
        return (
          <div className={styles.dayView}>
            {/* Example day rendering, you would typically render a grid of days */}
            {[...Array(31)].map((_, index) => (
              <Day
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                day={index + 1}
                selected={false}
                disabled={false}
                onClick={(day) => console.log(`Day ${day} clicked`)}
              />
            ))}
          </div>
        );
      case "week":
        return (
          <div className={styles.weekView}>
            {[...Array(4)].map((_, index) => (
              <Week
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                week={index + 1}
                selected={false}
                disabled={false}
                onClick={(week) => console.log(`Week ${week} clicked`)}
              />
            ))}
          </div>
        );
      case "month":
        return (
          <div className={styles.monthView}>
            {[...Array(12)].map((_, index) => (
              <Month
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                month={index + 1}
                selected={false}
                disabled={false}
                onClick={(month) => console.log(`Month ${month} clicked`)}
              />
            ))}
          </div>
        );
      case "year":
        return (
          <div className={styles.yearView}>
            {[...Array(10)].map((_, index) => (
              <Year
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                year={2020 + index}
                selected={false}
                disabled={false}
                onClick={(year) => console.log(`Year ${year} clicked`)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.calendar}>
        <div className={styles.controls}>
          <button type="button" onClick={() => setView("day")}>
            Day View
          </button>
          <button type="button" onClick={() => setView("week")}>
            Week View
          </button>
          <button type="button" onClick={() => setView("month")}>
            Month View
          </button>
          <button type="button" onClick={() => setView("year")}>
            Year View
          </button>
        </div>
        {renderView()}
      </div>
    </ThemeProvider>
  );
};

export { Calendar };
