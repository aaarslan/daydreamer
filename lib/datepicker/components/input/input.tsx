import { Locale } from 'date-fns'
import React, { forwardRef, ComponentPropsWithRef } from 'react'

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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  locale?: Locale
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      prefix,
      onRenderPrefix,
      suffix,
      onRenderSuffix,
      onChange,
      ...rest
    } = props

    return (
      <div>
        {label && <label>{label}</label>}
        <div>
          {prefix && <span>{prefix}</span>}
          {onRenderPrefix?.()}
          <input
            ref={ref}
            onChange={onChange}
            placeholder={'mm/dd/yyyy'}
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
