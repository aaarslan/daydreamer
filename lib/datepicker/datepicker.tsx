import * as Locales from 'date-fns/locale'
import React, { useEffect, useRef, useContext } from 'react'
import Calendar from './components/calendar/calendar'
import { InputField } from './components/input/input'
import './datepicker.css'

import useDate from './hooks/useDate'
import { DatepickerContext } from './provider'

const DatepickerComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {
    open,
    selectedDate,
    setSelectedDate,
    setOpen,
    setInputValue,
    inputValue,
  } = useContext(DatepickerContext)
  const { parseDateFromString } = useDate(null)

  const handleInputBlur = (_event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!dialogRef.current?.contains(document.activeElement)) {
        setOpen(false)
      }
    }, 0)
  }

  const { formatDate } = useDate(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const dateParts = rawValue.match(/(\d{2})\/(\d{2})\/(\d{4})/)
    if (dateParts) {
      const [, day, month, year] = dateParts.map(Number)
      const parsedDate = new Date(year, month - 1, day)
      if (!Number.isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate)

        const formattedDate = `${day}/${month}/${year}`
        setInputValue(formattedDate)
        setSelectedDate(parseDateFromString(formattedDate))
      } else {
        // Handle invalid date, e.g., show an error or clear the input
        setInputValue(selectedDate ? formatDate(selectedDate) : '')
        console.log('Invalid date')
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !dialogRef.current?.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setOpen])

  return (
    <>
      <InputField
        type="text"
        aria-haspopup="dialog"
        aria-expanded={open}
        locale={Locales.enUS}
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleInputBlur}
        suffix={
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
        }
      />
      {open && (
        <dialog
          id="datepicker-dialog"
          className="datepicker-dialog"
          open
          ref={dialogRef}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <Calendar />
        </dialog>
      )}
    </>
  )
}

export default DatepickerComponent
