import { useFieldContext } from '../hooks/use-form-context'
import { mapErrorMessages } from '../utils/field-utils'
import type { ReactNode } from 'react'
import type { ZodObject } from 'zod'
import { RequiredLabel } from '@/components/form/components/required-label'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/validate/message/error-message'
import { cn } from '@/lib/utils/class-utils'
import { isFieldRequired } from '@/lib/utils/zod-utils'

interface TextFieldProps {
  label: ReactNode
  name?: string
  className?: string
  labelProps?: React.ComponentProps<'label'>
  inputProps?: React.ComponentProps<'input'>
  required?: boolean
  isShowIconError?: boolean
  schema?: ZodObject
}

/**
 * TextField component for form input with label, error message, and required asterisk.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <TextField label="Name" name="name" schema={mySchema} />
 */
export function TextField({
  label,
  name,
  className,
  labelProps,
  inputProps,
  required,
  isShowIconError = false,
  schema,
}: TextFieldProps) {
  const field = useFieldContext<string>()
  const nameField = name ?? field.name.split('.').pop() ?? field.name
  const isError = field.state.meta.isTouched && field.state.meta.errors.length
  const errorMessage = isError
    ? mapErrorMessages(field.state.meta.errors)
    : null

  const isRequired =
    required ?? !!(schema && isFieldRequired(schema, nameField))

  return (
    <section className={cn(className)}>
      <div className="space-y-2">
        <RequiredLabel
          htmlFor={nameField}
          className={labelProps?.className}
          hideAsterisk={!isRequired}
          {...labelProps}
        >
          {label}
        </RequiredLabel>
        <Input
          id={nameField}
          name={nameField}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(inputProps?.className, {
            'border-red-500': isError,
            'focus-visible:border-destructive': isError,
          })}
          {...inputProps}
        />
      </div>
      <ErrorMessage
        message={errorMessage}
        className="mt-1"
        isShowIcon={isShowIconError}
      />
    </section>
  )
}
