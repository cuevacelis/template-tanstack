/**
 * Converts a number or an array of numbers to a string, or returns null if input is undefined or null.
 * If the input is an array, returns the string of the first element, or null if the array is empty.
 * @example
 * toStringOrNull(5) // '5'
 * toStringOrNull([10, 20]) // '10'
 * toStringOrNull(undefined) // null
 */
export function toStringOrNull(
  input: number | Array<number> | undefined | null,
): string | null {
  if (typeof input === 'undefined' || input === null) {
    return null
  }

  if (Array.isArray(input)) {
    return input.length > 0 ? input[0].toString() : null
  }

  return input.toString()
}

/**
 * Converts a string or an array of strings to a number, or returns null if input is undefined or null.
 * If the input is an array, returns the number of the first element, or null if the array is empty.
 * @example
 * toNumberOrNull('5') // 5
 * toNumberOrNull(['10', '20']) // 10
 * toNumberOrNull(undefined) // null
 */
export function toNumberOrNull(
  input: string | Array<string> | undefined | null,
): number | null {
  if (typeof input === 'undefined' || input === null) {
    return null
  }

  if (Array.isArray(input)) {
    return input.length > 0 ? Number(input[0]) : null
  }

  return Number(input)
}

/**
 * Formats a number as a string with a specified number of decimals, clamped between min and max if provided.
 * If the input is not a valid number, returns an empty string.
 * @param params Object with value, min, max, and decimals (default 2)
 * @returns The formatted value as string
 * @example
 * formatNumber({ value: 15.678, min: 0, max: 20 }) // '15.68'
 * formatNumber({ value: 25, min: 0, max: 20 }) // '20.00'
 * formatNumber({ value: 3.14159, decimals: 3 }) // '3.142'
 */
export function formatNumber({
  value,
  min,
  max,
  decimals = 2,
}: {
  value: number
  min?: number
  max?: number
  decimals?: number
}): string {
  if (!Number.isFinite(value)) {
    return ''
  }
  let clamped = value
  if (typeof min === 'number') clamped = Math.max(clamped, min)
  if (typeof max === 'number') clamped = Math.min(clamped, max)
  return clamped.toFixed(decimals)
}

/**
 * Determines if the provided value is a valid finite number or a string representing a finite number.
 * Accepts any type and returns true only for finite numbers (not NaN, Infinity, or non-number types).
 * If a string is provided, it checks if it can be converted to a finite number.
 *
 * @param params - Object with the value to check.
 * @returns True if the value is a finite number or a string representing a finite number, false otherwise.
 *
 * @example
 * isValidNumber({ value: 5 }) // true
 * isValidNumber({ value: 0 }) // true
 * isValidNumber({ value: -3.14 }) // true
 * isValidNumber({ value: "5" }) // true
 * isValidNumber({ value: "3.14" }) // true
 * isValidNumber({ value: NaN }) // false
 * isValidNumber({ value: Infinity }) // false
 * isValidNumber({ value: "abc" }) // false
 * isValidNumber({ value: null }) // false
 * isValidNumber({ value: undefined }) // false
 */
export function isValidNumber({ value }: { value: unknown }): boolean {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const num = Number(value)
    return Number.isFinite(num)
  }
  return false
}
