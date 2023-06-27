import { HocuspocusProvider } from '@hocuspocus/provider'
import Editor from '@monaco-editor/react'
import './collab-editor.css'

import { IndexeddbPersistence } from 'y-indexeddb'
import { MonacoBinding } from 'y-monaco'
import * as Y from 'yjs'

const DOC_NAME = 'collab-editor'
const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)
const invertHex = (hex: string) => {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase()
}
const createCssClass = (className: string, definition: string) => {
  if (document.getElementById(className)) {
    return
  }
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `.${className} { ${definition} }`
  style.id = className

  document.getElementsByTagName('head')[0].appendChild(style)
}

let name: string | null | undefined

do {
  name = localStorage.getItem('name') ?? window.prompt('Write your name')

  if (name) {
    localStorage.setItem('name', name)
  }
} while (!name)

export const CollabEditor = () => {
  return (
    <Editor
      className='editor'
      defaultLanguage='javascript'
      defaultValue={`var a = 1`}
      theme='vs-dark'
      onMount={(editor) => {
        const ydoc = new Y.Doc()
        const type = ydoc.getText('monaco')

        new IndexeddbPersistence(DOC_NAME, ydoc)

        const url =
          window.location.hostname === 'localhost'
            ? `ws://localhost:3000/api/editor/${DOC_NAME}`
            : `wss://collab-editor.fly.dev/api/editor/${DOC_NAME}`

        const hocuspocus = new HocuspocusProvider({
          document: ydoc,
          url,
          name: DOC_NAME,
          onConnect() {
            console.log(`${DOC_NAME} connected`)
          },
          async onSynced() {
            console.log('synced')
          },
          onAwarenessUpdate({ states }) {
            for (const entry of states) {
              const textColor = getRandomColor()
              const bgColor = invertHex(textColor)

              createCssClass(
                `yRemoteSelectionHead-${entry.clientId}`,
                `background-color: #${bgColor};`,
              )
              createCssClass(
                `yRemoteSelectionHead-${entry.clientId}::after`,
                `content: "${entry.user.name}";
                border: 3px solid #${textColor} !important;
                background-color: #${bgColor};
                border-radius: 4px;
                color: #${textColor};
                padding: 2px;`,
              )
            }
          },
        })

        hocuspocus.setAwarenessField('user', {
          name,
          test: 'pippo',
          color: '#ffcc00',
        })

        const model = editor.getModel()

        if (model) {
          new MonacoBinding(
            type,
            model,
            new Set([editor]),
            hocuspocus.awareness,
          )
        }
      }}
    />
  )
}
