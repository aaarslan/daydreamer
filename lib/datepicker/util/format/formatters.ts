import { getDayOfYear } from '../../../getDayOfYear/index.js'
import { getISOWeek } from '../../../getISOWeek/index.js'
import { getISOWeekYear } from '../../../getISOWeekYear/index.js'
import { getWeek } from '../../../getWeek/index.js'
import { getWeekYear } from '../../../getWeekYear/index.js'

export interface Locale {
  /** The locale code (ISO 639-1 + optional country code) */
  code: string
  /** The function to format distance */
  formatDistance: FormatDistanceFn
  /** The function to relative time */
  formatRelative: FormatRelativeFn
  /** The object with functions used to localize various values */
  localize: Localize
  /** The object with functions that return localized formats */
  formatLong: FormatLong
  /** The object with functions used to match and parse various localized values */
  match: Match
  /** An object with locale options */
  options?: LocaleOptions
}

/**
 * The locale options.
 */
export interface LocaleOptions
  extends WeekOptions,
    FirstWeekContainsDateOptions {}

/// Format distance types

/**
 * The function that takes a token (i.e. halfAMinute) passed by `formatDistance`
 * or `formatDistanceStrict` and payload, and returns localized distance.
 *
 * @param token - The token to localize
 * @param count - The distance number
 * @param options - The object with options
 *
 * @returns The localized distance in words
 */
export type FormatDistanceFn = (
  token: FormatDistanceToken,
  count: number,
  options?: FormatDistanceFnOptions
) => string

/**
 * The {@link FormatDistanceFn} function options.
 */
export interface FormatDistanceFnOptions {
  /** Add "X ago"/"in X" in the locale language */
  addSuffix?: boolean
  /** The distance vector. -1 represents past and 1 future. Tells which suffix
   * to use. */
  comparison?: -1 | 0 | 1
}

/**
 * The function used inside the {@link FormatDistanceFn} function, implementing
 * formatting for a particular token.
 */
export type FormatDistanceTokenFn = (
  /** The distance as number to format */
  count: number,
  /** The object with options */
  options?: FormatDistanceFnOptions
) => string

/**
 * The tokens map to string templates used in the format distance function.
 * It looks like this:
 *
 *   const formatDistanceLocale: FormatDistanceLocale<FormatDistanceTokenValue> = {
 *     lessThanXSeconds: 'តិចជាង {{count}} វិនាទី',
 *     xSeconds: '{{count}} វិនាទី',
 *     // ...
 *   }
 *
 * @typeParam Template - The property value type.
 */
export type FormatDistanceLocale<Template> = {
  [Token in FormatDistanceToken]: Template
}

/**
 * The token used in the format distance function. Represents the distance unit
 * with prespecified precision.
 */
export type FormatDistanceToken =
  | 'lessThanXSeconds'
  | 'xSeconds'
  | 'halfAMinute'
  | 'lessThanXMinutes'
  | 'xMinutes'
  | 'aboutXHours'
  | 'xHours'
  | 'xDays'
  | 'aboutXWeeks'
  | 'xWeeks'
  | 'aboutXMonths'
  | 'xMonths'
  | 'aboutXYears'
  | 'xYears'
  | 'overXYears'
  | 'almostXYears'

/// Format relative types

/**
 * The locale function that does the work for the `formatRelative` function.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param token - The token to localize
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - The object with options
 *
 * @returns The localized relative date format
 */
export type FormatRelativeFn = <DateType extends Date>(
  token: FormatRelativeToken,
  date: DateType,
  baseDate: DateType,
  options?: FormatRelativeFnOptions
) => string

/**
 * The {@link FormatRelativeFn} function options.
 */
export interface FormatRelativeFnOptions
  extends WeekOptions,
    LocalizedOptions<'options' | 'formatRelative'> {}

/**
 * The locale function used inside the {@link FormatRelativeFn} function
 * implementing formatting for a particular token.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - The object with options
 */
export type FormatRelativeTokenFn = <DateType extends Date>(
  date: DateType | number | string,
  baseDate: DateType | number | string,
  options?: FormatRelativeTokenFnOptions
) => string

/**
 * The {@link FormatRelativeTokenFn} function options.
 */
export interface FormatRelativeTokenFnOptions extends WeekOptions {}

/**
 * The token used in format relative function. Represents the time unit.
 */
export type FormatRelativeToken =
  | 'lastWeek'
  | 'yesterday'
  | 'today'
  | 'tomorrow'
  | 'nextWeek'
  | 'other'

/**
 * A format part that represents a token or string literal, used by format parser/tokenizer
 */
export interface FormatPart {
  /** If the part is a format token. */
  isToken: boolean
  /** The format part value (i.e. `"do"`). */
  value: string
}

/// Localize types

/**
 * The object with functions used to localize various values. Part of the public
 * locale API.
 */
export interface Localize {
  /** The function that localizes an ordinal number */
  ordinalNumber: LocalizeFn<number>
  /** The function that localized the era */
  era: LocalizeFn<Era>
  /** The function that localizes the quarter */
  quarter: LocalizeFn<Quarter>
  /** The function that localizes the month */
  month: LocalizeFn<Month>
  /** The function that localizes the day of the week */
  day: LocalizeFn<Day>
  /** The function that localizes the day period */
  dayPeriod: LocalizeFn<LocaleDayPeriod>

  /** The function that can preprocess parts/tokens **/
  preprocessor?: <DateType extends Date>(
    date: DateType,
    parts: FormatPart[]
  ) => FormatPart[]
}

/**
 * Individual localize function. Part of {@link Localize}.
 *
 * @typeParam Value - The value type to localize.
 *
 * @param value - The value to localize
 * @param options - The object with options
 *
 * @returns The localized string
 */
export type LocalizeFn<Value extends LocaleUnitValue | number> = (
  value: Value,
  options?: LocalizeFnOptions
) => string

/**
 * The {@link LocalizeFn} function options.
 */
export interface LocalizeFnOptions {
  /** The width to use formatting the value, defines how short or long
   * the formatted string might be. */
  width?: LocaleWidth
  /** The context where the formatted value is used - standalone: the result
   * should make grammatical sense as is and formatting: the result is a part
   * of the formatted string. See: https://date-fns.org/docs/I18n-Contribution-Guide */
  context?: 'formatting' | 'standalone'
  /** The unit to format */
  unit?: LocaleUnit
}

/// Match types

/**
 * The object with functions used to match and parse various localized values.
 */
export interface Match {
  /** The function that parses a localized ordinal number. */
  ordinalNumber: MatchFn<number, { unit: LocaleUnit }>
  /** The function that parses a localized era. */
  era: MatchFn<Era>
  /** The function that parses a localized quarter. */
  quarter: MatchFn<Quarter>
  /** The function that parses a localized month. */
  month: MatchFn<Month>
  /** The function that parses a localized day of the week. */
  day: MatchFn<Day>
  /** The function that parses a localized time of the day. */
  dayPeriod: MatchFn<LocaleDayPeriod>
}

/**
 * The match function. Part of {@link Match}. Implements matcher for particular
 * unit type.
 *
 * @typeParam Result - The matched value type.
 * @typeParam ExtraOptions - The the extra options type.
 *
 * @param str - The string to match
 * @param options - The object with options
 *
 * @returns The match result or null if match failed
 */
export type MatchFn<Result, ExtraOptions = Record<string, unknown>> = (
  str: string,
  options?: MatchFnOptions<Result> & ExtraOptions
) => MatchFnResult<Result> | null

/**
 * The {@link MatchFn} function options.
 *
 * @typeParam Result - The matched value type.
 */
export interface MatchFnOptions<Result> {
  /** The width to use matching the value, defines how short or long
   * the matched string might be. */
  width?: LocaleWidth
  /**
   * @deprecated Map the value manually instead.
   * @example
   * const matchResult = locale.match.ordinalNumber('1st')
   * if (matchResult) {
   *   matchResult.value = valueCallback(matchResult.value)
   * }
   */
  valueCallback?: MatchValueCallback<string, Result>
}

/**
 * The function that allows to map the matched value to the actual type.
 *
 * @typeParam Arg - The argument type.
 * @typeParam Result - The matched value type.
 *
 * @param arg - The value to match
 *
 * @returns The matched value
 */
export type MatchValueCallback<Arg, Result> = (value: Arg) => Result

/**
 * The {@link MatchFn} function result.
 *
 * @typeParam Result - The matched value type.
 */
export interface MatchFnResult<Result> {
  /** The matched value parsed as the corresponding unit type */
  value: Result
  /** The remaining string after parsing */
  rest: string
}

/// Format long types

/**
 * The object with functions that return localized formats. Long stands for
 * sequence of tokens (i.e. PPpp) that allows to define how format both date
 * and time at once. Part of the public locale API.
 */
export interface FormatLong {
  /** The function that returns a localized long date format */
  date: FormatLongFn
  /** The function that returns a localized long time format */
  time: FormatLongFn
  /** The function that returns a localized format of date and time combined */
  dateTime: FormatLongFn
}

/**
 * The format long function. Formats date, time or both.
 *
 * @param options - The object with options
 *
 * @returns The localized string
 */
export type FormatLongFn = (options: FormatLongFnOptions) => string

/**
 * The {@link FormatLongFn} function options.
 */
export interface FormatLongFnOptions {
  /** Format width to set */
  width?: FormatLongWidth
}

/**
 * The format long width token, defines how short or long the formnatted value
 * might be. The actual result length is defined by the locale.
 */
export type FormatLongWidth = 'full' | 'long' | 'medium' | 'short' | 'any'

/// Common types

/**
 * The formatting unit value, represents the raw value that can be formatted.
 */
export type LocaleUnitValue = Era | Quarter | Month | Day | LocaleDayPeriod

/**
 * The format width. Defines how short or long the formatted string might be.
 * The actaul result length depends on the locale.
 */
export type LocaleWidth = 'narrow' | 'short' | 'abbreviated' | 'wide' | 'any'

/**
 * Token representing particular period of the day.
 */
export type LocaleDayPeriod =
  | 'am'
  | 'pm'
  | 'midnight'
  | 'noon'
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night'

/**
 * The units commonly used in the date formatting or parsing.
 */
export type LocaleUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'dayOfYear'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
/**
 * The generic date constructor. Replicates the Date constructor. Used to build
 * generic functions.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 */
export interface GenericDateConstructor<DateType extends Date = Date> {
  /**
   * The date constructor. Creates date with the current date and time.
   *
   * @returns The date instance
   */
  new (): DateType

  /**
   * The date constructor. Creates date with the passed date, number of
   * milliseconds or string to parse.
   *
   * @param value - The date, number of milliseconds or string to parse
   *
   * @returns The date instance
   */
  new (value: Date | number | string): DateType

  /**
   * The date constructor. Creates date with the passed date values (year,
   * month, etc.) Note that the month is 0-indexed.
   *
   * @param year - The year
   * @param month - The month. Note that the month is 0-indexed.
   * @param date - The day of the month
   * @param hours - The hours
   * @param minutes - The minutes
   * @param seconds - The seconds
   * @param ms - The milliseconds
   *
   * @returns The date instance
   */
  new (
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): DateType
}

/**
 * The duration object. Contains the duration in the units specified by the
 * object.
 */
export interface Duration {
  /** The number of years in the duration */
  years?: number
  /** The number of months in the duration */
  months?: number
  /** The number of weeks in the duration */
  weeks?: number
  /** The number of days in the duration */
  days?: number
  /** The number of hours in the duration */
  hours?: number
  /** The number of minutes in the duration */
  minutes?: number
  /** The number of seconds in the duration */
  seconds?: number
}

/**
 * The duration unit type alias.
 */
export type DurationUnit = keyof Duration

/**
 * An object that combines two dates to represent the time interval.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 */
export interface Interval<DateType extends Date = Date> {
  /** The start of the interval. */
  start: DateType | number | string
  /** The end of the interval. */
  end: DateType | number | string
}

/**
 * A version of {@link Interval} that has both start and end resolved to Date.
 */
export interface NormalizedInterval<DateType extends Date = Date> {
  /** The start of the interval. */
  start: DateType
  /** The end of the interval. */
  end: DateType
}

/**
 * The era. Can be either 0 (AD - Anno Domini) or 1 (BC - Before Christ).
 */
export type Era = 0 | 1

/**
 * The year quarter. Goes from 1 to 4.
 */
export type Quarter = 1 | 2 | 3 | 4

/**
 * The day of the week type alias. Unlike the date (the number of days since
 * the beginning of the month), which begins with 1 and is dynamic (can go up to
 * 28, 30, or 31), the day starts with 0 and static (always ends at 6). Look at
 * it as an index in an array where Sunday is the first element and Saturday
 * is the last.
 */
export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * The month type alias. Goes from 0 to 11, where 0 is January and 11 is
 * December.
 */
export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

/**
 * FirstWeekContainsDate is used to determine which week is the first week of
 * the year, based on what day the January, 1 is in that week.
 *
 * The day in that week can only be 1 (Monday) or 4 (Thursday).
 *
 * Please see https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system for more information.
 */
export type FirstWeekContainsDate = 1 | 4

/**
 * The date values, used to set or get date object values.
 */
export interface DateValues {
  /** The year */
  year?: number
  /** The month */
  month?: number
  /** The day of the month */
  date?: number
  /** The hours */
  hours?: number
  /** The minutes */
  minutes?: number
  /** The seconds */
  seconds?: number
  /** The milliseconds */
  milliseconds?: number
}

/**
 * The number rounding method.
 */
export type RoundingMethod = 'ceil' | 'floor' | 'round' | 'trunc'

/**
 * The ISO string format.
 *
 * - basic: Minimal number of separators
 * - extended: With separators added to enhance human readability
 */
export type ISOStringFormat = 'extended' | 'basic'

/**
 * The ISO date representation. Represents which component the string includes,
 * date, time or both.
 */
export type ISOStringRepresentation = 'complete' | 'date' | 'time'

/// Function options types

/**
 * The step function options. Used to build function options.
 */
export interface StepOptions {
  /** The step to use when iterating */
  step?: number
}

/**
 * The week function options. Used to build function options.
 */
export interface WeekOptions {
  /** Which day the week starts on. */
  weekStartsOn?: Day
}

/**
 * The first week contains date options. Used to build function options.
 */
export interface FirstWeekContainsDateOptions {
  /** See {@link FirstWeekContainsDate} for more details. */
  firstWeekContainsDate?: FirstWeekContainsDate
}

/**
 * The localized function options. Used to build function options.
 *
 * @typeParam LocaleFields - The locale fields used in the relevant function. Defines the minimum set of locale fields that must be provided.
 */
export interface LocalizedOptions<LocaleFields extends keyof Locale> {
  /** The locale to use in the function. */
  locale?: Pick<Locale, LocaleFields>
}

/**
 * The ISO format function options. Used to build function options.
 */
export interface ISOFormatOptions {
  /** The format to use: basic with minimal number of separators or extended
   * with separators added to enhance human readability */
  format?: ISOStringFormat
  /** The date representation - what component to format: date, time\
   * or both (complete) */
  representation?: ISOStringRepresentation
}

/**
 * The rounding options. Used to build function options.
 */
export interface RoundingOptions {
  /** The rounding method to use */
  roundingMethod?: RoundingMethod
}

/**
 * Additional tokens options. Used to build function options.
 */
export interface AdditionalTokensOptions {
  /** If true, allows usage of the week-numbering year tokens `YY` and `YYYY`.
   * See: https://date-fns.org/docs/Unicode-Tokens */
  useAdditionalWeekYearTokens?: boolean
  /** If true, allows usage of the day of year tokens `D` and `DD`.
   * See: https://date-fns.org/docs/Unicode-Tokens */
  useAdditionalDayOfYearTokens?: boolean
}

/**
 * Nearest minute type. Goes from 1 to 30, where 1 is the nearest minute and 30
 * is nearest half an hour.
 */
export type NearestMinutes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30

/**
 * The nearest minutes function options. Used to build function options.
 */
export interface NearestMinutesOptions {
  /** The nearest number of minutes to round to. E.g. `15` to round to quarter hours. */
  nearestTo?: NearestMinutes
}

export function addLeadingZeros(number: number, targetLength: number): string {
  const sign = number < 0 ? '-' : ''
  const output = Math.abs(number).toString().padStart(targetLength, '0')
  return sign + output
}

type LongFormatter = (pattern: string, formatLong: FormatLong) => string

const dateLongFormatter: LongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case 'P':
      return formatLong.date({ width: 'short' })
    case 'PP':
      return formatLong.date({ width: 'medium' })
    case 'PPP':
      return formatLong.date({ width: 'long' })
    default:
      return formatLong.date({ width: 'full' })
  }
}

const timeLongFormatter: LongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case 'p':
      return formatLong.time({ width: 'short' })
    case 'pp':
      return formatLong.time({ width: 'medium' })
    case 'ppp':
      return formatLong.time({ width: 'long' })

    default:
      return formatLong.time({ width: 'full' })
  }
}

const dateTimeLongFormatter: LongFormatter = (
  pattern: string,
  formatLong: FormatLong
) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || []
  const datePattern = matchResult[1]
  const timePattern = matchResult[2]

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong)
  }

  let dateTimeFormat: string

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({ width: 'short' })
      break
    case 'PP':
      dateTimeFormat = formatLong.dateTime({ width: 'medium' })
      break
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({ width: 'long' })
      break
    default:
      dateTimeFormat = formatLong.dateTime({ width: 'full' })
      break
  }

  return dateTimeFormat
    .replace('{{date}}', dateLongFormatter(datePattern, formatLong))
    .replace('{{time}}', timeLongFormatter(timePattern, formatLong))
}

export const longFormatters: Record<string, LongFormatter> = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

export const lightFormatters = {
  // Year
  y(date: Date, token: string): string {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear()
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear
    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length)
  },

  // Month
  M(date: Date, token: string): string {
    const month = date.getMonth()
    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2)
  },

  // Day of the month
  d(date: Date, token: string): string {
    return addLeadingZeros(date.getDate(), token.length)
  },

  // AM or PM
  a(date: Date, token: string): string {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? 'pm' : 'am'

    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase()
      case 'aaa':
        return dayPeriodEnumValue
      case 'aaaaa':
        return dayPeriodEnumValue[0]

      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.'
    }
  },

  // Hour [1-12]
  h(date: Date, token: string): string {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length)
  },

  // Hour [0-23]
  H(date: Date, token: string): string {
    return addLeadingZeros(date.getHours(), token.length)
  },

  // Minute
  m(date: Date, token: string): string {
    return addLeadingZeros(date.getMinutes(), token.length)
  },

  // Second
  s(date: Date, token: string): string {
    return addLeadingZeros(date.getSeconds(), token.length)
  },

  // Fraction of second
  S(date: Date, token: string): string {
    const numberOfDigits = token.length
    const milliseconds = date.getMilliseconds()
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    )
    return addLeadingZeros(fractionalSeconds, token.length)
  },
}

const dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night',
} as const

type Formatter = (
  date: Date,
  token: string,
  localize: Localize,
  options: Required<
    LocalizedOptions<'options'> & WeekOptions & FirstWeekContainsDateOptions
  >
) => string

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

export const formatters: { [token: string]: Formatter } = {
  // Era
  G: (date, token, localize) => {
    const era: Era = date.getFullYear() > 0 ? 1 : 0
    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, { width: 'abbreviated' })
      // A, B
      case 'GGGGG':
        return localize.era(era, { width: 'narrow' })
      // Anno Domini, Before Christ
      default:
        return localize.era(era, { width: 'wide' })
    }
  },

  // Year
  y: (date, token, localize) => {
    // Ordinal number
    if (token === 'yo') {
      const signedYear = date.getFullYear()
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear
      return localize.ordinalNumber(year, { unit: 'year' })
    }

    return lightFormatters.y(date, token)
  },

  // Local week-numbering year
  Y: (date, token, localize, options) => {
    const signedWeekYear = getWeekYear(date, options)
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear

    // Two digit year
    if (token === 'YY') {
      const twoDigitYear = weekYear % 100
      return addLeadingZeros(twoDigitYear, 2)
    }

    // Ordinal number
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, { unit: 'year' })
    }

    // Padding
    return addLeadingZeros(weekYear, token.length)
  },

  // ISO week-numbering year
  R: (date, token) => {
    const isoWeekYear = getISOWeekYear(date)

    // Padding
    return addLeadingZeros(isoWeekYear, token.length)
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: (date, token) => {
    const year = date.getFullYear()
    return addLeadingZeros(year, token.length)
  },

  // Quarter
  Q: (date, token, localize) => {
    const quarter = Math.ceil((date.getMonth() + 1) / 3) as Quarter
    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'QQ':
        return addLeadingZeros(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'Qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting',
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting',
        })
      // 1st quarter, 2nd quarter, ...
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // Stand-alone quarter
  q: (date, token, localize) => {
    const quarter = Math.ceil((date.getMonth() + 1) / 3) as Quarter
    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter)
      // 01, 02, 03, 04
      case 'qq':
        return addLeadingZeros(quarter, 2)
      // 1st, 2nd, 3rd, 4th
      case 'qo':
        return localize.ordinalNumber(quarter, { unit: 'quarter' })
      // Q1, Q2, Q3, Q4
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone',
        })
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone',
        })
      // 1st quarter, 2nd quarter, ...

      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone',
        })
    }
  },

  // Month
  M: (date, token, localize) => {
    const month = date.getMonth() as Month
    switch (token) {
      case 'M':
      case 'MM':
        return lightFormatters.M(date, token)
      // 1st, 2nd, ..., 12th
      case 'Mo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting',
        })
      // J, F, ..., D
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting',
        })
      // January, February, ..., December
      default:
        return localize.month(month, { width: 'wide', context: 'formatting' })
    }
  },

  // Stand-alone month
  L: (date, token, localize) => {
    const month = date.getMonth() as Month
    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1)
      // 01, 02, ..., 12
      case 'LL':
        return addLeadingZeros(month + 1, 2)
      // 1st, 2nd, ..., 12th
      case 'Lo':
        return localize.ordinalNumber(month + 1, { unit: 'month' })
      // Jan, Feb, ..., Dec
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone',
        })
      // J, F, ..., D
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone',
        })
      // January, February, ..., December
      default:
        return localize.month(month, { width: 'wide', context: 'standalone' })
    }
  },

  // Local week of year
  w: (date, token, localize, options) => {
    const week = getWeek(date, options)

    if (token === 'wo') {
      return localize.ordinalNumber(week, { unit: 'week' })
    }

    return addLeadingZeros(week, token.length)
  },

  // ISO week of year
  I: (date, token, localize) => {
    const isoWeek = getISOWeek(date)

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, { unit: 'week' })
    }

    return addLeadingZeros(isoWeek, token.length)
  },

  // Day of the month
  d: (date, token, localize) => {
    if (token === 'do') {
      return localize.ordinalNumber(date.getDate(), { unit: 'date' })
    }

    return lightFormatters.d(date, token)
  },

  // Day of year
  D: (date, token, localize) => {
    const dayOfYear = getDayOfYear(date)

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, { unit: 'dayOfYear' })
    }

    return addLeadingZeros(dayOfYear, token.length)
  },

  // Day of week
  E: (date, token, localize) => {
    const dayOfWeek = date.getDay() as Day
    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting',
        })
      // T
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting',
        })
      // Tu
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting',
        })
      // Tuesday
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // Local day of week
  e: (date, token, localize, options) => {
    const dayOfWeek = date.getDay() as Day
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'ee':
        return addLeadingZeros(localDayOfWeek, 2)
      // 1st, 2nd, ..., 7th
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting',
        })
      // T
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting',
        })
      // Tu
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting',
        })
      // Tuesday
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // Stand-alone local day of week
  c: (date, token, localize, options) => {
    const dayOfWeek = date.getDay() as Day
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7
    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek)
      // Padded numerical value
      case 'cc':
        return addLeadingZeros(localDayOfWeek, token.length)
      // 1st, 2nd, ..., 7th
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, { unit: 'day' })
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone',
        })
      // T
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone',
        })
      // Tu
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone',
        })
      // Tuesday
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone',
        })
    }
  },

  // ISO day of week
  i: (date, token, localize) => {
    const dayOfWeek = date.getDay() as Day
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek
    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek)
      // 02
      case 'ii':
        return addLeadingZeros(isoDayOfWeek, token.length)
      // 2nd
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, { unit: 'day' })
      // Tue
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting',
        })
      // T
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting',
        })
      // Tu
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting',
        })
      // Tuesday

      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // AM or PM
  a: (date, token, localize) => {
    const hours = date.getHours()
    const dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'

    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting',
        })
      case 'aaa':
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting',
          })
          .toLowerCase()
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting',
        })

      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // AM, PM, midnight, noon
  b: (date, token, localize) => {
    const hours = date.getHours()
    let dayPeriodEnumValue: LocaleDayPeriod
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am'
    }

    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting',
        })
      case 'bbb':
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting',
          })
          .toLowerCase()
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting',
        })

      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: (date, token, localize) => {
    const hours = date.getHours()
    let dayPeriodEnumValue: LocaleDayPeriod
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting',
        })
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting',
        })

      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting',
        })
    }
  },

  // Hour [1-12]
  h: (date, token, localize) => {
    if (token === 'ho') {
      let hours = date.getHours() % 12
      if (hours === 0) hours = 12
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return lightFormatters.h(date, token)
  },

  // Hour [0-23]
  H: (date, token, localize) => {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getHours(), { unit: 'hour' })
    }

    return lightFormatters.H(date, token)
  },

  // Hour [0-11]
  K: (date, token, localize) => {
    const hours = date.getHours() % 12

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return addLeadingZeros(hours, token.length)
  },

  // Hour [1-24]
  k: (date, token, localize) => {
    let hours = date.getHours()
    if (hours === 0) hours = 24

    if (token === 'ko') {
      return localize.ordinalNumber(hours, { unit: 'hour' })
    }

    return addLeadingZeros(hours, token.length)
  },

  // Minute
  m: (date, token, localize) => {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getMinutes(), { unit: 'minute' })
    }

    return lightFormatters.m(date, token)
  },

  // Second
  s: (date, token, localize) => {
    if (token === 'so') {
      return localize.ordinalNumber(date.getSeconds(), { unit: 'second' })
    }

    return lightFormatters.s(date, token)
  },

  // Fraction of second
  S: (date, token) => lightFormatters.S(date, token),

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: (date, token, _localize) => {
    const timezoneOffset = date.getTimezoneOffset()

    if (timezoneOffset === 0) {
      return 'Z'
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX': // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: (date, token, _localize) => {
    const timezoneOffset = date.getTimezoneOffset()

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset)

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx': // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset)

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (GMT)
  O: (date, token, _localize) => {
    const timezoneOffset = date.getTimezoneOffset()

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long

      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },

  // Timezone (specific non-location)
  z: (date, token, _localize) => {
    const timezoneOffset = date.getTimezoneOffset()

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':')
      // Long

      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':')
    }
  },

  // Seconds timestamp
  t: (date, token, _localize) => {
    const timestamp = Math.trunc(date.getTime() / 1000)
    return addLeadingZeros(timestamp, token.length)
  },

  // Milliseconds timestamp
  T: (date, token, _localize) => {
    const timestamp = date.getTime()
    return addLeadingZeros(timestamp, token.length)
  },
}

function formatTimezoneShort(offset: number, delimiter: string = ''): string {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = Math.trunc(absOffset / 60)
  const minutes = absOffset % 60
  if (minutes === 0) {
    return sign + String(hours)
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2)
}

function formatTimezoneWithOptionalMinutes(
  offset: number,
  delimiter?: string
): string {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? '-' : '+'
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2)
  }
  return formatTimezone(offset, delimiter)
}

function formatTimezone(offset: number, delimiter: string = ''): string {
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2)
  const minutes = addLeadingZeros(absOffset % 60, 2)
  return sign + hours + delimiter + minutes
}
