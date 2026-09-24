import type { Experience, Project, Site } from '../lib/types';

export const fallbackSite: Site = {
  name: 'Kautilya Bhardwaj',
  role: 'Software Engineer',
  publication: 'The Engineering Post',
  tagline: 'Software • Web • Mobile • Systems',
  description: 'Kautilya Bhardwaj — frontend-heavy fullstack engineer building products across web and mobile.',
  heroHeadline: ['Building products', 'across web', '& mobile.'],
  heroIntro: 'Frontend-heavy fullstack engineer working across interfaces, APIs, data and product systems.',
  bio: `I build software across the stack, with a frontend-first approach. The interface is where a product earns trust, so that is where I start — and then I follow the request all the way down.

My work spans web applications, mobile applications, APIs, databases and the product systems that tie them together. I care about fast pages, honest data models and interfaces that stay out of the way.

Lately that has meant shipping mobile experiences for an electric mobility company, building AI-assisted audio tooling, and spending evenings in the lab with real-time systems, agents and voice interfaces.`,
  portrait: null,
  location: 'Based in India',
  yearsExperience: '3+ years experience',
  focus: 'Web / Mobile / Backend',
  email: 'hello@example.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  resume: undefined,
  contactHeadline: ['Looking for a', 'software engineer?'],
  stack: [
    { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'TypeScript'] },
    { label: 'Backend', items: ['Node.js', 'PostgreSQL', 'Prisma'] },
    { label: 'Mobile', items: ['React Native'] },
    { label: 'AI', items: ['OpenAI', 'Gemini', 'LLM APIs'] },
    { label: 'Infra', items: ['Docker', 'AWS', 'Git'] }
  ],
  lab: [
    { title: 'Real-time systems', note: 'WebSockets, presence and conflict-free sync.' },
    { title: 'AI agents', note: 'Tool-using agents that do real work.' },
    { title: 'MCP experiments', note: 'Model Context Protocol servers and clients.' },
    { title: 'Voice interfaces', note: 'Speech in, speech out, low latency.' },
    { title: '3D visualization', note: 'Small, purposeful scenes in the browser.' }
  ],
  sections: { about: true, experience: true, projects: true, stack: true, lab: true, contact: true }
};

export const fallbackExperience: Experience[] = [
  {
    company: 'FYN Mobility',
    role: 'Software Engineer — Mobile',
    startDate: '2025-06-01',
    endDate: null,
    location: 'India',
    description: 'Building mobile experiences and working across the systems behind them.',
    surfaces: ['web', 'mobile', 'api', 'data'],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
    achievements: [
      'Shipped rider-facing mobile features end to end, from interface to API.',
      'Worked across internal web dashboards and the services that power them.'
    ]
  },
  {
    company: 'Scribie',
    role: 'Fullstack Developer',
    startDate: '2025-01-01',
    endDate: '2025-05-31',
    location: 'Remote',
    description: 'Built product surfaces and backend systems for AI-assisted audio transcription.',
    surfaces: ['web', 'api', 'ai'],
    technologies: ['Next.js', 'AI', 'Audio', 'Backend Systems'],
    achievements: [
      'Built Next.js interfaces for reviewing and editing transcripts.',
      'Integrated AI models into the audio processing pipeline.'
    ]
  }
];

export const fallbackProjects: Project[] = [
  {
    title: 'Go-Form',
    slug: 'go-form',
    category: 'Technology',
    headline: 'A form builder for the modern web',
    description: 'Dynamic forms, reusable components, authentication, database-backed form storage and analytics.',
    year: '2025',
    role: 'Fullstack Engineer',
    featured: true,
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    coverImage: null,
    gallery: [],
    problem: 'Most form tools force a choice between flexibility and speed. Teams either hand-code every form or accept a rigid builder that cannot grow with them.',
    approach: 'Treat every form as a schema. The editor, the renderer and the storage layer all speak the same language, so a field added in the builder is instantly valid everywhere else.',
    implementation: 'A Next.js application with a drag-and-drop editor, a schema-driven renderer built from reusable components, authentication, and a PostgreSQL store modelled with Prisma. Submissions feed a lightweight analytics view.',
    lessons: 'A good schema is a product decision, not just a data decision. Getting it right early made every later feature cheaper.',
    results: ['Schema-driven editor and renderer', 'Authenticated workspaces', 'Response analytics'],
    github: 'https://github.com/',
    liveUrl: undefined
  },
  {
    title: 'Relay',
    slug: 'relay',
    category: 'Real-Time',
    headline: 'A shared board that never waits',
    description: 'A collaborative board with live cursors, presence and optimistic updates that reconcile in the background.',
    year: '2025',
    role: 'Fullstack Engineer',
    featured: true,
    technologies: ['React', 'WebSockets', 'Node.js', 'Redis'],
    coverImage: null,
    gallery: [],
    problem: 'Collaborative tools feel slow the moment they wait for the server. Every round trip is visible to the user.',
    approach: 'Apply every change locally first, broadcast it, and reconcile conflicts quietly on the server.',
    implementation: 'A React client with an optimistic update queue, a Node.js WebSocket gateway, and Redis pub/sub for fan-out across instances.',
    lessons: 'Latency is a design problem as much as an engineering one.',
    results: ['Live presence and cursors', 'Optimistic updates', 'Horizontal fan-out'],
    github: 'https://github.com/'
  },
  {
    title: 'Fieldnote',
    slug: 'fieldnote',
    category: 'Mobile',
    headline: 'Notes that work without a signal',
    description: 'An offline-first React Native notebook that syncs when the network returns.',
    year: '2024',
    role: 'Mobile Engineer',
    featured: false,
    technologies: ['React Native', 'SQLite', 'TypeScript', 'Node.js'],
    coverImage: null,
    gallery: [],
    problem: 'Field teams lose work when connectivity drops.',
    approach: 'Make the device the source of truth and treat the network as an optional courier.',
    implementation: 'React Native with a local SQLite store, a background sync queue and a small Node.js API for merge and backup.',
    lessons: 'Offline-first changes how you think about every screen.',
    results: ['Offline-first storage', 'Background sync', 'Conflict resolution'],
    github: 'https://github.com/'
  },
  {
    title: 'Agent Desk',
    slug: 'agent-desk',
    category: 'Artificial Intelligence',
    headline: 'Agents with a proper workbench',
    description: 'A workspace for tool-using AI agents built on the Model Context Protocol.',
    year: '2026',
    role: 'Engineer',
    featured: false,
    technologies: ['TypeScript', 'MCP', 'LLM APIs', 'Next.js'],
    coverImage: null,
    gallery: [],
    problem: 'Agents are only as useful as the tools they can reach and the visibility you have into what they did.',
    approach: 'Expose tools through MCP servers and give every run a readable, replayable log.',
    implementation: 'A Next.js interface over a set of MCP servers, with streamed tool calls and a timeline of each agent run.',
    lessons: 'Observability is the feature that makes agents trustworthy.',
    results: ['MCP tool servers', 'Streaming run timeline', 'Replayable sessions'],
    github: 'https://github.com/'
  }
];
