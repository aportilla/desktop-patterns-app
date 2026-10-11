# Desktop Patterns

The desktop pattern control panel for
[SystemOnline](https://github.com/aportilla/system-online), the System 7
desktop in the browser: a preview well, a chooser of the kit's 38 patterns,
and Set Desktop Pattern. Use it at <https://system-online.portill.io/>:
Apple menu → Control Panels → Desktop Patterns.

Desktop Patterns is built on the published
[**system-online-sdk**](https://www.npmjs.com/package/system-online-sdk) and
[**vintage-frames**](https://www.npmjs.com/package/vintage-frames): the SDK's
shell runs it over the kit's elements. Its release is its app file,
`Desktop Patterns.png`: a PNG whose picture is Desktop Patterns' box and
whose chunks carry its manifest, its icon and its code. SystemOnline keeps
app files in its `apps/` and builds them in, so a release is that file
copied over. Nothing is published to npm.

```sh
npm install
npm run dev        # http://localhost:5173/
```

| Script | What it does |
| --- | --- |
| `npm run dev` | the dev desktop: the SDK's Finder with a System Folder, Desktop Patterns in its Control Panels, and Desktop Patterns from its source |
| `npm run build` | the app file, `dist/Desktop Patterns.png`: Desktop Patterns' box, with its manifest and code in the PNG's chunks |
| `npm run typecheck` | `tsc` over the panel, the dev desktop and the Vite config |

The dev desktop files Desktop Patterns as SystemOnline does: its icon in the
System Folder's Control Panels, and Control Panels in the Apple menu. It
starts over at each reload, on the default pattern. `?save=1` keeps its
catalog in IndexedDB and its session in localStorage, so a set pattern
outlasts a reload.

The packer, the box and its frame are the SDK's: `vite.config.ts` is one
call to `appFile()` from `system-online-sdk/build`, whose guide is the SDK's
[`docs/APP-FILES.md`](https://github.com/aportilla/system-online-sdk/blob/main/docs/APP-FILES.md).
The box carries the icon's stamp until Desktop Patterns has artwork of its
own.

## Layout

```
index.html, dev/main.ts   the dev desktop
dev/art/                  the dev desktop's Finder art, borrowed from SystemOnline
src/app.ts                Desktop Patterns' id, name, version, author and description: the manifest's source
src/index.ts              the application: its definition and its factory, the default export
src/windows.html          the panel's markup: the well, the chooser's grid, the button
src/windows.ts            the chooser: its cells, the ring, the keys, Set Desktop Pattern
src/menus.html            its File and View menus
src/art/                  its icon
```
