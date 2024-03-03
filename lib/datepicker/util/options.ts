enum LOCALE_CALENDARS {
  buddhist = 'buddhist',
  chinese = 'chinese',
  coptic = 'coptic',
  dangi = 'dangi',
  ethioaa = 'ethioaa',
  ethiopic = 'ethiopic',
  gregory = 'gregory',
  hebrew = 'hebrew',
  indian = 'indian',
  islamic = 'islamic',
  islamicUmalqura = 'islamic-umalqura',
  islamicTbla = 'islamic-tbla',
  islamicCivil = 'islamic-civil',
  islamicRgsa = 'islamic-rgsa',
  iso8601 = 'iso8601',
  japanese = 'japanese',
  persian = 'persian',
  roc = 'roc',
}

interface LOCALE_CALENDAR_OPTIONS {
  firstDayOfWeek: number
  monthNames: string[]
  monthNamesShort: string[]
  dayNames: string[]
  dayNamesShort: string[]
  dayNamesMin: string[]
  calendar: LOCALE_CALENDARS
}

interface LOCALE_DATE_OPTIONS {
  format: string
  separator: string
  days: string[]
  months: string[]
  amPm: string[]
}

interface LOCALE_OPTIONS {
  calendar: LOCALE_CALENDAR_OPTIONS
  date: LOCALE_DATE_OPTIONS
}

interface DATEPICKER_OPTIONS {
  locale: LOCALE_OPTIONS
}

export type { DATEPICKER_OPTIONS }
