export interface DateFormatOptions {
  locale?: string;
  dateStyle?: "full" | "long" | "medium" | "short";
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

export class DateFormatter {
  private locale: string;
  private formatter: Intl.DateTimeFormat;

  constructor(locale = "en-US", options: DateFormatOptions = {}) {
    this.locale = locale;
    this.formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: options.dateStyle || "short",
      ...options,
    });
  }

  format(date: Date | Date[]): string {
    if (Array.isArray(date)) {
      if (date.length === 0) return "";
      if (date.length === 1) return this.formatter.format(date[0]);
      if (date.length === 2) {
        return `${this.formatter.format(date[0])} - ${this.formatter.format(date[1])}`;
      }
      return date.map((d) => this.formatter.format(d)).join(", ");
    }
    return this.formatter.format(date);
  }

  formatRange(startDate: Date, endDate: Date): string {
    if ("formatRange" in this.formatter) {
      const formatterWithRange = this.formatter as Intl.DateTimeFormat & {
        formatRange: (start: Date, end: Date) => string;
      };
      return formatterWithRange.formatRange(startDate, endDate);
    }
    return `${this.formatter.format(startDate)} - ${this.formatter.format(endDate)}`;
  }

  getMonthName(
    date: Date,
    format: "long" | "short" | "narrow" = "long",
  ): string {
    return date.toLocaleString(this.locale, { month: format });
  }

  getWeekdayName(
    date: Date,
    format: "long" | "short" | "narrow" = "long",
  ): string {
    return date.toLocaleString(this.locale, { weekday: format });
  }

  getWeekdays(
    format: "long" | "short" | "narrow" = "short",
    firstDayOfWeek = 0,
  ): string[] {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(2024, 0, firstDayOfWeek + i);
      return date.toLocaleString(this.locale, { weekday: format });
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  isSameMonth(date1: Date, date2: Date): boolean {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  static createFormatter(
    locale?: string,
    options?: DateFormatOptions,
  ): DateFormatter {
    return new DateFormatter(locale, options);
  }
}

export const defaultFormatter = DateFormatter.createFormatter();
