import { Locale } from 'date-fns'

interface DaysOfTheWeekOptions {
  locale: Locale
  format?: 'long' | 'short' | 'narrow'
}

interface DaysInMonthOptions {
  locale: Locale
  day: '2-digit' | 'numeric'
}

function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function daysOfTheWeek(
  locale: Locale['code'],
  format: 'long' | 'short' | 'narrow' = 'narrow',
  firstDayOfWeek: number = 1
): string[] {
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(
      1970,
      0,
      i + firstDayOfWeek + 4 - new Date(1970, 0, 1).getDay()
    )
    return new Intl.DateTimeFormat(locale, { weekday: format }).format(day)
  })
  return days
}

function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

function isWeekend(day: number): boolean {
  return day === 0 || day === 6
}

function isCurrentMonth(month: number, year: number): boolean {
  const today = new Date()
  return month === today.getMonth() && year === today.getFullYear()
}

function isCurrentYear(year: number): boolean {
  const today = new Date()
  return year === today.getFullYear()
}

function resetDate(date: Date): Date {
  return new Date(date)
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear()
}

function isBeforeDate(date1: Date, date2: Date): boolean {
  return date1 < date2
}

function isAfterDate(date1: Date, date2: Date): boolean {
  return date1 > date2
}

function isBetweenDates(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate
}

function isSameOrBeforeDate(date1: Date, date2: Date): boolean {
  return date1 <= date2
}

function isSameOrAfterDate(date1: Date, date2: Date): boolean {
  return date1 >= date2
}

function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate
}

function isDateInFuture(date: Date): boolean {
  return date > new Date()
}

function isDateInPast(date: Date): boolean {
  return date < new Date()
}

function isDateValid(date: Date): boolean {
  return !Number.isNaN(date.getTime())
}

function isLeapYear(year: number): boolean {
  return new Date(year, 1, 29).getDate() === 29
}

function isDateRangeValid(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate
}

function isDateDisabled(date: Date, disabledDates: Date[]): boolean {
  return disabledDates.some((disabledDate) => isSameDay(date, disabledDate))
}

function isDateExcluded(date: Date, excludedDates: Date[]): boolean {
  return excludedDates.some((excludedDate) => isSameDay(date, excludedDate))
}

function isDateIncluded(date: Date, includedDates: Date[]): boolean {
  return includedDates.some((includedDate) => isSameDay(date, includedDate))
}

function getDaysForMonthView(currentDate: Date): Date[] {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const previousMonthDaysToShow = firstDayOfWeek === 6 ? 6 : firstDayOfWeek
  const nextMonthDaysToShow =
    42 - (previousMonthDaysToShow + daysInMonth(month, year))
  const previousMonth = new Date(year, month - 1, 1)
  const daysInPreviousMonth = daysInMonth(
    previousMonth.getMonth(),
    previousMonth.getFullYear()
  )
  const previousMonthOverflow = Array.from(
    { length: previousMonthDaysToShow },
    (_, i) => {
      return new Date(
        year,
        month - 1,
        daysInPreviousMonth - previousMonthDaysToShow + i + 1
      )
    }
  )
  const currentMonthDays = Array.from(
    { length: daysInMonth(month, year) },
    (_, i) => {
      return new Date(year, month, i + 1)
    }
  )
  const nextMonthOverflow = Array.from(
    { length: nextMonthDaysToShow },
    (_, i) => {
      return new Date(year, month + 1, i + 1)
    }
  )
  return [...previousMonthOverflow, ...currentMonthDays, ...nextMonthOverflow]
}

export {
  daysInMonth,
  daysOfTheWeek,
  isToday,
  isWeekend,
  isCurrentMonth,
  isCurrentYear,
  resetDate,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBeforeDate,
  isAfterDate,
  isBetweenDates,
  isSameOrBeforeDate,
  isSameOrAfterDate,
  isDateInRange,
  isDateInFuture,
  isDateInPast,
  isDateValid,
  isLeapYear,
  isDateRangeValid,
  isDateDisabled,
  isDateExcluded,
  isDateIncluded,
  getDaysForMonthView,
}

export type { DaysOfTheWeekOptions, DaysInMonthOptions }
