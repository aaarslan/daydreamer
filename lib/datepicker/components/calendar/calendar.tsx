import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import React, { useContext } from 'react'
import { DatepickerContext } from '../../provider'

const Calendar: React.FC = () => {
  const {
    currentDate,
    setCurrentDate,
    daysOfWeek,
    selectedDate,
    setSelectedDate,
    locale,
  } = useContext(DatepickerContext)

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    )
  }

  const start = startOfMonth(currentDate)
  const end = endOfMonth(currentDate)
  const daysToRender = eachDayOfInterval({ start, end })

  return (
    <div className="datepicker-grid">
      <button
        type="button"
        className="month-change"
        onClick={() => handleMonthChange(-1)}
      >
        {'<'}
      </button>
      <div className="current-month" style={{ gridColumn: 'span 5' }}>
        {currentDate.toLocaleString(locale.code, { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </div>
      <button
        type="button"
        className="month-change"
        onClick={() => handleMonthChange(1)}
      >
        {'>'}
      </button>
      {daysOfWeek.map(
        (
          day:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined,
          index: React.Key | null | undefined
        ) => (
          <div key={index} className="day-of-week">
            {day}
          </div>
        )
      )}
      {daysToRender.map((date, index) => {
        const isSelected = selectedDate && isSameDay(selectedDate, date)
        const isCurrentDay = isSameDay(date, new Date())
        const dayClass = `day ${isSelected ? 'selected' : ''} ${
          isCurrentDay ? 'today' : ''
        }`

        return (
          <div
            key={index}
            className={dayClass}
            onClick={() => setSelectedDate(date)}
          >
            {date.getDate()}
          </div>
        )
      })}
    </div>
  )
}

export { Calendar }
