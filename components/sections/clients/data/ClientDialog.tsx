"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClientItem } from "../data/types"

export function ClientDialog({ client, children }: PropsWithChildren<{ client: ClientItem }>) {
  const initialHero = client.cover ?? client.photos?.[0] ?? client.logo ?? "/placeholder.svg"
  const [hero, setHero] = useState(initialHero)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[92vw] sm:w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[clamp(1.1rem,2.4vw,1.6rem)]">{client.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* HERO: foto si hay, si no el logo; con fallback si falla la ruta */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-xl border bg-muted/20">
            <Image
              src={hero}
              alt={`Imagen principal de ${client.name}`}
              fill
              className="object-cover"
              sizes="(max-width:640px) 90vw, (max-width:1024px) 80vw, 900px"
              onError={() => setHero(client.logo || "/placeholder.svg")}
            />
          </div>

          <p className="text-muted-foreground leading-relaxed text-[clamp(0.95rem,1.4vw,1rem)]">
            {client.description ?? "Pronto añadiremos más información sobre este cliente."}
          </p>

          {client.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {client.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
              ))}
            </div>
          ) : null}

          {client.photos?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {client.photos.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-muted/20">
                  <Image src={src} alt={`Foto ${i + 1} de ${client.name}`} fill className="object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          ) : null}

          {client.url ? (
            <div className="pt-2">
              <Link href={client.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="rounded-xl">Abrir proyecto</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
