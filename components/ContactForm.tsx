"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import NetworkBackground from "./NetworkBackground"
import { useTheme } from "@/app/theme-provider"
import { ResponsiveText } from "@/components/ui/responsive-text"
import { ResponsiveContainer } from "@/components/ui/responsive-container"

// Importar los nuevos sub-componentes
import { ContactFormSteps } from "./sections/contact/components/ContactFormSteps"
import { ContactFormStep1 } from "./sections/contact/components/ContactFormStep1"
import { ContactFormStep2 } from "./sections/contact/components/ContactFormStep2"
import { ContactFormStep3 } from "./sections/contact/components/ContactFormStep3"
import { FormNavigation } from "./sections/contact/components/FormNavigation"
import { ContactInfoCard } from "./sections/contact/components/ContactInfoCard"
import { SuccessMessage } from "./sections/contact/components/SuccessMessage"
import type { ContactFormData, FormStep, FormErrors } from "./sections/contact/types"
import { getStepErrors } from "./sections/contact/validation"

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const controls = useAnimation()
  const { theme } = useTheme()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    setFormErrors((prev) => {
      const newErrors = { ...prev }
      if (newErrors[name as keyof ContactFormData]) {
        delete newErrors[name as keyof ContactFormData]
      }
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = getStepErrors(3, formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        console.error("Error del servidor:", result.message)
        setFormErrors({ message: result.message || "Error al enviar el mensaje." })
      }
    } catch (error) {
      console.error("Error de red:", error)
      setFormErrors({ message: "No se pudo enviar el mensaje. Intenta más tarde." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStepHandler = () => {
    const errors = getStepErrors(currentStep, formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors((prev) => {
      const newErrors = { ...prev }
      if (currentStep === 1) {
        delete newErrors.name
        delete newErrors.email
      } else if (currentStep === 2) {
        delete newErrors.company
        delete newErrors.phone
        delete newErrors.service
      }
      return newErrors
    })

    setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as FormStep) : prev))
  }

  const prevStepHandler = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as FormStep) : prev))
  }

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } })
  }, [controls])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground py-24 overflow-hidden" id="contact">
      <NetworkBackground color={theme === "dark" ? "#f43f5e" : "#be123c"} density={40} />

      <ResponsiveContainer maxWidth="2xl" paddingX="lg">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 w-full z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          <motion.div
            className="flex-1 bg-card/95 backdrop-blur-md rounded-3xl border border-border p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <ResponsiveText as="h2" size="4xl" weight="bold" className="mb-6 text-primary">
                Comencemos tu Proyecto Digital
              </ResponsiveText>
              <ContactFormSteps currentStep={currentStep} totalSteps={3} />
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactFormStep1 formData={formData} handleInputChange={handleInputChange} formErrors={formErrors} />
                    </motion.div>
                  )}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactFormStep2 formData={formData} handleInputChange={handleInputChange} formErrors={formErrors} />
                    </motion.div>
                  )}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactFormStep3 formData={formData} handleInputChange={handleInputChange} formErrors={formErrors} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <FormNavigation
                  currentStep={currentStep}
                  prevStep={prevStepHandler}
                  nextStep={nextStepHandler}
                  canProceed={Object.keys(getStepErrors(currentStep, formData)).length === 0}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center px-6 py-12 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-700/10 border border-green-500 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">
                    ✓
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">¡Mensaje enviado correctamente!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                </p>
              </motion.div>
            )}
          </motion.div>

          <div className="flex-1 space-y-6">
            <ContactInfoCard icon={Mail} title="Email" content="info@codemark.com" delay={0.2} />
            <ContactInfoCard icon={Phone} title="Teléfono" content="+503 7572 4067" delay={0.3} />
            <ContactInfoCard icon={MapPin} title="Ubicación" content={["El Salvador, San Miguel"]} delay={0.4} />
          </div>
           <br></br> 
        </motion.div>
      </ResponsiveContainer>
     
    </section>
    
  )
}
