"use client"

import { useState, useEffect } from "react"

/**
 * Hook personalizado para detectar media queries
 * @param query - La media query a detectar (ej: '(min-width: 768px)')
 * @returns boolean - True si la media query coincide, false en caso contrario
 */
export function useMediaQuery(query: string): boolean {
  // Inicializar con false en el servidor o true si la media query coincide en el cliente
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Verificar si window está definido (solo en el cliente)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Establecer el estado inicial
      setMatches(media.matches)

      // Definir el callback para actualizar el estado
      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      // Añadir el listener
      media.addEventListener("change", listener)

      // Limpiar el listener al desmontar
      return () => {
        media.removeEventListener("change", listener)
      }
    }
  }, [query]) // Re-ejecutar si la query cambia

  return matches
}
