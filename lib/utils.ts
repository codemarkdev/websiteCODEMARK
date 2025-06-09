import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind de manera eficiente
 * Utiliza clsx para combinar clases y tailwind-merge para resolver conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como moneda
 */
export function formatCurrency(amount: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Genera un ID único
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Retrasa la ejecución de una función (debounce)
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Obtiene el tamaño de la ventana (para hooks)
 */
export function getWindowSize() {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
    }
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
