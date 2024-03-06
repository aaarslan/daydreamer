import { Locale } from 'date-fns'
import React, {
  forwardRef,
  ComponentPropsWithRef,
  useRef,
  useContext,
} from 'react'
import useDate from '../../hooks/useDate'
import { DatepickerContext } from '../../provider'

export interface InputFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'prefix' | 'onChange'> {
  type: 'text'
  invalid?: boolean
  ariaLabel?: string
  onRenderPrefix?: () => React.ReactNode
  onRenderSuffix?: () => React.ReactNode
  prefix?: React.ReactNode | null
  suffix?: React.ReactNode
  label?: string
  locale?: Locale
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { label, prefix, onRenderPrefix, suffix, onRenderSuffix, ...rest } =
      props
    const { setSelectedDate, setOpen, setInputValue, inputValue } =
      useContext(DatepickerContext)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { parseDateFromString } = useDate(null)

    const handleInputBlur = (_event: React.FocusEvent<HTMLInputElement>) => {
      setTimeout(() => {
        if (!dialogRef.current?.contains(document.activeElement)) {
          setOpen(false)
        }
      }, 0)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value
      const dateParts = rawValue.match(/(\d{2})\/(\d{2})\/(\d{4})/)
      if (dateParts) {
        const [, day, month, year] = dateParts.map(Number)
        const parsedDate = new Date(year, month - 1, day)
        if (!Number.isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate)

          const formattedDate = `${day}/${month}/${year}`
          setInputValue(formattedDate)
          setSelectedDate(parseDateFromString(formattedDate))
        } else {
          // Handle invalid date, e.g., show an error or clear the input
          console.log('Invalid date')
        }
      }
    }

    return (
      <div>
        {label && <label>{label}</label>}
        <div>
          {prefix && <span>{prefix}</span>}
          {onRenderPrefix?.()}
          <input
            ref={ref}
            onChange={handleChange}
            onBlur={handleInputBlur}
            placeholder={'mm/dd/yyyy'}
            value={inputValue}
            {...rest}
          />
          {suffix && <span>{suffix}</span>}
          {onRenderSuffix?.()}
        </div>
      </div>
    )
  }
)

export { InputField }
