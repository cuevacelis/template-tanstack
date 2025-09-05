import { ZodDefault, ZodOptional, ZodString, ZodUnion } from 'zod'
import type { ZodObject, ZodRawShape, ZodType } from 'zod'

/**
 * Returns true if the field is required and must not be empty (min(1)) in the given Zod schema.
 * If the field is optional, it will never be required.
 * Supports ZodObject schemas.
 * Usage:
 *   isFieldRequired(personalInformationSchema, "nombres")
 */
export const isFieldRequired = (
  schema: ZodObject<ZodRawShape>,
  field: string,
): boolean => {
  const fieldSchema = schema.shape[field] as ZodType

  // Si es opcional o tiene valor por defecto, no es requerido
  if (fieldSchema instanceof ZodOptional || fieldSchema instanceof ZodDefault) {
    return false
  }

  // Si es una unión (union), verificar si incluye un literal que indique opcionalidad
  if (fieldSchema instanceof ZodUnion) {
    try {
      const emptyStringResult = fieldSchema.safeParse('')
      const falseResult = fieldSchema.safeParse(false)
      const undefinedResult = fieldSchema.safeParse(undefined)

      if (
        emptyStringResult.success ||
        falseResult.success ||
        undefinedResult.success
      ) {
        return false
      }

      return true
    } catch {
      return true
    }
  }

  // Si es string, verificar si tiene validaciones que lo hagan requerido
  if (fieldSchema instanceof ZodString) {
    try {
      const result = fieldSchema.safeParse('')
      return !result.success
    } catch {
      return true
    }
  }

  return true
}
