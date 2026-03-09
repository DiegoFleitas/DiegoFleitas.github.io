import { useEffect } from 'react'
import { site } from '../data/site'

const iconSize = 24

function MailLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="contact-modal-title" className="text-xl font-bold text-[var(--text)]">
            Get in touch
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 rounded-lg p-3 text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors"
            aria-label={`Email: ${site.email}`}
          >
            <MailLogo className="shrink-0" />
            <span>{site.email}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
