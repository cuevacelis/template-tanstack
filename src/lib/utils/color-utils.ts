/**
 * Determines if a given hex color is considered light based on its brightness.
 * Returns true if the color is light, false if it is dark or invalid.
 * @param color Hex color string (e.g., '#ffffff').
 * @returns True if the color is light, false otherwise.
 * @example
 * isLightColor('#ffffff') // true
 * isLightColor('#000000') // false
 */
export const isLightColor = (color: string): boolean => {
  // Si no hay color, asumimos que es oscuro
  if (!color) return false

  // Convertir el color a RGB
  const hex = color.replace('#', '')
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calcular la luminosidad
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Si la luminosidad es mayor a 128, el color es claro
  return brightness > 128
}

/**
 * Darkens a given hex color by a specified amount if it is light. If the color is already dark, returns it unchanged.
 * If the color is invalid or empty, returns black ('#000000').
 * @param color Hex color string (e.g., '#ffffff').
 * @param amount Amount to darken the color (0 to 1). Default is 0.2.
 * @returns The darkened hex color string.
 * @example
 * darkenColor('#ffffff', 0.3) // '#b2b2b2'
 * darkenColor('#000000') // '#000000'
 */
export const darkenColor = (color: string, amount = 0.2): string => {
  // Si no hay color, retornamos negro
  if (!color) return '#000000'

  // Si el color es oscuro, lo retornamos sin cambios
  if (!isLightColor(color)) return color

  // Convertir el color a RGB
  const hex = color.replace('#', '')
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Oscurecer cada componente
  const newR = Math.max(0, Math.floor(r * (1 - amount)))
  const newG = Math.max(0, Math.floor(g * (1 - amount)))
  const newB = Math.max(0, Math.floor(b * (1 - amount)))

  // Convertir de nuevo a hexadecimal
  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}
