/**
 * Calendar Component
 *
 * Renders the calendar grid, including navigation buttons and day cells.
 * It uses the DatepickerContext for accessing and modifying the current and selected dates.
 */
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { DatepickerContext } from '../../provider'

const Calendar: React.FC = React.memo(() => {
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

  const handleTodayClick = () => {
    setCurrentDate(new Date())
  }

  const daysToRender = useMemo(() => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    return eachDayOfInterval({ start, end })
  }, [currentDate])

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
        {format(currentDate, 'MMMM', { locale: locale })}{' '}
        {format(currentDate, 'yyyy', { locale: locale })}
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
          index: React.Key
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
      <button type="button" className="month-change" onClick={handleTodayClick}>
        Today
      </button>
    </div>
  )
})

export { Calendar }
