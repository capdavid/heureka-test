import React, { forwardRef } from 'react'
import { ChangeHandler } from 'react-hook-form'

interface CheckboxProps {
  label: React.ReactNode
  name: string
  onChange: ChangeHandler
  onBlur: ChangeHandler
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, onChange, onBlur }, ref) => {
    return (
      <>
        <label htmlFor={name} className="my-1">
          <input
            className="mr-2 w-5 h-5 align-middle"
            type="checkbox"
            id={name}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
          />
          {label}
        </label>
      </>
    )
  }
)
