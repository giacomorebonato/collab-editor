import { ClientOnly } from '@features/client-only.jsx'
import { PageAnimation } from '@features/page-animation.jsx'
import { Spinner } from '@features/ui/spinner.jsx'

export const Page = () => {
  return (
    <PageAnimation>
      <div className='grid grid-cols-1 container mx-auto gap-4 py-8'>
        <ClientOnly
          fallback={<Spinner />}
          component={() =>
            import('@features/editor/audio-item.jsx').then((item) => {
              return { default: item.AudioItem }
            })
          }
        />

        <ClientOnly
          fallback={<Spinner />}
          component={() =>
            import('@features/editor/my-block-note-editor.jsx').then((item) => {
              return { default: item.MyBlockNoteEditor }
            })
          }
        />
      </div>
    </PageAnimation>
  )
}
