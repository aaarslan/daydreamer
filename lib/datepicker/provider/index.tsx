import {
  Locale,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns'

import React, {
  createContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react'

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
  locale?: Locale
  setLocale?: (locale: Locale) => void
}

export interface DatepickerProviderProps {
  initialLocale?: Locale
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
  locale: undefined,
  setLocale: () => {},
})

const DatepickerProvider: React.FC<PropsWithChildren<DatepickerProviderProps>> =
  ({ children, initialLocale }) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState('')
    const [locale, setLocale] = useState<Locale | undefined>(initialLocale)
    const daysOfWeek = useMemo(() => {
      const start = startOfWeek(new Date(), { locale })
      const end = endOfWeek(new Date(), { locale })
      return eachDayOfInterval({ start, end }).map((day) =>
        format(day, 'eeee', { locale })
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
      setLocale,
      daysOfWeek,
    }

    return (
      <DatepickerContext.Provider value={value}>
        {children}
      </DatepickerContext.Provider>
    )
  }

export { DatepickerContext, DatepickerProvider }
