import { format, formatISO, isValid, parseISO, startOfDay } from 'date-fns'
import React, { useContext, useCallback } from 'react'
import { Calendar } from './components/calendar/calendar'
import DateInput from './components/dateInput/dateInput'
import { useLocale } from './hooks/useLocale'
import { DatepickerContext } from './provider'

const DatepickerComponent: React.FC = () => {
  const {
    open,
    setOpen,
    inputValue,
    setInputValue,
    locale,
    selectedDate,
    setSelectedDate,
  } = useContext(DatepickerContext)

  useLocale()

  const dateFormat = 'P'

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen])

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value)
      const parsedDate = parseISO(value)
      if (isValid(parsedDate)) {
        setSelectedDate(startOfDay(parsedDate))
      } else {
        // Set to null or handle invalid input as needed
        setSelectedDate(null)
      }
    },
    [setInputValue, setSelectedDate]
  )

  const handleInputBlur = useCallback(() => {
    // Validate the current input value and sanitize if necessary
    if (!isValid(parseISO(inputValue))) {
      setInputValue('')
      setSelectedDate(null)
    }
  }, [inputValue, setInputValue, setSelectedDate])

  const formattedDate = selectedDate
    ? formatISO(selectedDate, { representation: 'date' })
    : ''

  const handleCalendarClick = useCallback(
    (date: Date) => {
      setSelectedDate(date)
      setInputValue(format(date, dateFormat, { locale }))
      toggleOpen()
    },
    [setSelectedDate, setInputValue, locale, toggleOpen]
  )

  return (
    <>
      <DateInput value={inputValue} onChange={handleInputChange} />
      <button type="button" onClick={() => setOpen(!open)}>
        Open
      </button>
      {open && <Calendar onDateSelect={handleCalendarClick} />}
    </>
  )
}

export { DatepickerComponent }
