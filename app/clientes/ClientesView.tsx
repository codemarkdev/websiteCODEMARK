// app/clientes/ClientesView.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClientsHeader } from "../../components/sections/clients/data/ClientsHeader"
import { ClientsGrid } from "@/components/sections/clients/data/ClientsGrid"
import { clientLogos } from "@/components/sections/clients/data/data"

export default function ClientesView() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* max-w más generoso para monitores grandes */}
      <section className="mx-auto w-full max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 md:pb-18 lg:pb-24">
        <ClientsHeader
          title="Nuestros Clientes"
          subtitle="Casos reales. Impacto medible. Descubre quiénes confían en nosotros y qué hemos logrado juntos."
        />

        <div className="relative mt-4 md:mt-6 lg:mt-8">
          <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 hidden lg:block rounded-[2.5rem] bg-gradient-to-b from-card/25 to-transparent blur-xl" />
          <ClientsGrid items={clientLogos} />

          <div className="mt-12 md:mt-16 flex justify-center">
            <Link href="/#contacto" className="inline-block" aria-label="Contáctanos para cotizar tu proyecto">
              <Button variant="outline" className="rounded-2xl px-6">
                ¿Hablamos de tu proyecto?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}