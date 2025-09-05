import { useTheme as useNextTheme } from 'next-themes'

export const useTheme = () => {
  const nextTheme = useNextTheme()

  return nextTheme
}
