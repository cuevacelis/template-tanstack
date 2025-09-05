import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

/**
 * Utility function to merge Tailwind CSS classes conditionally.
 * Combines class names using clsx and resolves Tailwind conflicts with twMerge.
 * @param inputs List of class values to merge.
 * @returns A single string with merged class names.
 * @example
 * cn('p-2', condition && 'bg-red-500', 'text-center')
 */
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}
