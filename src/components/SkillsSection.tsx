import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { SkillCategory, SkillItem } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillItem[];
  onAddSkill: () => void;
  onEditSkill: (skill: SkillItem) => void;
  onDeleteSkill: (id: string) => void;
}

const CATEGORIES: Array<'All' | SkillCategory> = ['All', 'Programming', 'Web', 'Productivity'];

export function SkillsSection({
  skills,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
}: SkillsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillCategory>('All');

  const availableCategories = useMemo(() => {
    const hasOther = skills.some((s) => s.category === 'Other');
    return hasOther ? [...CATEGORIES, 'Other' as const] : CATEGORIES;
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [skills, selectedCategory]);

  return (
    <section id="skills" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">02. My Skills</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Technical skills &amp; current foundations
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Foundational languages, web technologies, and productivity tools I am actively
              practicing. Every card is editable as my proficiency grows.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddSkill}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:from-purple-500 hover:to-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0A0A0E] p-1"
        >
          {availableCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  active
                    ? 'bg-violet-600/25 text-white border border-violet-500/40'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0E] p-10 text-center">
            <p className="text-sm text-zinc-400">
              No skills listed in this category yet.
            </p>
            <button
              type="button"
              onClick={onAddSkill}
              className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white hover:border-violet-400/50"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Add a Skill</span>
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0A0A0E] p-6 transition-colors duration-150 hover:border-violet-500/45"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {skill.name}
                      </h3>
                      <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                        <span>{skill.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-violet-300">
                          {skill.level} Level
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onEditSkill(skill)}
                        aria-label={`Edit ${skill.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteSkill(skill.id)}
                        aria-label={`Remove ${skill.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    {skill.focus}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-zinc-400">Proficiency</span>
                  <span className="font-medium text-zinc-200">{skill.level}</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
