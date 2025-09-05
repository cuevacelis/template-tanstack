import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/class-utils'

/**
 * Props para el componente RequiredLabel.
 *
 * children - El contenido del label (por ejemplo, el texto o nodo a mostrar dentro de la etiqueta).
 * className - Clases CSS adicionales para el componente <Label> interno.
 * containerClassName - Clases CSS adicionales para el contenedor externo <span>.
 * hideAsterisk - Si es true, oculta el asterisco de campo requerido.
 * asteriskClassName - Clases CSS adicionales para el asterisco.
 *
 * Además, acepta todas las props estándar de <Label>.
 */
interface RequiredLabelProps extends React.ComponentProps<typeof Label> {
  children: ReactNode
  containerClassName?: string
  hideAsterisk?: boolean
  asteriskClassName?: string
}

/**
 * Componente accesible para etiquetas de formulario que muestra un asterisco opcional indicando que el campo es obligatorio.
 *
 * Renderiza un <Label> con el contenido proporcionado y, si no se oculta, un asterisco rojo y un texto accesible para lectores de pantalla.
 * Permite personalizar tanto el label como el contenedor externo y el asterisco mediante props de clase.
 *
 * @example
 * <RequiredLabel htmlFor="nombre" required>
 *   Nombre
 * </RequiredLabel>
 *
 * @see Label
 *
 * @param props Props del componente.
 * @returns Un <span> con el label y el asterisco si corresponde.
 */
export function RequiredLabel(props: RequiredLabelProps) {
  const {
    children,
    containerClassName,
    hideAsterisk,
    asteriskClassName,
    ...labelProps
  } = props
  return (
    <span
      className={cn('inline-flex items-center gap-0.5', containerClassName)}
    >
      <Label {...labelProps}>{children}</Label>
      {!hideAsterisk && (
        <span
          className={cn(
            'text-destructive text-md leading-none h-[1em] flex items-center',
            asteriskClassName,
            { invisible: hideAsterisk },
          )}
          aria-hidden="true"
        >
          *
        </span>
      )}
      {!hideAsterisk && <span className="sr-only">(required)</span>}
    </span>
  )
}
