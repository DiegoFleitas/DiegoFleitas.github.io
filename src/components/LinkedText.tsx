import type { ReactNode } from 'react'

export type TextLink = { readonly text: string; readonly url: string }

const linkClass =
  'text-muted underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/70'

const isExternal = (url: string) => !url.startsWith('#')

/** Splits `text` so each phrase listed in `links` becomes an anchor (first match wins). */
function segments(text: string, links: readonly TextLink[]): ReactNode[] {
  const parts: ReactNode[] = []
  let rest = text
  let key = 0

  while (rest.length > 0) {
    let next: { at: number; link: TextLink } | null = null
    for (const link of links) {
      const at = rest.indexOf(link.text)
      if (at !== -1 && (next === null || at < next.at)) next = { at, link }
    }
    if (!next) {
      parts.push(rest)
      break
    }
    if (next.at > 0) parts.push(rest.slice(0, next.at))
    const { link } = next
    parts.push(
      <a
        key={key++}
        href={link.url}
        {...(isExternal(link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={linkClass}
      >
        {link.text}
      </a>
    )
    rest = rest.slice(next.at + link.text.length)
  }

  return parts
}

export function LinkedText({
  text,
  links,
  className,
}: Readonly<{ text: string; links?: readonly TextLink[]; className?: string }>) {
  return <p className={className}>{segments(text, links ?? [])}</p>
}
