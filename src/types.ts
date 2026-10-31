export interface PortfolioProfile {
  id: string
  title: string
  name: string
  preferredName: string
  headline: string
  location: {
    city: string
    state: string
    country: string
  }
  email: string
  phone: string
  languages: string[]
  socials: Array<{
    platform: string
    url: string
  }>
  currentRole: string
  currentOrganization: string
  summary: string
  isActive: boolean
  updatedAt: any
  // Optional fields
  profileImageUrl?: string
  yearsOfExperience?: number
  resumeUrl?: string
  bio?: string
}

export interface About {
  id: string
  title: string
  philosophy: string
  beliefs: string[]
  workStyle: string[]
  values: string[]
  isActive: boolean
  updatedAt: any
  // Optional
  journey?: string
  futureGoals?: string
}

export interface Skill {
  name: string
  category: string
  proficiency?: 'expert' | 'advanced' | 'intermediate' | 'beginner'
  logoUrl?: string
  yearsOfExperience?: number
}

export interface Skills {
  id: string
  title: string
  skills: Skill[]
  isActive: boolean
  updatedAt: any
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  responsibilities: string[]
  technologies: string[]
  achievements?: string[]
  metrics?: string[]
  companyLogoUrl?: string
  companyWebsite?: string
  description?: string
}

export interface ExperienceCollection {
  id: string
  title: string
  experiences: Experience[]
  isActive: boolean
  updatedAt: any
}

export interface Education {
  id: string
  degree: string
  university: string
  field: string
  startDate: string
  endDate: string
  cgpa?: string
  achievements?: string[]
  awards?: string[]
  description?: string
}

export interface EducationCollection {
  id: string
  title: string
  education: Education[]
  isActive: boolean
  updatedAt: any
}

export interface ProjectScreenshot {
  url: string
  caption?: string
  alt?: string
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  problem?: string
  solution?: string
  architecture?: string
  challenges?: string[]
  technologies: string[]
  screenshots?: ProjectScreenshot[]
  gallery?: string[]
  githubUrl?: string
  liveUrl?: string
  documentationUrl?: string
  architectureImageUrl?: string
  featured?: boolean
  startDate?: string
  endDate?: string
  status?: 'completed' | 'in-progress' | 'archived'
}

export interface ProjectsCollection {
  id: string
  title: string
  projects: Project[]
  isActive: boolean
  updatedAt: any
}

export interface ResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  publication?: string
  journal?: string
  conference?: string
  publicationDate?: string
  pdfUrl?: string
  doiUrl?: string
  researchUrl?: string
  summary?: string
}

export interface ResearchCollection {
  id: string
  title: string
  papers: ResearchPaper[]
  isActive: boolean
  updatedAt: any
}

export interface Certification {
  id: string
  title: string
  issuer: string
  credentialId?: string
  dateIssued?: string
  expiryDate?: string
  certificateUrl?: string
  certificateImageUrl?: string
  category?: string
  description?: string
}

export interface CertificationsCollection {
  id: string
  title: string
  certifications: Certification[]
  isActive: boolean
  updatedAt: any
}

export interface PortfolioData {
  profile?: PortfolioProfile
  about?: About
  skills?: Skills
  experience?: ExperienceCollection
  education?: EducationCollection
  projects?: ProjectsCollection
  research?: ResearchCollection
  certifications?: CertificationsCollection
}
