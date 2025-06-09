"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  // const [mounted, setMounted] = useState(false) // No longer needed for this specific hydration fix

  // Al inicio del componente ThemeProvider, antes del return
  useEffect(() => {
    // Este script se ejecuta una sola vez al montar el componente
    // y asegura que el tema dark se aplique inmediatamente
    const script = document.createElement("script")
    script.innerHTML = `
    (function() {
      // Si no hay tema guardado, usar dark por defecto
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else if (localStorage.getItem('theme') === 'light') {
        // Si el tema guardado es light, quitar la clase dark
        document.documentElement.classList.remove('dark');
      }
    })()
  `
    script.async = false
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    // Obtener tema guardado o usar "dark" como predeterminado
    const savedTheme = localStorage.getItem("theme") as Theme
    // Si hay un tema guardado, usarlo; de lo contrario, usar "dark"
    const initialTheme = savedTheme || "dark"
    setTheme(initialTheme)

    // Asegurarse de que la clase "dark" esté presente si el tema es "dark"
    // o se elimine si el tema es "light"
    document.documentElement.classList.toggle("dark", initialTheme === "dark")

    // setMounted(true) // No longer needed
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Prevent hydration mismatch - REMOVED: if (!mounted) { return null; }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
