/**
 * Datepicker Root Component
 *
 * This component sets up the datepicker context and renders the DatepickerComponent.
 * It can optionally accept a `locale` prop to set the initial locale.
 */
import { Locale } from 'date-fns'
import { DatepickerComponent } from './datepicker'
import './datepicker.css'
import { DatepickerProvider } from './provider'

interface DatepickerProps {
  locale?: Locale
}

function Datepicker({ locale }: DatepickerProps) {
  return (
    <DatepickerProvider initialLocale={locale}>
      <DatepickerComponent />
    </DatepickerProvider>
  )
}

export { Datepicker }
