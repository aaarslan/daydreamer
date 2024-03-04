import DatepickerComponent from './datepicker'
import { DatepickerProvider } from './provider'

function Datepicker() {
  return (
    <DatepickerProvider locale={'en-US'}>
      <DatepickerComponent />
    </DatepickerProvider>
  )
}

export default Datepicker
