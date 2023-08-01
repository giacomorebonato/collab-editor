import { AudioItem } from '../features/editor/audio-item.js'
import { MyBlockNoteEditor } from '../features/editor/my-block-note-editor.js'
import { PageAnimation } from '../features/page-animation.js'

export const EditorPage = () => {
  return (
    <PageAnimation>
      <div className='grid grid-cols-1 container mx-auto gap-4 py-8'>
        <AudioItem />
        <MyBlockNoteEditor />
      </div>
    </PageAnimation>
  )
}
