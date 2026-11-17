import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight, Pencil, X } from 'lucide-react';
import {
  AboutInfo,
  CertificateItem,
  ContactInfo,
  EducationInfo,
  ProjectItem,
  ProjectStatus,
  SkillCategory,
  SkillItem,
  SkillLevel,
} from '../types/portfolio';

interface ModalShellProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

function ModalShell({ title, subtitle, onClose, children }: ModalShellProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0C0C11] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 id="modal-title" className="font-display text-xl font-semibold text-white">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

const inputClass =
  'mt-1.5 w-full rounded-lg border border-white/12 bg-[#050507] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none';

/* 1. About Editor Modal */
export function AboutEditorModal({
  initial,
  onSave,
  onClose,
}: {
  initial: AboutInfo;
  onSave: (updated: AboutInfo) => void;
  onClose: () => void;
}) {
  const [headline, setHeadline] = useState(initial.headline);
  const [summary, setSummary] = useState(initial.summary);
  const [secondaryNote, setSecondaryNote] = useState(initial.secondaryNote);
  const [interestsText, setInterestsText] = useState(initial.interests.join(', '));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      headline: headline.trim() || initial.headline,
      summary: summary.trim() || initial.summary,
      secondaryNote: secondaryNote.trim(),
      interests: interestsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <ModalShell
      title="Edit About Me"
      subtitle="Personalize your introduction and areas of interest."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Introduction</label>
          <textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Learning Focus</label>
          <textarea
            rows={3}
            value={secondaryNote}
            onChange={(e) => setSecondaryNote(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            value={interestsText}
            onChange={(e) => setInterestsText(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 2. Skill Editor Modal */
export function SkillEditorModal({
  initial,
  onSave,
  onClose,
}: {
  initial: SkillItem | null;
  onSave: (skill: SkillItem) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState<SkillCategory>(initial?.category ?? 'Programming');
  const [level, setLevel] = useState<SkillLevel>(initial?.level ?? 'Beginner');
  const [focus, setFocus] = useState(initial?.focus ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: initial?.id ?? `skill-${Date.now()}`,
      name: name.trim(),
      category,
      level,
      focus: focus.trim() || 'Core fundamentals and ongoing practice.',
    });
  };

  return (
    <ModalShell
      title={initial ? `Edit ${initial.name}` : 'Add New Skill'}
      subtitle="Update skill details and proficiency level."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300">Skill Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., C, Java, Python, Git"
            className={inputClass}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SkillCategory)}
              className={inputClass}
            >
              <option value="Programming">Programming</option>
              <option value="Web">Web</option>
              <option value="Productivity">Productivity</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as SkillLevel)}
              className={inputClass}
            >
              <option value="Beginner">Beginner</option>
              <option value="Basic">Basic</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Focus &amp; Notes</label>
          <textarea
            rows={3}
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            placeholder="Describe what concepts or tools you have practiced."
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Skill
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 3. Project Editor Modal */
export function ProjectEditorModal({
  initial,
  nextSlotNumber,
  onSave,
  onClose,
}: {
  initial: ProjectItem | null;
  nextSlotNumber: number;
  onSave: (project: ProjectItem) => void;
  onClose: () => void;
}) {
  const [slotLabel, setSlotLabel] = useState(
    initial?.slotLabel ?? `Slot 0${nextSlotNumber}`
  );
  const [title, setTitle] = useState(initial?.title ?? '');
  const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? 'Placeholder');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [technologiesText, setTechnologiesText] = useState(
    initial?.technologies.join(', ') ?? 'HTML, CSS'
  );
  const [highlights, setHighlights] = useState(initial?.highlights ?? '');
  const [repoUrl, setRepoUrl] = useState(initial?.repoUrl ?? '');
  const [demoUrl, setDemoUrl] = useState(initial?.demoUrl ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: initial?.id ?? `project-${Date.now()}`,
      slotLabel: slotLabel.trim() || `Slot 0${nextSlotNumber}`,
      title: title.trim(),
      status,
      description: description.trim() || 'Project details coming soon.',
      technologies: technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      highlights: highlights.trim(),
      repoUrl: repoUrl.trim(),
      demoUrl: demoUrl.trim(),
    });
  };

  return (
    <ModalShell
      title={initial ? `Edit ${initial.slotLabel}` : 'Add Project Slot'}
      subtitle="Update title, tech stack, status, and optional repository or demo URLs."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">Slot Label</label>
            <input
              type="text"
              value={slotLabel}
              onChange={(e) => setSlotLabel(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className={inputClass}
            >
              <option value="Placeholder">Placeholder</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Personal Expense Tracker"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What problem does this project solve?"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={technologiesText}
            onChange={(e) => setTechnologiesText(e.target.value)}
            placeholder="Python, HTML, CSS"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Key Highlights</label>
          <input
            type="text"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            placeholder="Key features or learning outcomes"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Repository URL (optional)
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Live Demo URL (optional)
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Project
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 4. Project Preview Modal */
export function ProjectPreviewModal({
  project,
  onEdit,
  onClose,
}: {
  project: ProjectItem;
  onEdit: () => void;
  onClose: () => void;
}) {
  return (
    <ModalShell
      title={project.title}
      subtitle={`${project.slotLabel} · ${project.status}`}
      onClose={onClose}
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-medium text-zinc-400">Overview</p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">
            {project.description}
          </p>
        </div>

        {project.highlights ? (
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-medium text-zinc-400">Focus &amp; Outcomes</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
              {project.highlights}
            </p>
          </div>
        ) : null}

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs font-medium text-zinc-400">Technologies</p>
          <p className="mt-1.5 font-mono text-xs text-violet-200">
            {project.technologies.length > 0
              ? project.technologies.join(' · ')
              : 'Not specified yet'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white hover:border-violet-400/50"
              >
                <span>Source Code</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-xs text-zinc-400">No repository URL added yet</span>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-violet-600/25"
          >
            <Pencil className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
            <span>Edit Slot</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

/* 5. Education Editor Modal */
export function EducationEditorModal({
  initial,
  onSave,
  onClose,
}: {
  initial: EducationInfo;
  onSave: (updated: EducationInfo) => void;
  onClose: () => void;
}) {
  const [degree, setDegree] = useState(initial.degree);
  const [branch, setBranch] = useState(initial.branch);
  const [currentYear, setCurrentYear] = useState(initial.currentYear);
  const [institution, setInstitution] = useState(initial.institution);
  const [location, setLocation] = useState(initial.location);
  const [duration, setDuration] = useState(initial.duration);
  const [courseworkText, setCourseworkText] = useState(initial.coursework.join(', '));
  const [notes, setNotes] = useState(initial.notes);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      degree: degree.trim() || initial.degree,
      branch: branch.trim() || initial.branch,
      currentYear: currentYear.trim() || initial.currentYear,
      institution: institution.trim() || initial.institution,
      location: location.trim() || initial.location,
      duration: duration.trim() || initial.duration,
      coursework: courseworkText
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
      notes: notes.trim(),
    });
  };

  return (
    <ModalShell
      title="Edit Education Details"
      subtitle="Add your college name, location, timeline, and coursework."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">Current Year</label>
            <input
              type="text"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Branch / Major</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            College / University Name
          </label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">Timeline</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 2025 – 2029"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            Coursework (comma-separated)
          </label>
          <input
            type="text"
            value={courseworkText}
            onChange={(e) => setCourseworkText(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Notes</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Education
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 6. Certificate Editor Modal */
export function CertificateEditorModal({
  initial,
  onSave,
  onClose,
}: {
  initial: CertificateItem | null;
  onSave: (cert: CertificateItem) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [issuer, setIssuer] = useState(initial?.issuer ?? '');
  const [issueDate, setIssueDate] = useState(initial?.issueDate ?? '');
  const [credentialUrl, setCredentialUrl] = useState(initial?.credentialUrl ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    onSave({
      id: initial?.id ?? `cert-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate: issueDate.trim(),
      credentialUrl: credentialUrl.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <ModalShell
      title={initial ? 'Edit Certificate' : 'Add Certificate'}
      subtitle="Record course completions, workshops, or credentials."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            Certificate Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Python Fundamentals"
            className={inputClass}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300">
              Issuing Organization
            </label>
            <input
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g., NPTEL / Coursera / College"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300">Issue Date</label>
            <input
              type="text"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              placeholder="e.g., Nov 2026"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            Credential URL (optional)
          </label>
          <input
            type="url"
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Notes (optional)</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Brief summary of skills covered"
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Certificate
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/* 7. Contact Editor Modal */
export function ContactEditorModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ContactInfo;
  onSave: (updated: ContactInfo) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState(initial.email);
  const [linkedinUrl, setLinkedinUrl] = useState(initial.linkedinUrl);
  const [linkedinLabel, setLinkedinLabel] = useState(initial.linkedinLabel);
  const [githubUrl, setGithubUrl] = useState(initial.githubUrl);
  const [locationNote, setLocationNote] = useState(initial.locationNote);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      email: email.trim() || initial.email,
      linkedinUrl: linkedinUrl.trim() || initial.linkedinUrl,
      linkedinLabel: linkedinLabel.trim() || linkedinUrl.trim(),
      githubUrl: githubUrl.trim(),
      locationNote: locationNote.trim() || initial.locationNote,
    });
  };

  return (
    <ModalShell
      title="Edit Contact Links"
      subtitle="Update your email, LinkedIn, and GitHub profile URLs."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            LinkedIn Display Label
          </label>
          <input
            type="text"
            value={linkedinLabel}
            onChange={(e) => setLinkedinLabel(e.target.value)}
            placeholder="linkedin.com/in/your-handle"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">
            GitHub URL (optional)
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/your-username"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-300">Availability Note</label>
          <textarea
            rows={2}
            value={locationNote}
            onChange={(e) => setLocationNote(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] rounded-lg border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[40px] rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-purple-500 hover:to-violet-500"
          >
            Save Contact Info
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
