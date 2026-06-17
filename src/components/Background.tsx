import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

type Palette = { line: number; wire: number; point: number }

// Monochrome, theme-aware. Wireframe + points are tinted from the neutral
// palette so the layer reads as quiet geometry, not a glowing accent.
const PALETTES: Record<'light' | 'dark', Palette> = {
  dark: { line: 0xfafafa, wire: 0.12, point: 0.22 },
  light: { line: 0x171717, wire: 0.1, point: 0.18 },
}

// Topographic contour paths (inline so they inherit the theme via --contour-line).
const CONTOURS: ReadonlyArray<{ d: string; w: number; dash?: string }> = [
  { d: 'M50 100c30-20 70 10 100 0s80-50 120-20 90 40 130 10', w: 1 },
  { d: 'M30 150c40-10 80 30 120 10s90-60 140-30 100 50 150 20', w: 0.5, dash: '4 2' },
  { d: 'M10 200c50 0 100 40 150 20s100-70 160-40 110 60 170 30', w: 1.5 },
  { d: 'M0 250c60 10 120 50 180 30s110-80 180-50 120 70 190 40', w: 0.5, dash: '1 3' },
  { d: 'M-20 300c70 20 140 60 210 40s120-90 200-60 130 80 210 50', w: 1 },
  { d: 'M-40 350c80 30 160 70 240 50s130-100 220-70 140 90 230 60', w: 0.5, dash: '4 2' },
  { d: 'M-60 400c90 40 180 80 270 60s140-110 240-80 150 100 250 70', w: 1.5 },
  { d: 'M-80 450c100 50 200 90 300 70s150-120 260-90 160 110 270 80', w: 0.5, dash: '1 3' },
  { d: 'M-100 500c110 60 220 100 330 80s160-130 280-100 170 120 290 90', w: 1 },
]

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null)
  const wireMatRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const pointMatRef = useRef<THREE.PointsMaterial | null>(null)
  const renderRef = useRef<(() => void) | null>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  const reduced = useReducedMotion() ?? false

  // Set up the WebGL scene. Rebuilds only when the reduced-motion preference
  // changes; theme recoloring is handled by the effect below without a rebuild.
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // WebGL unavailable — the contour layer still renders.
    }

    const getSize = () => ({
      w: mount.clientWidth || window.innerWidth,
      h: mount.clientHeight || window.innerHeight,
    })
    let { w, h } = getSize()

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 5

    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const palette = PALETTES[themeRef.current]

    const wireMat = new THREE.MeshBasicMaterial({
      color: palette.line,
      wireframe: true,
      transparent: true,
      opacity: palette.wire,
    })
    wireMatRef.current = wireMat
    const wireframe = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 2), wireMat)
    scene.add(wireframe)

    const pointsCount = 120
    const coords = new Float32Array(pointsCount * 3)
    for (let i = 0; i < coords.length; i++) coords[i] = (Math.random() - 0.5) * 12
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(coords, 3))
    const pointMat = new THREE.PointsMaterial({
      color: palette.line,
      size: 0.05,
      transparent: true,
      opacity: palette.point,
    })
    pointMatRef.current = pointMat
    const points = new THREE.Points(pointsGeo, pointMat)
    scene.add(points)

    const render = () => renderer.render(scene, camera)
    renderRef.current = render

    let raf = 0
    const animate = (time: number) => {
      const t = time * 0.001
      wireframe.rotation.y = t * 0.08
      wireframe.rotation.x = t * 0.04
      points.rotation.y = -t * 0.02
      wireframe.position.y = Math.sin(t * 0.5) * 0.15
      wireframe.position.x = Math.cos(t * 0.3) * 0.1
      render()
      raf = requestAnimationFrame(animate)
    }

    if (reduced) render()
    else raf = requestAnimationFrame(animate)

    const onResize = () => {
      ;({ w, h } = getSize())
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduced) render()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      wireframe.geometry.dispose()
      wireMat.dispose()
      pointsGeo.dispose()
      pointMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      wireMatRef.current = null
      pointMatRef.current = null
      renderRef.current = null
    }
  }, [reduced])

  // Recolor materials on theme change without tearing down the renderer.
  useEffect(() => {
    themeRef.current = theme
    const palette = PALETTES[theme]
    const color = new THREE.Color(palette.line)
    if (wireMatRef.current) {
      wireMatRef.current.color = color
      wireMatRef.current.opacity = palette.wire
    }
    if (pointMatRef.current) {
      pointMatRef.current.color = color.clone()
      pointMatRef.current.opacity = palette.point
    }
    // Repaint the static frame for reduced-motion users (no loop running).
    renderRef.current?.()
  }, [theme])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
      }}
      aria-hidden
    >
      {/* Topographic contour base layer – theme-tinted, no gradient */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 'var(--contour-opacity)' }}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="var(--contour-line)"
      >
        {CONTOURS.map((c) => (
          <path key={c.d} d={c.d} strokeWidth={c.w} strokeDasharray={c.dash} />
        ))}
      </svg>
      {/* Drifting wireframe + lattice points (Three.js) */}
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  )
}
