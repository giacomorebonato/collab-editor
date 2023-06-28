import React from 'react'
import ReactDOM from 'react-dom/client'

import { CollabEditor } from './features/collab-editor.js'
import './features/monaco-worker.js'

import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CollabEditor />
  </React.StrictMode>,
)
