import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const animations = {
  fadeInUp: (element: string, delay = 0) => {
    gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    })
  },

  staggerCards: (elements: string) => {
    gsap.from(elements, {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements,
        start: "top 80%",
      },
    })
  },

  parallaxEffect: (element: string) => {
    gsap.to(element, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  },

  rotateOnScroll: (element: string) => {
    gsap.to(element, {
      rotation: 360,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  },

  textReveal: (element: string) => {
    gsap.from(element, {
      opacity: 0,
      y: "100%",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    })
  },
}
