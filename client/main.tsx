import React from 'react'
import ReactDOM from 'react-dom/client'

import { CollabEditor } from './features/collab-editor.js'
import './features/monaco-worker.js'

import './main.css'
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register'
import { MyBlockNoteEditor } from './features/my-block-note-editor.js'

const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    alert('Offline ready')
  },
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true)
    }
  },
})

let name: string | null | undefined

do {
  name = localStorage.getItem('name') ?? window.prompt('Write your name')

  if (name) {
    localStorage.setItem('name', name)
  }
} while (!name)

window.name = name

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='grid grid-cols-2'>
      <div>
        <CollabEditor />
      </div>
      <div className='bg-white'>
        <MyBlockNoteEditor />
      </div>
    </div>
  </React.StrictMode>,
)
