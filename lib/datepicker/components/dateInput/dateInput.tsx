import React, { useState, useEffect, useCallback, useContext } from 'react'
import { DatepickerContext } from '../../provider'

const getMaxDay = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate()
}

const isValidYearlessDate = (dateStr: string): boolean => {
  const parts = dateStr.split('-').filter((part) => part !== '')
  if (parts.length !== 2) return false

  const month = parseInt(parts[0], 10)
  const day = parseInt(parts[1], 10)
  if (Number.isNaN(month) || Number.isNaN(day)) return false

  if (month < 1 || month > 12 || day < 1 || day > getMaxDay(2000, month))
    return false

  return true
}

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const isValidDate = (dateStr: string, separator: RegExp): boolean => {
  const parts = dateStr.split(separator).filter(Boolean)
  if (parts.length !== 3) return false

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const day = parseInt(parts[2], 10)
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
    return false

  if (month < 1 || month > 12 || day < 1 || day > getMaxDay(year, month))
    return false

  return true
}

type Props = {
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
  separator?: '-' | '/' | '.'
  validateYearlessDate?: boolean
}

const DateInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  separator = '/',
  validateYearlessDate = false,
}) => {
  const { inputValue, setInputValue } = useContext(DatepickerContext)

  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setInputValue(formatInput(value))
  }, [value, setInputValue])

  const formatInput = (newValue: string): string => {
    return newValue
      .replace(/[^0-9]/g, separator)
      .replace(new RegExp(`\\${separator}{2,}`, 'g'), separator)
  }

  const validateAndFormatInput = useCallback(
    debounce((newValue: string) => {
      const formattedValue = formatInput(newValue)
      let valid: boolean
      if (validateYearlessDate) {
        valid = isValidYearlessDate(
          formattedValue.replace(new RegExp(`\\${separator}`, 'g'), '-')
        )
      } else {
        valid = isValidDate(formattedValue, new RegExp(`\\${separator}`))
      }
      setInputValue(formattedValue)
      setIsValid(valid)

      if (valid) {
        onChange(formattedValue)
      } else {
        setErrorMessage('Invalid date format.')
      }
    }, 10),
    []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    validateAndFormatInput(newValue)
  }

  return (
    <div>
      <input
        type="text"
        className={`input ${isValid ? 'valid' : 'invalid'}`}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {!isValid && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default DateInput
