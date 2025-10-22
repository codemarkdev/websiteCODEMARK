// app/clientes/page.tsx
import type { Metadata } from "next"
import ClientesView from "./ClientesView"

export const metadata: Metadata = {
  title: "Clientes | CodeMark",
  description: "Explora nuestros clientes, casos de éxito y proyectos.",
}

export default function Page() {
  return <ClientesView />
}
