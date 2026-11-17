import { useEffect, useState } from 'react';
import { DEFAULT_PORTFOLIO_DATA } from './data/defaultPortfolio';
import {
  CertificateItem,
  PortfolioData,
  ProjectItem,
  SkillItem,
} from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  AboutEditorModal,
  CertificateEditorModal,
  ContactEditorModal,
  EducationEditorModal,
  ProjectEditorModal,
  ProjectPreviewModal,
  SkillEditorModal,
} from './components/EditModals';

const STORAGE_KEY = 'archita-portfolio-data-v1';

type ActiveModal =
  | { type: 'none' }
  | { type: 'about' }
  | { type: 'skill'; item: SkillItem | null }
  | { type: 'project-edit'; item: ProjectItem | null }
  | { type: 'project-preview'; item: ProjectItem }
  | { type: 'education' }
  | { type: 'certificate'; item: CertificateItem | null }
  | { type: 'contact' };

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<PortfolioData>;
        return {
          about: parsed.about ?? DEFAULT_PORTFOLIO_DATA.about,
          skills: Array.isArray(parsed.skills) ? parsed.skills : DEFAULT_PORTFOLIO_DATA.skills,
          projects: Array.isArray(parsed.projects)
            ? parsed.projects
            : DEFAULT_PORTFOLIO_DATA.projects,
          education: parsed.education ?? DEFAULT_PORTFOLIO_DATA.education,
          certificates: Array.isArray(parsed.certificates)
            ? parsed.certificates
            : DEFAULT_PORTFOLIO_DATA.certificates,
          contact: parsed.contact ?? DEFAULT_PORTFOLIO_DATA.contact,
        };
      }
    } catch {
      // Fallback safely to defaults if localStorage is unavailable or malformed
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const [activeModal, setActiveModal] = useState<ActiveModal>({ type: 'none' });

  useEffect(() => {
    if (!hasCustomEdits) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors
    }
  }, [data, hasCustomEdits]);

  const updateData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setHasCustomEdits(true);
    setData(updater);
  };

  const handleResetPortfolio = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setHasCustomEdits(false);
    setData(DEFAULT_PORTFOLIO_DATA);
  };

  const handleSaveSkill = (skill: SkillItem) => {
    updateData((prev) => {
      const exists = prev.skills.some((s) => s.id === skill.id);
      return {
        ...prev,
        skills: exists
          ? prev.skills.map((s) => (s.id === skill.id ? skill : s))
          : [...prev.skills, skill],
      };
    });
    setActiveModal({ type: 'none' });
  };

  const handleDeleteSkill = (id: string) => {
    updateData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const handleSaveProject = (project: ProjectItem) => {
    updateData((prev) => {
      const exists = prev.projects.some((p) => p.id === project.id);
      return {
        ...prev,
        projects: exists
          ? prev.projects.map((p) => (p.id === project.id ? project : p))
          : [...prev.projects, project],
      };
    });
    setActiveModal({ type: 'none' });
  };

  const handleDeleteProject = (id: string) => {
    updateData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleSaveCertificate = (certificate: CertificateItem) => {
    updateData((prev) => {
      const exists = prev.certificates.some((c) => c.id === certificate.id);
      return {
        ...prev,
        certificates: exists
          ? prev.certificates.map((c) => (c.id === certificate.id ? certificate : c))
          : [...prev.certificates, certificate],
      };
    });
    setActiveModal({ type: 'none' });
  };

  const handleDeleteCertificate = (id: string) => {
    updateData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#F4F4F6]">
      <Navbar />

      <main>
        <HeroSection />

        <AboutSection
          about={data.about}
          onEdit={() => setActiveModal({ type: 'about' })}
        />

        <SkillsSection
          skills={data.skills}
          onAddSkill={() => setActiveModal({ type: 'skill', item: null })}
          onEditSkill={(item) => setActiveModal({ type: 'skill', item })}
          onDeleteSkill={handleDeleteSkill}
        />

        <ProjectsSection
          projects={data.projects}
          onAddProject={() => setActiveModal({ type: 'project-edit', item: null })}
          onEditProject={(item) => setActiveModal({ type: 'project-edit', item })}
          onViewProject={(item) => setActiveModal({ type: 'project-preview', item })}
          onDeleteProject={handleDeleteProject}
        />

        <EducationSection
          education={data.education}
          onEdit={() => setActiveModal({ type: 'education' })}
        />

        <CertificatesSection
          certificates={data.certificates}
          onAddCertificate={() => setActiveModal({ type: 'certificate', item: null })}
          onEditCertificate={(item) => setActiveModal({ type: 'certificate', item })}
          onDeleteCertificate={handleDeleteCertificate}
        />

        <ContactSection
          contact={data.contact}
          onEditContact={() => setActiveModal({ type: 'contact' })}
        />
      </main>

      <Footer
        hasCustomEdits={hasCustomEdits}
        onResetPortfolio={handleResetPortfolio}
      />

      {/* Interactive Modals */}
      {activeModal.type === 'about' ? (
        <AboutEditorModal
          initial={data.about}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={(about) => {
            updateData((prev) => ({ ...prev, about }));
            setActiveModal({ type: 'none' });
          }}
        />
      ) : null}

      {activeModal.type === 'skill' ? (
        <SkillEditorModal
          initial={activeModal.item}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={handleSaveSkill}
        />
      ) : null}

      {activeModal.type === 'project-edit' ? (
        <ProjectEditorModal
          initial={activeModal.item}
          nextSlotNumber={data.projects.length + 1}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={handleSaveProject}
        />
      ) : null}

      {activeModal.type === 'project-preview' ? (
        <ProjectPreviewModal
          project={activeModal.item}
          onClose={() => setActiveModal({ type: 'none' })}
          onEdit={() =>
            setActiveModal({ type: 'project-edit', item: activeModal.item })
          }
        />
      ) : null}

      {activeModal.type === 'education' ? (
        <EducationEditorModal
          initial={data.education}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={(education) => {
            updateData((prev) => ({ ...prev, education }));
            setActiveModal({ type: 'none' });
          }}
        />
      ) : null}

      {activeModal.type === 'certificate' ? (
        <CertificateEditorModal
          initial={activeModal.item}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={handleSaveCertificate}
        />
      ) : null}

      {activeModal.type === 'contact' ? (
        <ContactEditorModal
          initial={data.contact}
          onClose={() => setActiveModal({ type: 'none' })}
          onSave={(contact) => {
            updateData((prev) => ({ ...prev, contact }));
            setActiveModal({ type: 'none' });
          }}
        />
      ) : null}
    </div>
  );
}
