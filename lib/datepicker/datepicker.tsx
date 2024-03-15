import React, { useContext } from 'react'
import { Calendar } from './components/calendar/calendar'
import { DateInput } from './components/dateInput/dateInput'
import { useLocale } from './hooks/useLocale'
import { DatepickerContext } from './provider'

const DatepickerComponent: React.FC = () => {
  const { open } = useContext(DatepickerContext)

  useLocale()

  return (
    <>
      <DateInput />

      {open && <Calendar />}
    </>
  )
}

export { DatepickerComponent }
