import * as Locales from 'date-fns/locale'
import React, { useEffect, useRef, useContext } from 'react'
import Calendar from './components/calendar/calendar'
import { InputField } from './components/input/input'
import './datepicker.css'

import { DatepickerContext } from './provider'

const DatepickerComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { open, setOpen } = useContext(DatepickerContext)

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
