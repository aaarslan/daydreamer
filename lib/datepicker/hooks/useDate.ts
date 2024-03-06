import { Locale, format, isValid, parse } from 'date-fns'
import * as Locales from 'date-fns/locale'
import { useState } from 'react'

const formatDate = (date: Date | null, locale: Locale = Locales.enUS) => {
  if (!date) {
    return ''
  }

  try {
    return format(date, 'P', { locale })
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

interface UseDateHook {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  formatDate: (date: Date, locale?: Locale) => string
  parseDateFromString: (dateStr: string) => Date | null
}

function useDate(initialDate: Date | null): UseDateHook {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate)

  const parseDateFromString = (dateStr: string): Date | null => {
    const dateFormats = [
      'M/d/yyyy',
      'MM/dd/yyyy',
      'M-d-yyyy',
      'MM-dd-yyyy',
      'M.d.yyyy',
      'MM.dd.yyyy',
      'd M yyyy',
      'dd MM yyyy',
      'd/M/yyyy',
      'dd/MM/yyyy',
      'd-M-yyyy',
      'dd-MM-yyyy',
      'd.M.yyyy',
      'dd.MM.yyyy',
      'yyyy M d',
      'yyyy MM dd',
      'yyyy/M/d',
      'yyyy/MM/dd',
      'yyyy-M-d',
      'yyyy-MM-dd',
      'yyyy.M.d',
      'yyyy.MM.dd',
    ]

    for (let format of dateFormats) {
      const parsedDate = parse(dateStr, format, new Date())
      if (isValid(parsedDate)) {
        return parsedDate
      }
    }
    return null
  }

  return {
    selectedDate,
    setSelectedDate,
    formatDate,
    parseDateFromString,
  }
}

export default useDate
