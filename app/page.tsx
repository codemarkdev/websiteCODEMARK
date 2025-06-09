import About from "@/components/About"
import Benefits from "@/components/Benefits"
import ContactForm from "@/components/ContactForm"
import Home from "@/components/Home"
import Services from "@/components/Services"
import TechStack from "@/components/TechStack"
import OurTeam from "@/components/OurTeam"
import Values from "@/components/Values"
import Clients from "@/components/sections/clients/Clients" // Import the new Clients component
import styles from "./page.module.css"

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <Home />
      <About />
      <Values />
      <Benefits />
      <Services />
      <TechStack />
      <OurTeam />
      <Clients /> {/* Add the Clients component here */}
      <ContactForm />
    </div>
  )
}
