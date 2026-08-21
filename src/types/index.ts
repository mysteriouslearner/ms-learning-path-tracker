export type DomainId = 
  | 'cloud' 
  | 'ai-data' 
  | 'security' 
  | 'power-platform' 
  | 'modern-work' 
  | 'devops';

export type CertStatus = 'completed' | 'available' | 'locked';

export type CertLevel = 'Fundamentals' | 'Associate' | 'Expert' | 'Specialty';

export interface Certification {
  id: string;
  code: string;
  name: string;
  domainId: DomainId;
  level: CertLevel;
  tagline: string;
  description: string;
  prerequisites: string[]; // List of Cert IDs that must ALL be completed to unlock
  learnUrl: string;
  examGuideUrl?: string;
  freeModulesCount: number;
  estimatedHours: number;
  skills: string[];
  roleTitle: string;
  defaultAiExplanation: string; // High-quality fallback explanation when AI is offline
  isFreeExamPractice: boolean;
}

export interface DomainInfo {
  id: DomainId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  gradient: string;
  borderColor: string;
  accentColor: string;
  targetRoles: string[];
  certIds: string[]; // Ordered list of certifications in this domain
}

export interface TrackedCertState extends Certification {
  status: CertStatus;
  missingPrerequisites: string[]; // Cert IDs still missing
}

export interface UserProgressData {
  completedCerts: Record<string, boolean>; // certId -> boolean
  domainNotes?: Record<string, string>;
  customApiKey?: string;
  theme?: 'light' | 'dark' | 'system';
}

export interface AiExplanationResult {
  certId: string;
  certCode: string;
  certName: string;
  explanation: string;
  isFallback: boolean;
  source: 'gemini-api' | 'fallback-engine';
  timestamp: string;
}
