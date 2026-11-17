import { RotateCcw } from 'lucide-react';

interface FooterProps {
  hasCustomEdits: boolean;
  onResetPortfolio: () => void;
}

export function Footer({ hasCustomEdits, onResetPortfolio }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#050507] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            Archita Priyadarshini
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            B.Tech Computer Science Engineering Student · Aspiring Software Developer
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400">
          <a href="#home" className="transition-colors hover:text-white">
            Home
          </a>
          <a href="#skills" className="transition-colors hover:text-white">
            Skills
          </a>
          <a href="#projects" className="transition-colors hover:text-white">
            Projects
          </a>
          <a href="#certificates" className="transition-colors hover:text-white">
            Certificates
          </a>
          {hasCustomEdits ? (
            <button
              type="button"
              onClick={onResetPortfolio}
              className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Reset Edits</span>
            </button>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
