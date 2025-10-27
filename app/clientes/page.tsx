// app/clientes/page.tsx
import ClientesView from "./ClientesView"

export const metadata = {
  title: "Nuestros Clientes | CodeMark",
  description:
    "Casos reales e impacto medible de proyectos desarrollados por CodeMark.",
}

export default function Page() {
  return <ClientesView />
}
