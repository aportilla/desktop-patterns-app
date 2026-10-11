// The dev desktop: the SDK's shell over index.html's desktop, with the SDK's
// Finder and Desktop Patterns from its source. The Finder's art is
// SystemOnline's, borrowed (dev/art/).
//
// The seed files Desktop Patterns as SystemOnline does: its icon in the System
// Folder's Control Panels, and an alias of Control Panels in Apple Menu Items,
// so both the folder and Apple ▸ Control Panels ▸ Desktop Patterns open it.
// There is no startup disk, so the System Folder sits on the desktop.
//
// The catalog is in memory and there is no session, so a reload starts over on
// the default pattern. ?save=1 keeps the catalog in IndexedDB and the session
// in localStorage, so a set pattern and the icons' places outlast a reload.

import 'vintage-frames'
import { applyCursor } from 'vintage-frames'
import type { VfDesktop } from 'vintage-frames'
import {
  ALIAS_KIND,
  APPLE_MENU_ITEMS,
  APP_KIND,
  FOLDER,
  SYSTEM_FOLDER,
  createShell,
  finder,
  indexedDbStorage,
  localStorageState,
  memoryStorage,
} from 'system-online-sdk'
import { APP } from '../src/app.ts'
import { desktopPatterns } from '../src/index.ts'
import folderArt from './art/folder.png'
import systemFolderArt from './art/system-folder.png'
import appleMenuItemsArt from './art/apple-menu-items.png'
import startupItemsArt from './art/startup-items.png'
import trashArt from './art/trash.png'
import trashFullArt from './art/trash-full.png'
import trashMarkArt from './art/trash-indicator.png'
import documentArt from './art/text-file.png'
import cautionArt from './art/alert.png'

const save = new URLSearchParams(location.search).get('save') === '1'
const desktop = document.getElementById('desktop') as VfDesktop

const removeCursor = applyCursor()

const shell = createShell(desktop, {
  apps: [
    finder({
      storage: save ? indexedDbStorage('desktop-patterns-app') : memoryStorage(),
      art: {
        folder: folderArt,
        systemFolder: systemFolderArt,
        appleMenuItems: appleMenuItemsArt,
        startupItems: startupItemsArt,
        trash: trashArt,
        trashFull: trashFullArt,
        trashMark: trashMarkArt,
        document: documentArt,
        caution: cautionArt,
      },
      system: { folder: 'System Folder', appleMenu: 'Apple Menu Items', startup: 'Startup Items' },
      seed: async (catalog) => {
        const panels = await catalog.create({ name: 'Control Panels', parent: SYSTEM_FOLDER })
        if (!panels) return
        await catalog.create({ kind: APP_KIND, name: APP.name, parent: panels.id, data: { app: APP.id } })
        await catalog.create({
          kind: ALIAS_KIND,
          name: 'Control Panels',
          parent: APPLE_MENU_ITEMS,
          data: { original: panels.id, kind: FOLDER },
        })
      },
    }),
    desktopPatterns(),
  ],
  fit: 'viewport',
  state: save ? localStorageState('desktop-patterns-app:desktop') : null,
})

// HMR teardown. Vite re-runs this module without unloading the old instance,
// so everything wired above is disposed.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    shell.dispose()
    removeCursor()
  })
}
