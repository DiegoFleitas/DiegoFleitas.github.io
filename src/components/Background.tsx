import { useState, useCallback, useEffect } from 'react'

export function Background() {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouse(null)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Gradient spots – opacity and colors from theme (data-theme) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 'var(--bg-layer-spots-opacity)',
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, var(--spot-a) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 60%, var(--spot-b) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 50% 90%, var(--spot-c) 0%, transparent 45%),
            var(--bg)
          `,
        }}
      />
      {/* Slow-moving conic gradient – theme-driven opacity */}
      <div
        className="absolute -inset-[50%] animate-gradient-spin"
        style={{
          opacity: 'var(--bg-layer-spin-opacity)',
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              var(--gradient-1) 0deg,
              var(--gradient-2) 120deg,
              var(--gradient-3) 240deg,
              var(--gradient-1) 360deg
            )
          `,
        }}
      />
      {/* Cursor spotlight */}
      {mouse && (
        <div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            left: mouse.x,
            top: mouse.y,
            background:
              'radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  )
}
