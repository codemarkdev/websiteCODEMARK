"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "./useMediaQuery"

// Definición de breakpoints estándar
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type Breakpoint = keyof typeof breakpoints

/**
 * Hook personalizado para detectar el breakpoint actual
 * @returns El breakpoint actual (xs, sm, md, lg, xl, 2xl)
 */
export function useBreakpoint(): Breakpoint {
  // Estado inicial (asumimos xs para SSR)
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xs")

  useEffect(() => {
    // Función para actualizar el breakpoint basado en el ancho de la ventana
    const updateBreakpoint = () => {
      const width = window.innerWidth

      if (width >= breakpoints["2xl"]) {
        setBreakpoint("2xl")
      } else if (width >= breakpoints.xl) {
        setBreakpoint("xl")
      } else if (width >= breakpoints.lg) {
        setBreakpoint("lg")
      } else if (width >= breakpoints.md) {
        setBreakpoint("md")
      } else if (width >= breakpoints.sm) {
        setBreakpoint("sm")
      } else {
        setBreakpoint("xs")
      }
    }

    // Actualizar el breakpoint inicialmente
    updateBreakpoint()

    // Añadir listener para actualizar el breakpoint cuando cambie el tamaño de la ventana
    window.addEventListener("resize", updateBreakpoint)

    // Limpiar el listener cuando se desmonte el componente
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])

  return breakpoint
}

/**
 * Hook para comprobar si el breakpoint actual es mayor o igual que el breakpoint especificado
 * @param breakpoint El breakpoint a comprobar
 * @returns boolean - true si el breakpoint actual es mayor o igual que el especificado
 */
export function useBreakpointValue<T>(values: Record<Breakpoint, T>): T {
  const currentBreakpoint = useBreakpoint()
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]

  // Encontrar el índice del breakpoint actual
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)

  // Buscar el valor más cercano disponible para el breakpoint actual
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i]
    if (values[bp] !== undefined) {
      return values[bp]
    }
  }

  // Fallback al valor de xs
  return values.xs
}

/**
 * Hook para comprobar si el breakpoint actual es mayor o igual que el breakpoint especificado
 * @param breakpoint El breakpoint a comprobar
 * @returns boolean - true si el breakpoint actual es mayor o igual que el especificado
 */
export function useIsBreakpoint(breakpoint: Breakpoint): boolean {
  const currentBreakpoint = useBreakpoint()
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]

  return breakpointOrder.indexOf(currentBreakpoint) >= breakpointOrder.indexOf(breakpoint)
}

/**
 * Hooks predefinidos para breakpoints comunes
 */
export function useIsMobile() {
  const isBreakpoint = useIsBreakpoint("md")
  return !isBreakpoint
}

export function useIsTablet() {
  const isBreakpointMd = useIsBreakpoint("md")
  const isBreakpointLg = useIsBreakpoint("lg")
  return isBreakpointMd && !isBreakpointLg
}

export function useIsDesktop() {
  const isBreakpoint = useIsBreakpoint("lg")
  return isBreakpoint
}

export function useIsLargeDesktop() {
  const isBreakpoint = useIsBreakpoint("xl")
  return isBreakpoint
}

export function useIsSmallScreen() {
  return useMediaQuery("(max-width: 931px)")
}
