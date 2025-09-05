/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The string with the first letter capitalized.
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts a string or array of strings to a string, or returns null if input is undefined or null.
 * If the input is an array, returns the first element or null if empty.
 * @param input The string, array, or undefined/null.
 * @returns The string or null.
 * @example
 * convertToStringOrNull(['a', 'b']) // 'a'
 * convertToStringOrNull(undefined) // null
 */
export function convertToStringOrNull(
  input: string | Array<string> | undefined | null,
): string | null {
  if (typeof input === 'undefined' || input === null) {
    return null
  }

  if (Array.isArray(input)) {
    return input.length > 0 ? input[0] : null
  }

  return input
}

/**
 * Removes accents and diacritics from a string.
 * @param str The string to process.
 * @returns The string without accents or diacritics.
 * @example
 * removeAccentsAndDiacritics('canción') // 'cancion'
 */
export function removeAccentsAndDiacritics(str: string): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

/**
 * Capitalizes the first letter of each word in a sentence.
 * @param sentence The sentence to process.
 * @returns The sentence with each word capitalized.
 * @example
 * capitalizeFirstLetterOfEachWord('hola mundo') // 'Hola Mundo'
 */
export function capitalizeFirstLetterOfEachWord(sentence: string) {
  return sentence
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Gets the initials from a full name. If only one word, returns the first two letters.
 * @param fullName The full name string.
 * @returns The initials in uppercase.
 * @example
 * getInitialsFromFullName('Juan Perez') // 'JP'
 * getInitialsFromFullName('Ana') // 'AN'
 */
export function getInitialsFromFullName(fullName: string): string {
  const palabras = fullName.split(' ').filter((palabra) => palabra.length > 0)

  let iniciales: Array<string> = []

  if (palabras.length === 1) {
    iniciales = [
      palabras[0][0].toUpperCase(),
      palabras[0][1] ? palabras[0][1].toUpperCase() : '',
    ]
  } else {
    iniciales = palabras.slice(0, 2).map((palabra) => palabra[0].toUpperCase())
  }

  return iniciales.join('')
}
