import { enUS } from 'date-fns/locale'
import DatepickerComponent from './datepicker'
import { DatepickerProvider } from './provider'

function Datepicker() {
  return (
    <DatepickerProvider locale={enUS}>
      <DatepickerComponent />
    </DatepickerProvider>
  )
}

export default Datepicker
