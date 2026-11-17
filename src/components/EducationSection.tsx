import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, Pencil } from 'lucide-react';
import { EducationInfo } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationInfo;
  onEdit: () => void;
}

export function EducationSection({ education, onEdit }: EducationSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="education" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">04. Education</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Academic background
            </h2>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/12 bg-[#0B0B10] px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Pencil className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
            <span>Edit Education</span>
          </button>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-2xl border border-white/10 bg-[#0A0A0E] p-7 sm:p-9"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-950/30 text-violet-300">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-xs font-medium text-violet-300">
                    {education.currentYear}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                    {education.degree}
                  </h3>
                  <p className="mt-1 text-base font-medium text-zinc-200">
                    {education.branch}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-zinc-400">Institution</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">
                    {education.institution}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Location</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100">
                    {education.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Timeline</p>
                  <p className="mt-1 text-sm font-medium text-zinc-100 tabular-nums">
                    {education.duration}
                  </p>
                </div>
              </div>

              {education.notes ? (
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                  {education.notes}
                </p>
              ) : null}
            </div>

            <div className="border-t border-white/10 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <p className="text-xs font-medium text-zinc-400">
                Key Academic Coursework
              </p>
              <ul className="mt-4 divide-y divide-white/10">
                {education.coursework.map((course, index) => (
                  <li
                    key={`${course}-${index}`}
                    className="flex items-center gap-3 py-2.5 text-sm text-zinc-200"
                  >
                    <span className="font-mono text-xs text-violet-400 tabular-nums">
                      0{index + 1}
                    </span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
