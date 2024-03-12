/**
 * Calendar Component
 *
 * Renders the calendar grid, including navigation buttons and day cells.
 * It uses the DatepickerContext for accessing and modifying the current and selected dates.
 */
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { DatepickerContext } from '../../provider'

interface CalendarProps {
  onDateSelect: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = React.memo(({ onDateSelect }) => {
  const { currentDate, setCurrentDate, daysOfWeek, selectedDate, locale } =
    useContext(DatepickerContext)

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    )
  }

  const handleTodayClick = () => {
    setCurrentDate(new Date())
  }

  const daysToRender = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate))
    const end = endOfWeek(endOfMonth(currentDate))
    const days = eachDayOfInterval({ start, end })

    while (days.length < 42) {
      const nextDay = addDays(days[days.length - 1], 1)
      days.push(nextDay)
    }

    return days
  }, [currentDate])

  return (
    <>
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
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
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
          const isCurrentMonth = isSameMonth(date, currentDate)
          const dayClass = `day ${isSelected ? 'selected' : ''} ${
            isCurrentDay ? 'today' : ''
          } ${isCurrentMonth ? '' : 'overflow'}`

          return (
            <div
              key={index}
              className={dayClass}
              onClick={() => isCurrentMonth && onDateSelect(date)}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
      <button type="button" className="month-change" onClick={handleTodayClick}>
        Today
      </button>
    </>
  )
})

export { Calendar }
