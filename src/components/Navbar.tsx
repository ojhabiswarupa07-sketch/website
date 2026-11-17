import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#050507]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-[#050507]/70 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
        >
          Archita Priyadarshini
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-purple-400 to-violet-400 transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:from-purple-500 hover:to-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#08080C] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#certificates"
              onClick={handleLinkClick}
              className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Certificates
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
