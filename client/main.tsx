import React from 'react'
import ReactDOM from 'react-dom/client'

import { CollabEditor } from './features/collab-editor.js'
import './features/monaco-worker.js'

import './main.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Offline ready')
  },
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CollabEditor />
  </React.StrictMode>,
)
