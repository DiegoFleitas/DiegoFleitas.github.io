import type { MouseEvent as ReactMouseEvent } from 'react'
import { cvPdfDownloadFilename, site } from '../data/site'
import { trackEvent } from './analytics'

function trackResumeDownload(): void {
  trackEvent('file_download', {
    file_name: cvPdfDownloadFilename,
    link_url: site.cvPdfUrl,
    file_extension: 'pdf',
  })
}

/**
 * iOS / iPadOS Safari largely ignore `download` and blob-based saves. Following the real
 * `href` opens the PDF in the viewer where users can Share → Save to Files.
 */
export function resumePdfShouldUseAnchorNavigation(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return true
  // iPadOS 13+ often uses a desktop "Macintosh" UA with real touch; avoid deprecated `navigator.platform`.
  return navigator.maxTouchPoints > 1 && /\bMacintosh\b/.test(ua)
}

function canProgrammaticSave(): boolean {
  return (
    typeof fetch === 'function' &&
    typeof URL.createObjectURL === 'function' &&
    typeof document.createElement === 'function'
  )
}

/**
 * `application/octet-stream` nudges more browsers to treat the blob as a file download
 * instead of re-opening an in-browser PDF preview.
 */
function blobAsAttachment(blob: Blob): Blob {
  return new Blob([blob], { type: 'application/octet-stream' })
}

function triggerProgrammaticFileSave(blob: Blob): void {
  const fileBlob = blobAsAttachment(blob)
  const objectUrl = URL.createObjectURL(fileBlob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = cvPdfDownloadFilename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Revoking immediately can cancel the download in some browsers (Safari, Firefox).
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl)
  }, 2500)
}

function isPlainPrimaryClick(event: ReactMouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

/**
 * Click handler for resume links. Handles iOS vs desktop, modifier keys, and fetch fallbacks.
 */
export function onResumePdfLinkClick(event: ReactMouseEvent<HTMLAnchorElement>): void {
  trackResumeDownload()

  // Let the browser handle new tab / new window / non-primary clicks.
  if (!isPlainPrimaryClick(event)) {
    return
  }

  if (resumePdfShouldUseAnchorNavigation() || !canProgrammaticSave()) {
    return
  }

  event.preventDefault()

  void fetch(site.cvPdfUrl)
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status))
      return res.blob()
    })
    .then((blob) => {
      triggerProgrammaticFileSave(blob)
    })
    .catch(() => {
      document.defaultView?.location.assign(site.cvPdfUrl)
    })
}
