import React from 'react'
import ReactDOM from 'react-dom/client'

import { CollabEditor } from './features/collab-editor.js'
import { ReloadPrompt } from './features/reload-prompt.js'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReloadPrompt />
    <CollabEditor />
  </React.StrictMode>,
)
