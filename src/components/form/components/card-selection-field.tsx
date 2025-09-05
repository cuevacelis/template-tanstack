import type { ReactNode } from 'react'
import type { ZodObject } from 'zod'
import { RequiredLabel } from '@/components/form/components/required-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { ErrorMessage } from '@/components/validate/message/error-message'
import { cn } from '@/lib/utils/class-utils'
import { isFieldRequired } from '@/lib/utils/zod-utils'
import { useFieldContext } from '../hooks/use-form-context'
import { mapErrorMessages } from '../utils/field-utils'

interface CardSelectionOption {
  value: string
  label: ReactNode
  description?: ReactNode
  icon?: ReactNode
  highlighted?: boolean
  className?: string
  cardClassName?: string
  extraContent?: ReactNode
}

interface CardSelectionFieldProps {
  label?: ReactNode
  name?: string
  className?: string
  cardClassName?: string
  labelProps?: React.ComponentProps<'label'>
  options: CardSelectionOption[]
  required?: boolean
  isShowIconError?: boolean
  schema?: ZodObject
}

/**
 * CardSelectionField component for form input with card-style selectable options, label, and error message.
 * Each card can show an icon, label, description, and highlighted state.
 * Shows required indicator based on prop or Zod schema.
 *
 * Features:
 * - Dark mode optimized with proper contrast and color schemes
 * - Smooth transitions and hover effects
 * - Accessible keyboard navigation and focus management
 * - Error state indication with appropriate colors for both themes
 * - Highlighted state for emphasizing specific options
 *
 * @example
 * <CardSelectionField
 *   label="Tipo de inscripción"
 *   options={[
 *     { value: "alumno", label: "Soy alumno de la UPCH", description: "Ya he estudiado...", icon: <UserIcon /> },
 *     { value: "nuevo", label: "Soy nuevo en la UPCH", description: "Es mi primera vez...", icon: <UserPlusIcon />, highlighted: true }
 *   ]}
 *   schema={mySchema}
 * />
 */
export function CardSelectionField({
  label,
  name,
  className,
  cardClassName,
  labelProps,
  options,
  required,
  isShowIconError = false,
  schema,
}: CardSelectionFieldProps) {
  const field = useFieldContext<string>()
  const nameField = name ?? field.name?.split('.').pop() ?? field.name
  const isError = field.state.meta.isTouched && field.state.meta.errors.length
  const errorMessage = isError
    ? mapErrorMessages(field.state.meta.errors)
    : null

  const isRequired =
    required ?? !!(schema && isFieldRequired(schema, nameField))

  // Función para manejar la selección de opción
  const handleSelect = (value: string) => field.handleChange(value)

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
      <div
        className={cn('grid gap-4 md:grid-cols-2', {
          '[&>div]:border-red-500 dark:[&>div]:border-red-400': isError,
        })}
      >
        {options.map((option) => (
          <div key={option.value} className="flex flex-col">
            <CardSelectionOptionButton
              cardClassName={cardClassName}
              option={option}
              selected={field.state.value === option.value}
              isError={!!isError}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>
      <ErrorMessage
        message={errorMessage}
        className="mt-1"
        isShowIcon={isShowIconError}
      />
    </section>
  )
}

/**
 * Botón para una opción de selección tipo tarjeta.
 * Encapsula la lógica de selección, accesibilidad y renderizado.
 */
interface CardSelectionOptionButtonProps {
  option: CardSelectionOption
  selected: boolean
  isError: boolean
  onSelect: (value: string) => void
  cardClassName?: string
}

function CardSelectionOptionButton({
  option,
  selected,
  isError,
  onSelect,
  cardClassName,
}: CardSelectionOptionButtonProps) {
  // Maneja el click y la selección por teclado
  const handleSelect = () => onSelect(option.value)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') handleSelect()
  }

  const hasDescription = !!option.description
  const showExtraContent = selected && !!option.extraContent

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={typeof option.label === 'string' ? option.label : undefined}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg transition-all duration-200 group',
        option.className,
      )}
    >
      <Card
        className={cn(
          'transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 p-0 border-2',
          selected
            ? 'border-primary bg-primary/5 dark:bg-primary/10 text-foreground shadow-lg ring-1 ring-primary/20'
            : 'bg-card border-border text-card-foreground shadow-sm hover:shadow-md hover:border-primary/60 hover:bg-accent/50 dark:hover:bg-accent/30 hover:ring-1 hover:ring-primary/10',
          isError &&
            'border-red-500 dark:border-red-400 hover:border-red-500 dark:hover:border-red-400',
          option.highlighted &&
            !selected &&
            'border-primary/40 bg-accent/30 dark:bg-accent/20 ring-1 ring-primary/10',
          cardClassName,
          option.cardClassName,
        )}
        aria-pressed={selected}
        aria-current={selected}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 py-10 px-6">
          {option.icon && (
            <span
              className={cn(
                'mb-2 text-5xl flex items-center justify-center transition-colors duration-200',
                selected
                  ? 'text-primary'
                  : 'text-primary/80 dark:text-primary/90 group-hover:text-primary',
              )}
            >
              {option.icon}
            </span>
          )}
          <CardTitle className="text-lg font-bold text-center w-full block transition-colors duration-200">
            {option.label}
          </CardTitle>
          {(hasDescription || showExtraContent) && (
            <CardDescription className="text-sm text-muted-foreground text-center mt-1 transition-colors duration-200">
              {hasDescription && option.description}
              {showExtraContent && (
                <div className="w-full mt-2">{option.extraContent}</div>
              )}
            </CardDescription>
          )}
        </CardContent>
      </Card>
    </button>
  )
}
