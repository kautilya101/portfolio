import type { PortableTextBlock } from '@portabletext/types';

export type RichText = string | PortableTextBlock[] | null | undefined;

export interface SanityImage {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  caption?: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  headline?: string;
  category?: string;
  year?: string;
  role?: string;
  featured?: boolean;
  technologies: string[];
  coverImage?: SanityImage | null;
  gallery: SanityImage[];
  problem?: RichText;
  approach?: RichText;
  implementation?: RichText;
  lessons?: RichText;
  results: string[];
  github?: string;
  liveUrl?: string;
}

export type Surface = 'web' | 'mobile' | 'api' | 'data' | 'ai' | 'infra';

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  location?: string;
  description?: string;
  surfaces: Surface[];
  technologies: string[];
  achievements: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface LabItem {
  title: string;
  note?: string;
  url?: string;
}

export type SectionKey = 'about' | 'experience' | 'projects' | 'stack' | 'lab' | 'contact';

export interface Site {
  name: string;
  role: string;
  publication: string;
  tagline: string;
  description: string;
  heroHeadline: string[];
  heroIntro: string;
  bio: RichText;
  portrait?: SanityImage | null;
  location?: string;
  yearsExperience?: string;
  focus?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
  contactHeadline: string[];
  stack: StackGroup[];
  lab: LabItem[];
  sections: Record<SectionKey, boolean>;
}
