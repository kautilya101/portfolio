import { client, isSanityConfigured } from './sanity';
import { siteQuery, projectsQuery, experienceQuery } from './queries';
import { fallbackSite, fallbackProjects, fallbackExperience } from '../data/fallback';
import type { Experience, Project, SectionKey, Site } from './types';

const SECTION_KEYS: SectionKey[] = ['about', 'experience', 'projects', 'stack', 'lab', 'contact'];

const cache = new Map<string, Promise<unknown>>();

function fetchOnce<T>(key: string, query: string): Promise<T | null> {
  if (!client) return Promise.resolve(null);
  if (import.meta.env.DEV) return client.fetch<T>(query);
  if (!cache.has(key)) cache.set(key, client.fetch<T>(query));
  return cache.get(key) as Promise<T | null>;
}

function clean<T extends object>(value: T | null | undefined): Partial<T> {
  if (!value) return {};
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== null && v !== undefined && v !== '')) as Partial<T>;
}

export async function getSite(): Promise<Site> {
  if (!isSanityConfigured) return fallbackSite;
  const data = clean(await fetchOnce<Partial<Site>>('site', siteQuery));
  const sections = Object.fromEntries(
    SECTION_KEYS.map((key) => [key, data.sections?.[key] !== false])
  ) as Record<SectionKey, boolean>;
  return {
    name: data.name ?? 'Your Name',
    role: data.role ?? 'Software Engineer',
    publication: data.publication ?? 'The Engineering Post',
    tagline: data.tagline ?? 'Software • Web • Mobile • Systems',
    description: data.description ?? '',
    heroHeadline: data.heroHeadline?.length ? data.heroHeadline : [],
    heroIntro: data.heroIntro ?? '',
    bio: data.bio ?? null,
    portrait: data.portrait ?? null,
    location: data.location,
    yearsExperience: data.yearsExperience,
    focus: data.focus,
    email: data.email,
    github: data.github,
    linkedin: data.linkedin,
    resume: data.resume,
    contactHeadline: data.contactHeadline?.length ? data.contactHeadline : [],
    stack: data.stack ?? [],
    lab: data.lab ?? [],
    sections
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return fallbackProjects;
  return (await fetchOnce<Project[]>('projects', projectsQuery)) ?? [];
}

export async function getExperience(): Promise<Experience[]> {
  if (!isSanityConfigured) return fallbackExperience;
  return (await fetchOnce<Experience[]>('experience', experienceQuery)) ?? [];
}

export interface Edition {
  site: Site;
  projects: Project[];
  experience: Experience[];
  show: Record<SectionKey, boolean>;
}

export async function getEdition(): Promise<Edition> {
  const [site, projects, experience] = await Promise.all([getSite(), getProjects(), getExperience()]);
  const bioPresent = Boolean(site.bio && (typeof site.bio === 'string' ? site.bio.trim() : site.bio.length));
  const show: Record<SectionKey, boolean> = {
    about: site.sections.about && bioPresent,
    experience: site.sections.experience && experience.length > 0,
    projects: site.sections.projects && projects.length > 0,
    stack: site.sections.stack && site.stack.length > 0,
    lab: site.sections.lab && site.lab.length > 0,
    contact: site.sections.contact && Boolean(site.email || site.github || site.linkedin || site.resume)
  };
  return { site, projects, experience, show };
}

export function formatPeriod(start: string, end?: string | null) {
  const year = (d: string) => new Date(d).getFullYear().toString();
  const from = year(start);
  if (!end) return `${from} — Present`;
  const to = year(end);
  return from === to ? from : `${from} — ${to}`;
}

export function editionDate(date = new Date()) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
}

export function issueNumber(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return String(Math.ceil(day / 7)).padStart(3, '0');
}

export function pad(n: number, size = 3) {
  return String(n).padStart(size, '0');
}
