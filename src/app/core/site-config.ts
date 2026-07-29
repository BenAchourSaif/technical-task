// Central content constants. Anything marked TODO is a placeholder that must
// be replaced with real, verifiable information before this site is shared
// with a recruiter — nothing fabricated ships here.

export interface ProjectLink {
  label: string;
  route: string;
  status: 'live' | 'wip';
  tagline: string;
}

export const SITE = {
  candidateName: 'Saif Eddine Ben Achour',
  role: 'Unity Developer — Technical Test for Adeeb',
  portfolioUrl: 'https://benachoursaif.github.io/saifeddine/',
  task1DemoVideoUrl: 'https://www.youtube.com/embed/4vozrgZzjwQ' as string | null,
  task2DemoVideoUrl: 'https://www.youtube.com/embed/6t-hOJ-K-GM' as string | null,
  repoStoryforge: 'storyforge-webgl',
  repoStoryforgeUrl: 'https://github.com/BenAchourSaif/storyforge-webgl' as string | null,
  repoContentDiscovery: 'content-discovery-webgl',
  // TODO: push content-discovery-webgl to GitHub and paste its URL here.
  repoContentDiscoveryUrl: null as string | null,
};

export const BIO = {
  headline: 'Saif Eddine Ben Achour',
  // Intentionally no years-of-experience or title claim here — keep this to what's
  // demonstrated by the two projects themselves until a real, confirmed bio is provided.
  paragraphs: [
    'Unity developer — this site presents the two deliverables submitted for the Unity Developer technical test at Adeeb.',
  ],
  facts: [] as { label: string; value: string }[],
};

export const PROJECTS: ProjectLink[] = [
  {
    label: 'Task 1 — Interactive Content Creation',
    route: '/task-1-story-creation',
    status: 'live',
    tagline: 'Unity WebGL story editor, Firebase save/load, read-only playback mode.',
  },
  {
    label: 'Task 2 — Search & Content Discovery',
    route: '/task-2-search',
    status: 'live',
    tagline: 'Full-text search over a Firebase catalog with unstructured metadata parsing.',
  },
];
