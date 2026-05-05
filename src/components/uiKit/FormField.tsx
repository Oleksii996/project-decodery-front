import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import styles from './FormField.module.css'

type BaseProps = {
  id: string
  label: string
  error?: string
  hint?: ReactNode
}

type InputProps = BaseProps & {
  as?: 'input'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

type SelectProps = BaseProps & {
  as: 'select'
  children: ReactNode
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'children'> & {
    children: ReactNode
  }

export function FormField(props: InputProps | SelectProps) {
  const invalid = Boolean(props.error)
  const rootClass = `${styles.field}${invalid ? ` ${styles.fieldInvalid}` : ''}`

  if (props.as === 'select') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `as` is only a TS discriminant, not a DOM prop
    const { id, label, error, hint, children, as, ...selectProps } = props
    return (
      <div className={rootClass}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <select
          {...selectProps}
          id={id}
          className={styles.control}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
        >
          {children}
        </select>
        {hint && !error ? <p className={styles.hint}>{hint}</p> : null}
        {error ? (
          <p id={`${id}-error`} className={styles.error} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- optional discriminant for `input` branch
  const { id, label, error, hint, as, ...inputProps } = props

  return (
    <div className={rootClass}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        className={styles.control}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
      />
      {hint && !error ? <p className={styles.hint}>{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
