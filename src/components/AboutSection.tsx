import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pencil, Terminal } from 'lucide-react';
import { AboutInfo } from '../types/portfolio';

const ABOUT_IMAGE = '/src/assets/images/about_minimal_workspace_1794919900680.jpg';

interface AboutSectionProps {
  about: AboutInfo;
  onEdit: () => void;
}

export function AboutSection({ about, onEdit }: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">01. About Me</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Passionate about technology and thoughtful engineering
            </h2>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-[#0B0B10] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Pencil className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
            <span>Edit Bio</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Workspace Image */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B10]">
              {!imageError ? (
                <>
                  <img
                    src={ABOUT_IMAGE}
                    alt="Minimalist dark software engineering desk workspace with subtle violet lighting"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover lg:h-full"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/70 via-transparent to-transparent"
                  />
                </>
              ) : (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-[#0F0B1A] to-[#07070A] p-8 text-center">
                  <Terminal className="h-9 w-9 text-violet-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium text-zinc-300">
                    Learning · Coding · Building
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Bio Prose & Focus Areas */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0A0A0E] p-7 sm:p-9 lg:col-span-7"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-white [text-wrap:balance] sm:text-2xl">
                {about.headline}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                {about.summary}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {about.secondaryNote}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-medium text-zinc-400">Core Areas of Interest</p>
              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {about.interests.map((interest, idx) => (
                  <div key={`${interest}-${idx}`} className="flex items-center gap-2.5 text-sm text-zinc-200">
                    <span className="font-mono text-xs text-violet-400 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
