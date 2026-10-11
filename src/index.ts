// Desktop Patterns: the control panel application. Its icon, or an alias of
// it, opens one panel (windows.ts), centered, out of the icon when opened from
// it. Where the icon lives is the site's: SystemOnline keeps it in the System
// Folder's Control Panels, which the Apple menu lists as a submenu (Apple ▸
// Control Panels ▸ Desktop Patterns). Only Set Desktop Pattern changes the
// desktop's pattern, which the shell saves with the session; closing discards
// an unset choice.

import type { VfViewportBox, VfWindow } from 'vintage-frames'
import { centeredBox, defineApp } from 'system-online-sdk'
import type { AppDefinition } from 'system-online-sdk'
import menus from './menus.html?raw'
import windowMarkup from './windows.html?raw'
import icon from './art/desktop-patterns.png'
import { APP } from './app.ts'
import { patternsWindow } from './windows.ts'

export const DESKTOP_PATTERNS = APP.id

/** The kit's default desktop pattern, the 50% dither. */
const DEFAULT_PATTERN = 'gray-50'

export interface DesktopPatternsActions {
  /** Open the panel out of `from`, or bring it forward. Its icon and its
   *  aliases open it through this. */
  open(target: { from?: VfViewportBox | null }): void
}

export function desktopPatterns(): AppDefinition<DesktopPatternsActions> {
  return defineApp<DesktopPatternsActions>({
    id: DESKTOP_PATTERNS,
    name: APP.name,
    icon,
    menus,
    windows: windowMarkup,
    init(ctx) {
      const { desktop, windows } = ctx
      /** The panel, while it is open. */
      let panel: VfWindow | null = null

      // Each open seeds the choice from the desktop's pattern.
      const open = (from: VfViewportBox | null) => {
        if (panel?.isConnected) {
          desktop.bringToFront(panel)
          return
        }
        const win = patternsWindow(ctx.window('patterns'), desktop.pattern ?? DEFAULT_PATTERN, (pattern) => {
          desktop.pattern = pattern
        })
        const size = { width: win.width ?? 0, height: win.height ?? 0 }
        panel = windows.open({ app: DESKTOP_PATTERNS, from, create: () => win, place: (area) => centeredBox(area, size) })
      }

      ctx.onMenu((value) => {
        if (value === 'close' && panel?.isConnected) void windows.requestClose(panel)
        else if (value === 'quit') void windows.closeAll(DESKTOP_PATTERNS)
        else if (value === 'arrange') windows.arrange()
      })
      ctx.gate(ctx.item('arrange'), () => !windows.arranged())

      return { open: ({ from = null }) => open(from) }
    },
  })
}

/** The app file's code exports its factory by default. */
export default desktopPatterns
