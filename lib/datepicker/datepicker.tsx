import { format, parse } from 'date-fns'
import React, { useRef, useContext, useCallback } from 'react'
import { Calendar } from './components/calendar/calendar'
import { InputField } from './components/input/input'
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
    currentDate,
  } = useContext(DatepickerContext)

  useLocale()

  const inputRef = useRef<HTMLInputElement>(null)

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen])

  const result = parse(inputValue, 'P', new Date(), { locale: locale })
  console.log(result)

  return (
    <>
      <InputField
        type="text"
        ref={inputRef}
        value={inputValue}
        placeholder={format(selectedDate ? selectedDate : currentDate, 'PPPP', {
          locale: locale,
        })}
        onChange={(e) => setInputValue(e.target.value)}
        suffix={
          <button type="button" onClick={toggleOpen}>
            Open
          </button>
        }
      />
      {open && <Calendar />}
    </>
  )
}

export { DatepickerComponent }
