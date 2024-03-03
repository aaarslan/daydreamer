import DatepickerComponent from './datepicker'
import { DatepickerProvider } from './provider'

function Datepicker() {
  return (
    <DatepickerProvider>
      <DatepickerComponent />
    </DatepickerProvider>
  )
}

export default Datepicker
