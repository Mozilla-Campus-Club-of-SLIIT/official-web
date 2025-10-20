import * as React from "react"

export type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange"
> & {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  touched?: boolean
  containerClassName?: string
}

export function InputField({
  label,
  name,
  value,
  onChange,
  error,
  touched,
  containerClassName,
  className,
  onBlur,
  required,
  ...rest
}: InputFieldProps) {
  const baseInput =
    "w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA7B2C] transition-colors"
  const errorInput = "border-red-500"
  const hasError = !!error && !!touched
  const errorId = hasError ? `${name}-error` : undefined

  return (
    <div className={containerClassName}>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${baseInput} ${hasError ? errorInput : ""} ${className ?? ""}`}
        aria-invalid={hasError}
        aria-describedby={errorId}
        required={required}
        {...rest}
      />
      {hasError && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
