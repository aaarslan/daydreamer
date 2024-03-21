import {
  type Day,
  type Era,
  type Locale,
  type LocaleDayPeriod,
  type LocaleUnit,
  type LocalizeFnOptions,
  type MatchFnOptions,
  type MatchFnResult,
  type Month,
  type Quarter,
  format,
} from "date-fns";

const mrIN: Locale = {
  code: "mr-IN",
  formatDistance: (token, count) => {
    const cases = ["one", "other"];
    const pluralRules = new Intl.PluralRules("mr-IN").select(count);
    const index = cases.indexOf(pluralRules);

    switch (token) {
      case "lessThanXSeconds":
        return index === 0 ? "कमी पेक्षा एक सेकंद" : `कमी पेक्षा ${count} सेकंद`;
      default:
        return "";
    }
  },
  formatRelative: (token, _date, _baseDate, _options) => {
    switch (token) {
      case "yesterday":
        return "काल";
      case "today":
        return "आज";
      case "tomorrow":
        return "उद्या";
      // Implement other relative times...
      default:
        return "";
    }
  },
  localize: {
    month: (n) =>
      [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जून",
        "जुलै",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
      ][n],
    day: (n) =>
      ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरूवार", "शुक्रवार", "शनिवार"][n],
    dayPeriod: (n) => (Number(n) < 12 ? "सकाळी" : "संध्याकाळी"),
    ordinalNumber: (n) => `${n}वा`,
    era: (_value: Era, _options?: LocalizeFnOptions | undefined): string => {
      throw new Error("Function not implemented.");
    },
    quarter: (
      _value: Quarter,
      _options?: LocalizeFnOptions | undefined,
    ): string => {
      throw new Error("Function not implemented.");
    },
  },
  formatLong: {
    date: () => "dd MMMM yyyy",
    time: () => "HH:mm",
    dateTime: () =>
      `${format(new Date(), "dd MMMM yyyy")} ${format(new Date(), "HH:mm")}`,
  },
  match: {
    month: (text): MatchFnResult<Month> => {
      return ([
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जून",
        "जुलै",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
      ].findIndex((month) => month === text) +
        1) as unknown as MatchFnResult<Month>;
    },
    day: (text): MatchFnResult<Day> => {
      return ([
        "रविवार",
        "सोमवार",
        "मंगळवार",
        "बुधवार",
        "गुरूवार",
        "शुक्रवार",
        "शनिवार",
      ].findIndex((day) => day === text) + 1) as unknown as MatchFnResult<Day>;
    },
    dayPeriod: (text): MatchFnResult<LocaleDayPeriod> | null =>
      text.match(/सकाळी|संध्याकाळी/)
        ? (text as unknown as MatchFnResult<LocaleDayPeriod>)
        : null,
    ordinalNumber: (
      _str: string,
      _options?: (MatchFnOptions<number> & { unit: LocaleUnit }) | undefined,
    ): MatchFnResult<number> | null => {
      throw new Error("Function not implemented.");
    },
    era: (
      _str: string,
      _options?: (MatchFnOptions<Era> & Record<string, unknown>) | undefined,
    ): MatchFnResult<Era> | null => {
      throw new Error("Function not implemented.");
    },
    quarter: (
      _str: string,
      _options?:
        | (MatchFnOptions<Quarter> & Record<string, unknown>)
        | undefined,
    ): MatchFnResult<Quarter> | null => {
      throw new Error("Function not implemented.");
    },
  },
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  },
};

export default mrIN;
