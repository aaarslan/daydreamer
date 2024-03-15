import { format, getDaysInMonth } from 'date-fns'
import React, { useContext, useState } from 'react'
import { DatepickerContext } from '../../provider'
import './dateInput.css'

export interface DateInputProps {
  placeholder: '/' | '-' | '.' | string
  maxYear?: number
  minYear?: number
}

const DateInput: React.FC<DateInputProps> = ({
  placeholder = '/',
  maxYear = 2100,
  minYear = 1900,
}: DateInputProps) => {
  const { selectedDate, setSelectedDate, locale } =
    useContext(DatepickerContext)

  const [month, setMonth] = useState(
    selectedDate ? selectedDate.getMonth() + 1 : ''
  )
  const [day, setDay] = useState(selectedDate ? selectedDate.getDate() : '')
  const [year, setYear] = useState(
    selectedDate ? selectedDate.getFullYear() : ''
  )

  const updateSelectedDate = (y: number, m: number, d: number) => {
    if (
      y >= minYear &&
      y <= maxYear &&
      m >= 1 &&
      m <= 12 &&
      d >= 1 &&
      d <= getDaysInMonth(new Date(y, m - 1))
    ) {
      setSelectedDate(new Date(y, m - 1, d))
    }
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value
    setMonth(newMonth)
    updateSelectedDate(
      year ? parseInt(year.toString()) : new Date().getFullYear(),
      parseInt(newMonth),
      day ? parseInt(day.toString()) : 1
    )
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value
    setDay(newDay)
    updateSelectedDate(
      year ? parseInt(year.toString()) : new Date().getFullYear(),
      month ? parseInt(month.toString()) : 1,
      parseInt(newDay)
    )
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value
    setYear(newYear)
    updateSelectedDate(
      parseInt(newYear),
      month ? parseInt(month.toString()) : 1,
      day ? parseInt(day.toString()) : 1
    )
  }

  return (
    <div className="date-input-container">
      <input
        className="date-input"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={month}
        onChange={handleMonthChange}
        min="1"
        max="12"
        placeholder={format(new Date(), 'MM', { locale })}
      />
      <span
        className={
          month || day || year
            ? 'date-input-separator'
            : 'date-input-separator placeholder-color'
        }
      >
        {placeholder}
      </span>
      <input
        className="date-input"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={day}
        onChange={handleDayChange}
        min="1"
        max={getDaysInMonth(
          new Date(
            parseInt(year.toString()) || new Date().getFullYear(),
            month ? parseInt(month.toString()) - 1 : 0
          )
        )}
        placeholder={format(new Date(), 'dd', { locale })}
      />
      <span
        className={
          month || day || year
            ? 'date-input-separator'
            : 'date-input-separator placeholder-color'
        }
      >
        {placeholder}
      </span>
      <input
        className="date-input-year"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={year}
        onChange={handleYearChange}
        min={minYear}
        max={maxYear}
        placeholder={format(new Date(), 'yyyy', { locale })}
      />
    </div>
  )
}

export { DateInput }
