import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Code2, Mail } from 'lucide-react';

const HERO_IMAGE = '/src/assets/images/hero_obsidian_prism_1794919899442.jpg';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 pt-28 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* Subtle Purple & Violet Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-700/18 via-violet-600/14 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Primary Typography & Actions */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="text-sm font-medium tracking-wide text-violet-300">
              B.Tech Computer Science Engineering Student
            </p>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Archita Priyadarshini
              <span className="mt-2 block bg-gradient-to-r from-purple-300 via-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
                Aspiring Software Developer
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Welcome to my developer portfolio. I am a second-year Computer Science
              Engineering undergraduate building strong fundamentals in programming,
              problem solving, and modern web development with the goal of creating
              reliable, user-focused software.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-150 hover:from-purple-500 hover:to-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
              >
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#0C0C10] px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors duration-150 hover:border-violet-400/50 hover:bg-violet-950/20 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
              >
                <Mail className="h-4 w-4 text-violet-300" aria-hidden="true" />
                <span>Contact Me</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Editorial Architectural Visual */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B10]">
              {!imageError ? (
                <>
                  <img
                    src={HERO_IMAGE}
                    alt="Dark obsidian geometric forms lit with subtle violet rim light"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover lg:h-full"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/85 via-transparent to-purple-950/15"
                  />
                </>
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-gradient-to-br from-[#0E0B18] via-[#09090E] to-[#050507] p-8 text-center">
                  <Code2 className="h-10 w-10 text-violet-400" aria-hidden="true" />
                  <p className="mt-3 font-display text-lg font-medium text-white">
                    Software Engineering Portfolio
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Archita Priyadarshini · B.Tech CSE
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-medium text-violet-300">
                  Portfolio Focus
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  Clean code · Core CS fundamentals · Continuous growth
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Summary Strip below the Hero Split */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#0A0A0E] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          <div className="p-5">
            <p className="text-xs font-medium text-zinc-400">Degree Track</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              B.Tech Computer Science
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-zinc-400">Academic Standing</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white tabular-nums">
              2nd Year Undergraduate
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-zinc-400">Career Goal</p>
            <p className="mt-1.5 font-display text-base font-semibold text-violet-300">
              Software Developer
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-zinc-400">Foundational Stack</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              C · Java · Python · HTML · CSS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
