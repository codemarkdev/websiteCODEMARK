# CodeMark Website

## Estructura del Proyecto

El proyecto está organizado siguiendo una arquitectura modular y escalable:

\`\`\`
codemark-website/
│
├── app/                      # Directorio principal de Next.js App Router
│   ├── layout.tsx            # Layout principal de la aplicación
│   ├── page.tsx              # Página principal
│   └── theme-provider.tsx    # Proveedor de tema (claro/oscuro)
│
├── components/               # Componentes de la aplicación
│   ├── common/               # Componentes comunes reutilizables
│   │   ├── buttons/          # Botones reutilizables
│   │   ├── cards/            # Tarjetas reutilizables
│   │   ├── containers/       # Contenedores reutilizables
│   │   ├── icons/            # Componentes de iconos
│   │   └── typography/       # Componentes de texto
│   │
│   ├── layout/               # Componentes de layout
│   │   ├── footer/           # Componentes del pie de página
│   │   └── header/           # Componentes del encabezado
│   │
│   ├── sections/             # Secciones principales de la página
│   │   ├── about/            # Sección Quiénes Somos
│   │   ├── benefits/         # Sección Beneficios
│   │   ├── contact/          # Formulario de contacto
│   │   ├── home/             # Sección principal
│   │   ├── team/             # Sección Nuestro Equipo
│   │   ├── services/         # Sección Servicios
│   │   ├── tech-stack/       # Sección Stack Tecnológico
│   │   └── values/           # Sección Valores
│   │
│   └── ui/                   # Componentes de UI específicos
│       ├── animations/       # Componentes de animación
│       ├── backgrounds/      # Fondos personalizados
│       └── loaders/          # Componentes de carga
│
├── hooks/                    # Custom hooks
│   ├── animations/           # Hooks para animaciones
│   ├── forms/                # Hooks para formularios
│   ├── media/                # Hooks para media queries
│   └── theme/                # Hooks para el tema
│
├── lib/                      # Utilidades y funciones
│   ├── animations.ts         # Utilidades de animación
│   ├── constants.ts          # Constantes globales
│   ├── types.ts              # Tipos comunes
│   └── utils.ts              # Funciones de utilidad general
│
├── public/                   # Archivos estáticos
│   ├── fonts/                # Fuentes
│   └── images/               # Imágenes
│
├── styles/                   # Estilos globales y módulos CSS
│   ├── globals.css           # Estilos globales
│   └── variables.css         # Variables CSS
│
├── .env.example              # Ejemplo de variables de entorno
├── next.config.mjs           # Configuración de Next.js
├── package.json              # Dependencias y scripts
├── pnpm-lock.yaml            # Lock file de pnpm
├── README.md                 # Documentación
└── tsconfig.json             # Configuración de TypeScript
\`\`\`

## Guía de Organización de Componentes

### Principios de Organización

1. **Modularidad**: Cada componente debe tener una responsabilidad única y clara.
2. **Cohesión**: Los archivos relacionados se mantienen juntos.
3. **Reutilización**: Los componentes comunes se separan para facilitar su reutilización.
4. **Mantenibilidad**: La estructura facilita encontrar y modificar componentes.

### Estructura de un Componente

Cada componente principal debe estar en su propia carpeta con la siguiente estructura:

\`\`\`
component-name/
├── index.ts           # Exporta el componente (para importaciones limpias)
├── ComponentName.tsx  # Implementación principal del componente
├── ComponentName.module.css  # Estilos específicos del componente
└── components/        # Sub-componentes específicos (si es necesario)
    ├── SubComponent.tsx
    └── ...
\`\`\`

### Ejemplo de Importación

\`\`\`tsx
// Importación de componentes de secciones
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';

// Importación de componentes comunes
import { Button } from '@/components/common/buttons';
import { Card } from '@/components/common/cards';

// Importación de hooks personalizados
import { useMediaQuery } from '@/hooks/media';
\`\`\`

## Convenciones de Nomenclatura

- **Componentes**: PascalCase (ej. `Button.tsx`, `ServiceCard.tsx`)
- **Hooks**: camelCase con prefijo "use" (ej. `useMediaQuery.ts`, `useAnimation.ts`)
- **Utilidades**: camelCase (ej. `formatDate.ts`, `validateEmail.ts`)
- **Carpetas**: kebab-case (ej. `tech-stack`, `service-card`)
- **Archivos CSS**: Mismo nombre que el componente con sufijo `.module.css`

## Buenas Prácticas

1. **Exportaciones Nombradas**: Preferir exportaciones nombradas sobre exportaciones por defecto para facilitar el refactoring.
2. **Barrel Files**: Usar archivos `index.ts` para exportar componentes y simplificar importaciones.
3. **Tipos TypeScript**: Definir interfaces y tipos en archivos separados o junto al componente que los utiliza.
4. **Componentes Pequeños**: Mantener los componentes pequeños y enfocados en una sola responsabilidad.
5. **Datos Estáticos**: Extraer datos estáticos a archivos separados para facilitar su mantenimiento.
