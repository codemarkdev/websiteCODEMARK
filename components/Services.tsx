"use client"
import { ResponsiveContainer } from "./ui/responsive-container"
import { ResponsiveText } from "./ui/responsive-text"
import { ServiceCard } from "./sections/services/components/ServiceCard"

const services = [
  {
    title: "Desarrollo Web",
    description: "Creamos sitios web a medida que reflejan la esencia de tu marca y cumplen tus objetivos de negocio.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pc-KNBUR4C3FOMOWSBhrlYFFfBLZ8z86j.png",
    details: [
      "Diseño UI/UX centrado en el usuario",
      "Desarrollo frontend y backend",
      "Sitios web responsivos y accesibles",
      "Optimización SEO integrada",
    ],
    color: "from-blue-500 to-cyan-500",
    icon: "💻",
    category: "web",
    featured: true,
  },
  {
    title: "Ciberseguridad Avanzada",
    description: "Protegemos tu negocio digital con las últimas tecnologías y mejores prácticas de seguridad.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ciber-b0l8wgBU8LBHSTyGXbTN2lsGo5YvDC.png",
    details: [
      "Auditorías de seguridad completas",
      "Protección contra vulnerabilidades",
      "Implementación de protocolos seguros",
      "Monitoreo continuo de amenazas",
    ],
    color: "from-purple-500 to-indigo-500",
    icon: "🔒",
    category: "security",
    featured: true,
  },
  {
    title: "Automatización con IA",
    description: "Implementamos soluciones inteligentes que automatizan procesos y optimizan la toma de decisiones en tu negocio.",
    image: "/images/ai-automation.png",
    details: [
      "Chatbots y asistentes virtuales",
      "Automatizaciones para tu negocios",
      "Análisis predictivo de datos",
      "Sistemas de recomendación inteligentes",
    ],
    color: "from-emerald-500 to-green-500",
    icon: "🤖",
    category: "automation",
    featured: false,
  },
  {
    title: "Optimización",
    description: "Mejoramos la velocidad y eficiencia de tus plataformas digitales para una experiencia de usuario óptima.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mante-0kuzNJCUTbAPH91sVYUUgLW0aMxBM0.png",
    details: [
      "Optimización de velocidad de carga",
      "Mejora de rendimiento del servidor",
      "Optimización de bases de datos",
      "Análisis y corrección de cuellos de botella",
    ],
    color: "from-amber-500 to-orange-500",
    icon: "⚡",
    category: "performance",
    featured: false,
  },
  {
    title: "Marketing Digital",
    description: "Implementamos estrategias efectivas que maximizan tu presencia en el mundo digital.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mar-QxMQVCK6F2VSorxswBEbTQFu7RTsqT.png",
    details: [
      "Estrategias SEO/SEM personalizadas",
      "Gestión de redes sociales",
      "Email marketing automatizado",
      "Análisis de métricas y conversiones",
    ],
    color: "from-pink-500 to-rose-500",
    icon: "📈",
    category: "marketing",
    featured: false,
  },
  {
    title: "Consultas Personalizadas",
    description: "Ofrecemos asesoramiento experto y soluciones a medida para los desafíos tecnológicos específicos de tu empresa.",
    image: "/images/consulting.png",
    details: [
      "Consultoría tecnológica estratégica",
      "Evaluación de infraestructura IT",
      "Planificación de transformación digital",
      "Asesoramiento en selección de tecnologías",
    ],
    color: "from-violet-500 to-purple-500",
    icon: "🔍",
    category: "consulting",
    featured: false,
  },
]

export default function Services() {
  return (
    <section
      className="relative min-h-screen py-16 md:py-24 lg:py-32 bg-background text-foreground overflow-hidden"
      id="services"
    >
   <ResponsiveContainer maxWidth="2xl" paddingX="lg">

        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <ResponsiveText as="h2" size="5xl" weight="bold" color="primary" className="mb-4">
            Nuestros Servicios
          </ResponsiveText>
          <ResponsiveText as="p" size="xl" color="muted" className="max-w-3xl mx-auto">
            Soluciones tecnológicas integrales para impulsar tu negocio al siguiente nivel
          </ResponsiveText>
        </div>
        {/* Grid responsivo: 1 columna móvil, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </ResponsiveContainer>
    </section>
  )
}
