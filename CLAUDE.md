# Desktop Patterns

The desktop pattern control panel, an application for SystemOnline (the
sibling `system-online` repo). It runs on `system-online-sdk`'s shell over
the `vintage-frames` kit's elements, both sibling repos too. It ships as one
file, its app file `Desktop Patterns.png`, which SystemOnline builds in from
its `apps/`; it came out of SystemOnline's `src/apps/desktop-patterns/`, the
second application to leave after Meteors (the sibling `meteors-app`, the
model for this repo). The SDK writes the file: its `system-online-sdk/build`
entry holds the frame, the packer and the `appFile()` Vite plugin, so this
repo carries neither frame nor packer. The SDK's docs
(`../system-online-sdk/docs/`) are the guides: `GUIDE.md` for an application
in a repo of its own, `SHELL.md` for the shell, `APP-FILES.md` for the
format.

## Commands

- `npm run dev` — the dev desktop (`index.html`, `dev/main.ts`); `?save=1`
  keeps its catalog and session across a reload
- `npm run build` — the app file, `dist/Desktop Patterns.png`, through the
  SDK's `appFile()` (`vite.config.ts`). The release is that file, copied
  into SystemOnline's `apps/`
- The gates: `npm run typecheck`, `npm run build`. CI runs both on every
  push and pull request.

## Tests

None yet: Desktop Patterns is wiring of the kit's elements, with no pure
logic, and the wiring is checked by eye on the dev desktop. The first pure
module with rules brings unit tests and an `npm test` gate, as meteors-app
has them: `test/*.test.mjs`, run by `node --test`, importing the TypeScript
source through Node's type stripping. No browser tests, and nothing that
asserts markup, copy, constants or what the kit or the SDK renders. A module
under test imports no DOM, nothing of either package but
`system-online-sdk/pure`, and no `?raw`, and its relative imports carry their
`.ts` extension.

## What an application in an app file relies on

The app file's code goes into a page that brings its own copy of the kit and
the SDK, so:

- **Imports**: `vintage-frames`, `system-online-sdk`,
  `system-online-sdk/pure` and its own files. It composes the kit's
  elements and brings no Lit of its own. The build leaves those three entries
  as imports, and fails on any other import, on Lit, and on CSS.
- **Art** is imported, so the build inlines it. No page paths.
- **Layout** sits on its own elements. No site stylesheet, and no CSS import.
- **No session keys of its own.** The desktop's pattern is the shell's,
  saved with the session; Desktop Patterns only sets `desktop.pattern`. A
  key it adds carries its id (`desktop-patterns-…`), is read back
  defensively, and nothing breaks when `ctx.state` is null.
- **Nothing site-specific through the context**: no `ctx.services`, and no
  `ctx.apps`.
- **Where its icon lives is the site's.** SystemOnline files it in the System
  Folder's Control Panels, with an alias of that folder in Apple Menu Items;
  the dev desktop's seed does the same. The application adds no items to the
  Apple menu: its icon, an alias and the Apple menu all open it through its
  `open`.
- **Its id never changes** (`desktop-patterns`): saved icons, aliases and
  windows name it. It registers no kinds; any it adds are named after its id.
- **Each manifest field has one source**: `id`, `name`, `version`, `author`
  and `description` from `src/app.ts`; `requires` from the range of the
  `system-online-sdk` dev dependency, and `api` from the SDK it's built on;
  the icon from `src/art/desktop-patterns.png`. `package.json` carries no
  version of its own for that reason.
- **Each SDK minor** moves the `system-online-sdk` range, and
  `vintage-frames` to the range the SDK's peer dependency names, gets a look
  at the panel on the new SDK, and a build. The chooser is a 13 × 3 grid
  (`windows.html`, and the ±13 row step in `windows.ts`) sized for the kit's
  38 `PATTERN_NAMES`: a kit with more needs the grid and the window's height
  changed. Desktop Patterns is at 0.x: a minor when the range moves, a patch
  for the panel alone. The SDK's `GUIDE.md` § Moving to a new release has
  the steps.

`dev/` is the dev desktop's alone and never goes into the app file; it may
borrow SystemOnline's art.

## Invariants — don't break, don't re-litigate

- **Never reach into the SDK's or the kit's internals.** Import their
  published entries only, never a deep path into either's `dist/`. What the
  panel needs and they don't do is a change to them, asked for as a doc in
  `feature-requests/<name>.md`, never worked around here: in the sibling
  `system-online-sdk` repo for the shell or app files, in the sibling
  `vintage-frames` repo for an element.
- Everything is authored in **system pixels** on the 1-bit grid. The window
  is fixed at 248 × 304; `windows.html`'s comment works the size out.
- `dist/` is a build output — regenerate, don't hand-edit.
- Comments are short and direct: label a section or state a non-obvious
  constraint. A larger change starts as a plan in `docs/<topic>-plan.md`.

## Commits

Concise messages: a summary line plus at most a few sentences. No co-author
or generated-by trailers.
