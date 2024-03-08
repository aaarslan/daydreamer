import React, { useRef, useContext } from 'react'
import { Calendar } from './components/calendar/calendar'
import { InputField } from './components/input/input'
import { DatepickerContext } from './provider'

const DatepickerComponent: React.FC = () => {
  const { open, setOpen, inputValue, setInputValue } =
    useContext(DatepickerContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      <InputField
        type="text"
        ref={inputRef}
        value={inputValue}
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
