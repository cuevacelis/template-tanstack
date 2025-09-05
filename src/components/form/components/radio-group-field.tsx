import { useFieldContext } from '../hooks/use-form-context'
import { mapErrorMessages } from '../utils/field-utils'
import type { ReactNode } from 'react'
import type { ZodObject } from 'zod'
import { RequiredLabel } from '@/components/form/components/required-label'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ErrorMessage } from '@/components/validate/message/error-message'
import { cn } from '@/lib/utils/class-utils'
import { isFieldRequired } from '@/lib/utils/zod-utils'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupFieldProps {
  label?: ReactNode
  name?: string
  className?: string
  labelProps?: React.ComponentProps<'label'>
  options: Array<RadioOption>
  required?: boolean
  isShowIconError?: boolean
  schema?: ZodObject
}

/**
 * RadioGroupField component for form input with radio options, label, and error message.
 * Shows required indicator based on prop or Zod schema.
 *
 * @example
 * <RadioGroupField
 *   label="Options"
 *   options={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" }
 *   ]}
 *   schema={mySchema}
 * />
 */
export function RadioGroupField({
  label,
  name,
  className,
  labelProps,
  options,
  required,
  isShowIconError = false,
  schema,
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>()
  const nameField = name ?? field.name.split('.').pop() ?? field.name
  const isError = field.state.meta.isTouched && field.state.meta.errors.length
  const errorMessage = isError
    ? mapErrorMessages(field.state.meta.errors)
    : null

  const isRequired =
    required ?? !!(schema && isFieldRequired(schema, nameField))

  return (
    <section className={cn('space-y-2', className)}>
      {label && (
        <RequiredLabel
          htmlFor={nameField}
          className={labelProps?.className}
          hideAsterisk={!isRequired}
          {...labelProps}
        >
          {label}
        </RequiredLabel>
      )}

      <RadioGroup
        value={field.state.value}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
        className={cn('grid gap-2', {
          'border-red-500': isError,
          'focus-within:border-destructive': isError,
        })}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2 rounded-md border p-2 hover:bg-accent"
          >
            <RadioGroupItem
              value={option.value}
              id={`${nameField}-${option.value}`}
            />
            <Label
              htmlFor={`${nameField}-${option.value}`}
              className="flex-1 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <ErrorMessage
        message={errorMessage}
        className="mt-1"
        isShowIcon={isShowIconError}
      />
    </section>
  )
}
