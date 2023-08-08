import { AppProviders } from '@client/app-providers.jsx'
import React from 'react'
import { Root } from './layout.jsx'
import './page-shell.css'
import type { PageContext } from './types'
import { PageContextProvider } from './use-page-context'

export function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext: PageContext
}) {
  return (
    <React.StrictMode>
      <AppProviders>
        <PageContextProvider pageContext={pageContext}>
          <Root>{children}</Root>
        </PageContextProvider>
      </AppProviders>
    </React.StrictMode>
  )
}
