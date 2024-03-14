import { format, getDaysInMonth } from 'date-fns'
import React, { useContext, useState } from 'react'
import { DatepickerContext } from '../../provider'

const DateInput: React.FC = () => {
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
      y >= 1900 &&
      y <= 3000 &&
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <input
          type="number"
          value={month}
          onChange={handleMonthChange}
          min="1"
          max="12"
          placeholder={format(new Date(), 'MM', { locale })}
        />
      </div>
      <div>
        <input
          type="number"
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
      </div>
      <div>
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          min="1900"
          max="3000"
          placeholder={format(new Date(), 'yyyy', { locale })}
        />
      </div>
    </div>
  )
}

export { DateInput }
