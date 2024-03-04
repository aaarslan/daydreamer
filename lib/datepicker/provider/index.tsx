import React, { createContext, useMemo, useState } from 'react'
import { Locale, daysInMonth, daysOfTheWeek } from '../util'

export interface DatepickerContextProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  daysOfMonth: number[]
  daysOfWeek: string[]
  selectedDate?: Date
  setSelectedDate?: (date: Date) => void
}

const DatepickerContext = createContext<DatepickerContextProps>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  daysOfMonth: [],
  daysOfWeek: [],
  selectedDate: undefined,
  setSelectedDate: () => {},
})

const DatepickerProvider: React.FC<{
  children: React.ReactNode
  locale: Locale
}> = ({ children, locale }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const daysOfMonth = useMemo(() => {
    const numDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    )
    return Array.from({ length: numDays }, (_, index) => index + 1)
  }, [currentDate])

  const daysOfWeek = useMemo(() => daysOfTheWeek(locale, 'short', 4), [locale])

  const value = useMemo(
    () => ({
      currentDate,
      setCurrentDate,
      daysOfMonth,
      daysOfWeek,
      selectedDate,
      setSelectedDate,
    }),
    [currentDate, daysOfMonth, daysOfWeek, selectedDate]
  )

  return (
    <DatepickerContext.Provider value={value}>
      {children}
    </DatepickerContext.Provider>
  )
}

export { DatepickerContext, DatepickerProvider }
