export type SkillCategory = 'Programming' | 'Web' | 'Productivity' | 'Other';
export type SkillLevel = 'Beginner' | 'Basic' | 'Foundational' | 'Intermediate';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  focus: string;
}

export type ProjectStatus = 'Placeholder' | 'In Progress' | 'Completed';

export interface ProjectItem {
  id: string;
  slotLabel: string;
  title: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  repoUrl: string;
  demoUrl: string;
  highlights: string;
}

export interface EducationInfo {
  degree: string;
  branch: string;
  currentYear: string;
  institution: string;
  location: string;
  duration: string;
  coursework: string[];
  notes: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  notes: string;
}

export interface ContactInfo {
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  locationNote: string;
}

export interface AboutInfo {
  headline: string;
  summary: string;
  secondaryNote: string;
  interests: string[];
}

export interface PortfolioData {
  about: AboutInfo;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationInfo;
  certificates: CertificateItem[];
  contact: ContactInfo;
}
