// components/clients/ClientsGrid.tsx
"use client"

import React from "react"
import { ClientItem } from "../data/types" // ajusta ruta si la tienes distinta
import { ClientCard } from "./ClientCard"

export function ClientsGrid({ items }: { items: ClientItem[] }) {
  return (
    <div
      className="
        grid
        gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
      "
      role="list"
    >
      {items.map((client, idx) => (
        <ClientCard key={`${client.name}-${idx}`} client={client} />
      ))}
    </div>
  )
}
