/**
 * Removes keys with undefined, empty string, or NaN number values from an object.
 * Returns a new object with only valid parameters.
 * @param search The object to clean.
 * @returns A partial object without empty or invalid values.
 * @example
 * cleanEmptyParams({ a: 1, b: '', c: undefined, d: NaN }) // { a: 1 }
 */
export function cleanEmptyParams<T extends Record<string, unknown>>(
  search: T,
): Partial<T> {
  const newSearch = { ...search }
  for (const key of Object.keys(newSearch)) {
    const value = newSearch[key]
    if (
      value === undefined ||
      value === '' ||
      (typeof value === 'number' && Number.isNaN(value))
    )
      delete newSearch[key]
  }

  return newSearch
}
