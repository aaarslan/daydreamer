import { Locale } from 'date-fns'
import React, { createContext, useMemo, useState } from 'react'
import { daysInMonth, daysOfTheWeek } from '../util'

export interface DatepickerContextProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  daysOfMonth: number[]
  daysOfWeek: string[]
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  open: boolean
  setOpen: (open: boolean) => void
  inputValue: string
  setInputValue: (value: string) => void
}

const DatepickerContext = createContext<DatepickerContextProps>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  daysOfMonth: [],
  daysOfWeek: [],
  selectedDate: null,
  setSelectedDate: () => {},
  open: false,
  setOpen: () => {},
  inputValue: '',
  setInputValue: () => {},
})

const DatepickerProvider: React.FC<{
  children: React.ReactNode
  locale: Locale
}> = ({ children, locale }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] =
    useState<DatepickerContextProps['selectedDate']>(null)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const daysOfMonth = useMemo(() => {
    const numDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    )
    return Array.from({ length: numDays }, (_, index) => index + 1)
  }, [currentDate])

  const daysOfWeek = useMemo(
    () => daysOfTheWeek(locale.code, 'short', 4),
    [locale]
  )

  const value = useMemo(
    () => ({
      currentDate,
      setCurrentDate,
      daysOfMonth,
      daysOfWeek,
      selectedDate,
      setSelectedDate,
      open,
      setOpen,
      inputValue,
      setInputValue,
    }),
    [currentDate, daysOfMonth, daysOfWeek, selectedDate, open, inputValue]
  )

  return (
    <DatepickerContext.Provider value={value}>
      {children}
    </DatepickerContext.Provider>
  )
}

export { DatepickerContext, DatepickerProvider }
