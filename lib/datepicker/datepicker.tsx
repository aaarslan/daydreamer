import { useContext } from 'react'
import { DatepickerContext } from './provider'

const DatepickerComponent = () => {
  const { currentDate, setCurrentDate, daysOfMonth, daysOfWeek } =
    useContext(DatepickerContext)

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    )
    setCurrentDate(newDate)
  }

  const firstDayOfMonthIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()
  const daysFromPreviousMonth =
    firstDayOfMonthIndex === 0 ? 6 : firstDayOfMonthIndex

  const totalSlots =
    Math.ceil((daysOfMonth.length + daysFromPreviousMonth) / 7) * 7

  const daysToRender = Array.from({ length: totalSlots }).map((_, index) => {
    const dayIndex = index - daysFromPreviousMonth
    return dayIndex >= 0 && dayIndex < daysOfMonth.length
      ? daysOfMonth[dayIndex]
      : null
  })

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => handleMonthChange(-1)}>
              {'<'}
            </button>
          </th>
          <th colSpan={5}>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </th>
          <th>
            <button type="button" onClick={() => handleMonthChange(1)}>
              {'>'}
            </button>
          </th>
        </tr>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: totalSlots / 7 }).map((_, weekIndex) => (
          <tr key={weekIndex}>
            {daysToRender
              .slice(weekIndex * 7, (weekIndex + 1) * 7)
              .map((day, dayIndex) => (
                <td key={dayIndex} className={!day ? 'empty-day' : ''}>
                  {day}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DatepickerComponent
