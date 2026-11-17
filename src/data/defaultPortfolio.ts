import { PortfolioData } from '../types/portfolio';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  about: {
    headline: 'Building strong foundations in computer science and modern software engineering.',
    summary:
      'I am Archita Priyadarshini, a second-year B.Tech Computer Science Engineering student focused on developing a solid grounding in programming, algorithmic thinking, and web technologies. I enjoy breaking down complex problems into clean, maintainable code and continuously expanding my technical toolkit.',
    secondaryNote:
      'Currently strengthening core fundamentals across C, Java, Python, and front-end web development while preparing for hands-on software engineering projects and internship opportunities.',
    interests: [
      'Software Development',
      'Core Programming & Logic',
      'Web Interfaces (HTML & CSS)',
      'Continuous Technical Learning',
    ],
  },
  skills: [
    {
      id: 'skill-c',
      name: 'C',
      category: 'Programming',
      level: 'Beginner',
      focus: 'Core syntax, control flow, functions, arrays, and foundational problem solving.',
    },
    {
      id: 'skill-java',
      name: 'Java',
      category: 'Programming',
      level: 'Beginner',
      focus: 'Object-oriented programming fundamentals, classes, objects, and basic data structures.',
    },
    {
      id: 'skill-python',
      name: 'Python',
      category: 'Programming',
      level: 'Beginner',
      focus: 'Clean scripting, functions, lists, dictionaries, and logical problem practice.',
    },
    {
      id: 'skill-html',
      name: 'HTML',
      category: 'Web',
      level: 'Beginner',
      focus: 'Semantic document structure, accessible markup, forms, and page hierarchy.',
    },
    {
      id: 'skill-css',
      name: 'CSS',
      category: 'Web',
      level: 'Beginner',
      focus: 'Responsive layouts using Flexbox and Grid, typography, and modern dark styling.',
    },
    {
      id: 'skill-msoffice',
      name: 'MS Office',
      category: 'Productivity',
      level: 'Basic',
      focus: 'Technical documentation in Word, structured data in Excel, and clean slides in PowerPoint.',
    },
  ],
  projects: [
    {
      id: 'project-slot-1',
      slotLabel: 'Slot 01',
      title: 'Upcoming Web Development Project',
      description:
        'Editable placeholder reserved for an upcoming responsive web application. Click Edit Slot to add your real project title, summary, repository, and live preview link once built.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      status: 'Placeholder',
      repoUrl: '',
      demoUrl: '',
      highlights: 'Reserved for a clean, responsive frontend build demonstrating layout, accessibility, and interactive UI.',
    },
    {
      id: 'project-slot-2',
      slotLabel: 'Slot 02',
      title: 'Upcoming Python or Java Application',
      description:
        'Editable placeholder reserved for a core programming or utility software project. Customize this card as you build console tools, automation scripts, or object-oriented applications.',
      technologies: ['Python', 'Java'],
      status: 'Placeholder',
      repoUrl: '',
      demoUrl: '',
      highlights: 'Reserved for algorithmic problem solving, file handling, or structured object-oriented design.',
    },
    {
      id: 'project-slot-3',
      slotLabel: 'Slot 03',
      title: 'Upcoming CSE Coursework Project',
      description:
        'Editable placeholder reserved for a Computer Science coursework or mini-project. Update technologies, source code link, and architectural notes whenever your project is ready to showcase.',
      technologies: ['C', 'Data Structures'],
      status: 'Placeholder',
      repoUrl: '',
      demoUrl: '',
      highlights: 'Reserved for core computer science concepts, memory-aware C programming, or foundational data structures.',
    },
  ],
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Computer Science & Engineering',
    currentYear: 'Currently studying in 2nd Year',
    institution: 'College / University Name (Editable)',
    location: 'City, State (Editable)',
    duration: 'Academic Timeline (Editable)',
    coursework: [
      'Programming in C',
      'Object-Oriented Programming (Java)',
      'Python Programming',
      'Web Technologies (HTML & CSS)',
      'Data Structures & Algorithms',
    ],
    notes: 'Click "Edit Education" to add your college name, university affiliation, location, and expected graduation year.',
  },
  certificates: [],
  contact: {
    email: 'your.email@example.com',
    linkedinUrl: 'https://www.linkedin.com/in/your-profile',
    linkedinLabel: 'linkedin.com/in/your-profile',
    githubUrl: '',
    locationNote: 'Open to software engineering internships, collaborative student projects, and technical mentorship.',
  },
};
