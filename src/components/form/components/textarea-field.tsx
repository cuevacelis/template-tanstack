import { useFieldContext } from '../hooks/use-form-context'
import { mapErrorMessages } from '../utils/field-utils'
import type { ReactNode } from 'react'
import type { ZodObject } from 'zod'
import { RequiredLabel } from '@/components/form/components/required-label'
import { ErrorMessage } from '@/components/validate/message/error-message'
import { cn } from '@/lib/utils/class-utils'
import { isFieldRequired } from '@/lib/utils/zod-utils'
import { Textarea } from '@/components/ui/textarea'

interface TextareaFieldProps {
  label: ReactNode
  name?: string
  className?: string
  labelProps?: React.ComponentProps<'label'>
  textareaProps?: React.ComponentProps<'textarea'>
  required?: boolean
  isShowIconError?: boolean
  schema?: ZodObject
}

/**
 * TextareaField component for form input with label, error message, and required asterisk.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <TextareaField label="Description" name="description" schema={mySchema} />
 */
export function TextareaField({
  label,
  name,
  className,
  labelProps,
  textareaProps,
  required,
  isShowIconError = false,
  schema,
}: TextareaFieldProps) {
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
        <Textarea
          id={nameField}
          name={nameField}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={cn(textareaProps?.className, {
            'border-red-500': isError,
            'focus-visible:border-destructive': isError,
          })}
          aria-invalid={isError ? 'true' : undefined}
          aria-describedby={isError ? `${nameField}-error` : undefined}
          {...textareaProps}
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
