import { hydrateRoot } from 'react-dom/client'
import { REACT_ROOT_ID } from './config.js'
import { PageShell } from './page-shell.js'
import type { PageContextClient } from './types.js'

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  if (!Page) {
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined',
    )
  }
  const root = document.getElementById(REACT_ROOT_ID)
  if (!root) {
    throw Error(`DOM element #${REACT_ROOT_ID} not found`)
  }
  hydrateRoot(
    root,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
  )
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
