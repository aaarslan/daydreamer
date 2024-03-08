import React, { forwardRef, InputHTMLAttributes } from 'react'

export interface CustomProps {
  invalid?: boolean
  ariaLabel?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label?: string
}

export type InputFieldProps = CustomProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'>

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, prefix, suffix, ...inputProps }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <div>
          {prefix && <span>{prefix}</span>}
          <input ref={ref} {...inputProps} />
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
    )
  }
)

export { InputField }
