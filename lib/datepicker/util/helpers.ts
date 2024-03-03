import { Locale } from './types'

function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export interface DaysOfTheWeekOptions {
  locale: Locale
  format?: 'long' | 'short' | 'narrow'
}

function daysOfTheWeek(
  locale: Locale,
  format: 'long' | 'short' | 'narrow' = 'narrow'
): string[] {
  return Array.from({ length: 7 }, (_, i) =>
    new Date(1970, 0, i + 4).toLocaleDateString(locale, { weekday: format })
  )
}

function isToday(day: number, month: number, year: number): boolean {
  const today = new Date()
  return (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
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
}
