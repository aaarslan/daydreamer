import React, { useContext } from 'react'
import { DatepickerContext } from '../../provider'
import { getDaysForMonthView, isSameDay, isToday, isWeekend } from '../../util'

const Calendar: React.FC = () => {
  const {
    currentDate,
    setCurrentDate,
    daysOfWeek,
    selectedDate,
    setSelectedDate,
  } = useContext(DatepickerContext)

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    )
  }

  const daysToRender = getDaysForMonthView(currentDate)
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
        {currentDate.toLocaleString('default', { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </div>
      <button
        type="button"
        className="month-change"
        onClick={() => handleMonthChange(1)}
      >
        {'>'}
      </button>
      {daysOfWeek.map((day, index) => (
        <div key={index} className="day-of-week">
          {day}
        </div>
      ))}
      {daysToRender.map((date, index) => {
        const isInCurrentMonth = date.getMonth() === currentDate.getMonth()
        const isSelected = selectedDate && isSameDay(selectedDate, date)
        const isCurrentDay = isToday(date)
        const isWeekendDay = isWeekend(date.getDay())

        const dayClass = `day ${!isInCurrentMonth ? 'overflow-day' : ''} ${
          isSelected ? 'selected' : ''
        } ${isCurrentDay ? 'today' : ''} ${isWeekendDay ? 'weekend' : ''}`

        return (
          <div
            key={index}
            className={dayClass}
            onClick={() =>
              isInCurrentMonth && setSelectedDate && setSelectedDate(date)
            }
          >
            {date.getDate()}
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
