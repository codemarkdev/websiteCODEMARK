"use client"

import { useMediaQuery } from "./useMediaQuery"

/**
 * Hook para detectar si el dispositivo es móvil
 */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)")
}

/**
 * Hook para detectar si el dispositivo es tablet
 */
export function useIsTablet() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
}

/**
 * Hook para detectar si el dispositivo es desktop
 */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)")
}

/**
 * Hook para detectar si el dispositivo es desktop grande
 */
export function useIsLargeDesktop() {
  return useMediaQuery("(min-width: 1280px)")
}
