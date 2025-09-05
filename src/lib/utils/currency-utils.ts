const CURRENCY_CONFIG = {
  PEN: {
    code: 'PEN',
    symbol: 'S/',
    locale: 'es-PE',
    name: 'Soles Peruanos',
  },
  USD: {
    code: 'USD',
    symbol: 'US$',
    locale: 'en-US',
    name: 'Dólares Americanos',
  },
}

export type Currency = keyof typeof CURRENCY_CONFIG

interface FormatCurrencyParams {
  amount: number
  currency?: Currency
  withSymbol?: boolean
  customSymbol?: string
}

/**
 * Formats a number as a currency string according to the specified currency and options.
 * @param params Object with amount, currency, withSymbol, and customSymbol options.
 * @returns The formatted currency string.
 * @example
 * formatCurrencyAmount({ amount: 100 }) // 'S/ 100.00'
 * formatCurrencyAmount({ amount: 100, currency: 'USD', withSymbol: false }) // '100.00'
 */
export function formatCurrencyAmount({
  amount,
  currency = 'PEN',
  withSymbol = true,
  customSymbol,
}: FormatCurrencyParams): string {
  // Asegurarnos de que tenemos una moneda válida
  const config = CURRENCY_CONFIG[currency]

  const value = new Intl.NumberFormat(config.locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  if (!withSymbol) return value

  const symbol = customSymbol ?? config.symbol
  return `${symbol} ${value}`
}

interface ConvertCurrencyParams {
  amount: number
  from: Currency
  to: Currency
  rate: number
}

/**
 * Converts an amount from one currency to another using a given rate.
 * If the source and target currencies are the same, returns the original amount.
 * @param params Object with amount, from, to, and rate.
 * @returns The converted amount as a number.
 * @example
 * convertCurrency({ amount: 100, from: 'PEN', to: 'USD', rate: 0.27 }) // 27
 */
export function convertCurrency({
  amount,
  from,
  to,
  rate,
}: ConvertCurrencyParams): number {
  if (from === to) return amount
  return amount * rate
}

interface FormatAndConvertCurrencyParams {
  amount: number
  from: Currency
  to: Currency
  rate: number
}

/**
 * Converts an amount from one currency to another and formats it as a currency string.
 * @param params Object with amount, from, to, and rate.
 * @returns The formatted and converted currency string.
 * @example
 * formatAndConvertCurrency({ amount: 100, from: 'PEN', to: 'USD', rate: 0.27 }) // 'US$ 27.00'
 */
export function formatAndConvertCurrency(
  params: FormatAndConvertCurrencyParams,
): string {
  const convertedAmount = convertCurrency(params)
  return formatCurrencyAmount({ amount: convertedAmount, currency: params.to })
}
