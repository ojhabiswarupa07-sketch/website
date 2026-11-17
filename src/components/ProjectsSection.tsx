import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Eye, FolderPlus, Pencil, Trash2 } from 'lucide-react';
import { ProjectItem, ProjectStatus } from '../types/portfolio';

const PROJECT_BACKDROP = '/src/assets/images/project_slot_backdrop_1794919909967.jpg';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: () => void;
  onEditProject: (project: ProjectItem) => void;
  onViewProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
}

const STATUS_FILTERS: Array<'All' | ProjectStatus> = [
  'All',
  'Placeholder',
  'In Progress',
  'Completed',
];

export function ProjectsSection({
  projects,
  onAddProject,
  onEditProject,
  onViewProject,
  onDeleteProject,
}: ProjectsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');
  const [backdropError, setBackdropError] = useState(false);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  return (
    <section id="projects" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">03. My Projects</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Project showcase &amp; upcoming builds
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Dedicated showcase slots ready for upcoming academic and personal software
              projects. Edit any slot to attach live repository and demo links once built.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddProject}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:from-purple-500 hover:to-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <FolderPlus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add Project Slot</span>
          </button>
        </div>

        {/* Status Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter projects by status"
          className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0A0A0E] p-1"
        >
          {STATUS_FILTERS.map((status) => {
            const active = filter === status;
            return (
              <button
                key={status}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(status)}
                className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  active
                    ? 'bg-violet-600/25 text-white border border-violet-500/40'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0A0E] p-10 text-center">
            <p className="text-sm text-zinc-400">
              No projects currently match the &ldquo;{filter}&rdquo; status filter.
            </p>
            <button
              type="button"
              onClick={() => setFilter('All')}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white hover:border-violet-400/50"
            >
              Show All Slots
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E] transition-colors duration-150 hover:border-violet-500/45"
              >
                {/* Visual Preview Header */}
                <div className="relative h-40 w-full overflow-hidden border-b border-white/10 bg-[#07070B]">
                  {!backdropError ? (
                    <img
                      src={PROJECT_BACKDROP}
                      alt=""
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      onError={() => setBackdropError(true)}
                      className="h-full w-full object-cover opacity-50 brightness-50 contrast-125"
                    />
                  ) : null}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/65 to-purple-950/35"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-zinc-300 tabular-nums">
                        {project.slotLabel}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onEditProject(project)}
                          aria-label={`Edit ${project.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#050507]/80 text-zinc-300 transition-colors hover:bg-violet-600/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProject(project.id)}
                          aria-label={`Delete ${project.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#050507]/80 text-zinc-400 transition-colors hover:bg-rose-500/20 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-violet-300">
                      {project.status === 'Placeholder'
                        ? 'Editable Placeholder · Ready for Future Build'
                        : project.status}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white [text-wrap:balance]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {project.description}
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs text-zinc-400">Planned / Used Stack</p>
                      <p className="mt-1.5 font-mono text-xs text-violet-200">
                        {project.technologies.length > 0
                          ? project.technologies.join(' · ')
                          : 'Stack to be defined'}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => onViewProject(project)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-600/25 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                      <Eye className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditProject(project)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/12 px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-400/50 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                      <Pencil className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                      <span>Edit Slot</span>
                    </button>

                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:from-purple-500 hover:to-violet-500 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
