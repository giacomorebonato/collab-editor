import { createRef, useRef } from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'
import WaveSurfer from 'wavesurfer.js'

export const AudioItem = () => {
  const divRef = createRef<HTMLDivElement>()
  const wavesurferRef = useRef<WaveSurfer>()

  return (
    <div className='flex flex-row'>
      <AudioRecorder
        onRecordingComplete={(blob) => {
          const url = URL.createObjectURL(blob)

          if (wavesurferRef.current) {
            wavesurferRef.current.destroy()
          }

          const wavesurfer = WaveSurfer.create({
            container: divRef.current!,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            url,
            cursorWidth: 4,
            height: 40,
          })

          wavesurferRef.current = wavesurfer

          wavesurfer.once('interaction', () => {
            if (wavesurfer.isPlaying()) {
              wavesurfer.pause()
            } else {
              wavesurfer.play()
            }
          })
        }}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension='webm'
      />
      <div ref={divRef} className='flex-1 pl-2' />
    </div>
  )
}
