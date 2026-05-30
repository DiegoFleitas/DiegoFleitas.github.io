const standardEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

type RevealAnimation = {
  initial: false | { opacity: number; y: number }
  whileInView?: { opacity: number; y: number }
  viewport?: { once: boolean; amount: number }
  transition?: {
    duration: number
    delay?: number
    ease: [number, number, number, number]
  }
}

export function createFadeUpReveal(shouldReduceMotion: boolean, delay = 0): RevealAnimation {
  if (shouldReduceMotion) {
    return { initial: false }
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.55, delay, ease: standardEase },
  }
}

type PressAnimation = {
  whileHover?: { y: number; scale: number }
  whileTap?: { scale: number }
  transition?: {
    duration: number
    ease: [number, number, number, number]
  }
}

export function createActionAnimation(shouldReduceMotion: boolean): PressAnimation {
  if (shouldReduceMotion) {
    return {}
  }

  return {
    whileHover: { y: -1, scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.2, ease: standardEase },
  }
}
