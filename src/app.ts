// Desktop Patterns as its app file names it. The manifest's id, name, version,
// author and description come from here, and index.ts takes its id and name
// from it, so the two can't drift. The id never changes: saved icons, aliases
// and windows name it.

export const APP = {
  id: 'desktop-patterns',
  name: 'Desktop Patterns',
  version: '0.1.0',
  author: 'Adam Portilla',
  description: "A control panel for the desktop's pattern: preview any of vintage-frames' patterns, then set it.",
} as const
