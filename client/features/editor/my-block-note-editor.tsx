import { BlockNoteEditor } from '@blocknote/core'
import '@blocknote/core/style.css'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { useEffect } from 'react'
import useContant from 'use-constant'
import { IndexeddbPersistence } from 'y-indexeddb'
import * as Y from 'yjs'

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)

const DOC_NAME = 'block-note-editor'
const url =
  window.location.hostname === 'localhost'
    ? `ws://localhost:3000/api/editor/${DOC_NAME}`
    : `wss://collab-editor.fly.dev/api/editor/${DOC_NAME}`

export function MyBlockNoteEditor() {
  const ydoc = useContant(() => new Y.Doc())
  const hocuspocus = useContant(
    () =>
      new HocuspocusProvider({
        document: ydoc,
        url,
        name: DOC_NAME,
        onConnect() {
          console.log(`${DOC_NAME} connected`)
        },
      }),
  )
  const persistence = useContant(() => new IndexeddbPersistence(DOC_NAME, ydoc))

  useEffect(() => {
    persistence.on('sync', () => {
      console.log('synced')
    })
  }, [persistence])

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

  return <BlockNoteView editor={editor} />
}
