import React, { createContext, useMemo, useState } from 'react'
import { daysInMonth, daysOfTheWeek } from '../util'

export interface DatepickerContextProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  daysOfMonth: number[]
  daysOfWeek: string[]
}

const DatepickerContext = createContext<DatepickerContextProps>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  daysOfMonth: [],
  daysOfWeek: [],
})

const DatepickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysOfMonth = useMemo(() => {
    const numDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    )
    return Array.from({ length: numDays }, (_, index) => index + 1)
  }, [currentDate])

  const daysOfWeek = useMemo(() => daysOfTheWeek('en-US', 'short'), [])

  const value = useMemo(
    () => ({
      currentDate,
      setCurrentDate,
      daysOfMonth,
      daysOfWeek,
    }),
    [currentDate, daysOfMonth, daysOfWeek]
  )

  return (
    <DatepickerContext.Provider value={value}>
      {children}
    </DatepickerContext.Provider>
  )
}

export { DatepickerContext, DatepickerProvider }
