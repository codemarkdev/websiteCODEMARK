"use client"

import React, { useEffect, useState, useMemo } from "react"
import { Cloud, fetchSimpleIcons, renderSimpleIcon, type ICloud, type SimpleIcon } from "react-icon-cloud"
import { useTheme } from "@/app/theme-provider"

interface IconCloudProps {
  iconSlugs: string[]
}

// Propiedades de configuración para la nube de iconos
export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
      cursor: "grab", // Indica que se puede arrastrar
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "grab", // Este cursor es para cuando un icono individual es "activo"
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03, // Ajustado para permitir giros más rápidos al arrastrar
    minSpeed: 0.015, // Ajustado para mantener una rotación pasiva fluida
    dragControl: true, // Asegura que el control de arrastre esté habilitado
  },
}

// Función para renderizar un icono personalizado
export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2f1" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined, // Deshabilitar enlaces para que no naveguen
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(), // Prevenir comportamiento de clic
    },
  })
}

function IconCloudComponent({ iconSlugs }: IconCloudProps) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchSimpleIcons>> | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Indicar que el componente está montado en el cliente
  }, [])

  useEffect(() => {
    // Solo cargar los iconos si el componente está montado
    if (mounted) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
    }
  }, [iconSlugs, mounted]) // Dependencia 'mounted' para asegurar que se ejecuta en el cliente

  const renderedIcons = useMemo(() => {
    if (!data) return null // Si los datos no están cargados, no renderizar nada

    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, theme || "dark"))
  }, [data, theme])

  // Si no está montado o los iconos no se han cargado, no renderizar el Cloud
  if (!mounted || !renderedIcons) {
    return null
  }

  // Ajustar el color de los iconos en base al tema
  const currentCloudProps = {
    ...cloudProps,
    options: {
      ...cloudProps.options,
      color: theme === "dark" ? "#ffffff" : "#333333",
    },
  }

  return (
    <Cloud {...currentCloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}

export default React.memo(IconCloudComponent)
