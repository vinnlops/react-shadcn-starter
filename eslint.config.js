import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Exceções por arquivo para preservar a API dos componentes gerados pelo shadcn.
// Exports mistos ainda podem invalidar o módulo e propagar o HMR no Vite.
const shadcnExportNames = {
  'badge.tsx': ['badgeVariants'],
  'button-group.tsx': ['buttonGroupVariants'],
  'button.tsx': ['buttonVariants'],
  'carousel.tsx': ['useCarousel'],
  'combobox.tsx': ['useComboboxAnchor'],
  'direction.tsx': ['useDirection'],
  'marker.tsx': ['markerVariants'],
  'message-scroller.tsx': [
    'useMessageScroller',
    'useMessageScrollerScrollable',
    'useMessageScrollerVisibility',
  ],
  'navigation-menu.tsx': ['navigationMenuTriggerStyle'],
  'sidebar.tsx': ['useSidebar'],
  'tabs.tsx': ['tabsListVariants'],
  'toast.tsx': ['createToastManager', 'toast', 'useToastManager'],
  'toggle.tsx': ['toggleVariants'],
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...Object.entries(shadcnExportNames).map(([file, allowExportNames]) => ({
    files: [`src/shared/shadcn/components/ui/${file}`],
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          ...reactRefresh.configs.vite.rules[
            'react-refresh/only-export-components'
          ][1],
          allowExportNames,
        },
      ],
    },
  })),
])
