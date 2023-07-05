import { BlockNoteEditor } from '@blocknote/core'
import '@blocknote/core/style.css'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { IndexeddbPersistence } from 'y-indexeddb'
import * as Y from 'yjs'

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)
const ydoc = new Y.Doc()
const DOC_NAME = 'block-note-editor'
const url =
  window.location.hostname === 'localhost'
    ? `ws://localhost:3000/api/editor/${DOC_NAME}`
    : `wss://collab-editor.fly.dev/api/editor/${DOC_NAME}`

new IndexeddbPersistence(DOC_NAME, ydoc)
const hocuspocus = new HocuspocusProvider({
  document: ydoc,
  url,
  name: DOC_NAME,
  onConnect() {
    console.log(`${DOC_NAME} connected`)
  },
})

export function MyBlockNoteEditor() {
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    collaboration: {
      provider: hocuspocus,
      fragment: ydoc.getXmlFragment('document-store'),
      user: {
        name: window.name,
        color: `#${getRandomColor()}`,
      },
    },
  })

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} />
}
