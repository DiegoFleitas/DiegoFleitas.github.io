const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[#0d0d0d]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0d0d0d]/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="font-semibold text-white">
          DF
        </a>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
