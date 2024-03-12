import { format, isValid, parse } from 'date-fns'
import React, { useContext, useCallback, useRef } from 'react'
import { Calendar } from './components/calendar/calendar'

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

  const inputRef = useRef<HTMLInputElement>(null)
  useLocale()

  const dateFormat = 'P'
  const maxLength = format(new Date(), dateFormat, { locale }).length

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen])

  const handleInputChange = useCallback(
    (value: string) => {
      if (value.length <= maxLength) {
        setInputValue(value)
        const parsedDate = parse(value, dateFormat, new Date(), { locale })
        if (isValid(parsedDate)) {
          setSelectedDate(parsedDate)
        } else {
          setSelectedDate(null)
        }
      }
    },
    [setInputValue, setSelectedDate, maxLength, locale]
  )

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
      <input
        ref={inputRef}
        type="text"
        value={
          selectedDate
            ? format(selectedDate, dateFormat, { locale })
            : inputValue
        }
        onChange={(e) => handleInputChange(e.target.value)}
        maxLength={maxLength}
        placeholder={format(new Date(), dateFormat, { locale })}
      />
      <button type="button" onClick={toggleOpen}>
        Open
      </button>
      {open && <Calendar onDateSelect={handleCalendarClick} />}
    </>
  )
}

export { DatepickerComponent }
