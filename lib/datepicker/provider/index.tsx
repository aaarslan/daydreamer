import {
  Locale,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
import React, { createContext, useMemo, useState } from 'react'

export interface DatepickerContextProps {
  daysOfWeek: string[]
  currentDate: Date
  setCurrentDate: (date: Date) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  open: boolean
  setOpen: (open: boolean) => void
  inputValue: string
  setInputValue: (value: string) => void
  locale: Locale
}

const DatepickerContext = createContext<DatepickerContextProps>({
  daysOfWeek: [],
  currentDate: new Date(),
  setCurrentDate: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  open: false,
  setOpen: () => {},
  inputValue: '',
  setInputValue: () => {},
  locale: enUS,
})

const DatepickerProvider: React.FC<{
  children: React.ReactNode
  locale: Locale
}> = ({ children, locale }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const daysOfWeek = useMemo(() => {
    const start = startOfWeek(new Date(), { locale })
    const end = endOfWeek(new Date(), { locale })
    return eachDayOfInterval({ start, end }).map((day) =>
      format(day, 'eee', { locale })
    )
  }, [locale])

  const value = {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    open,
    setOpen,
    inputValue,
    setInputValue,
    locale,
    daysOfWeek,
  }

  return (
    <DatepickerContext.Provider value={value}>
      {children}
    </DatepickerContext.Provider>
  )
}

export { DatepickerContext, DatepickerProvider }
