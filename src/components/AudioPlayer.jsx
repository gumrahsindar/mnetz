import { Button } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react'

function AudioPlayer({ source }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(new Audio(source))

  useEffect(() => {
    const currentAudioRef = audioRef.current

    const handleAudioEnded = () => {
      setIsPlaying(false)
    }

    currentAudioRef.addEventListener('ended', handleAudioEnded)

    return () => {
      currentAudioRef.removeEventListener('ended', handleAudioEnded)
    }
  }, [audioRef])

  useEffect(() => {
    setIsPlaying(false)
    audioRef.current.setAttribute('src', source)
  }, [source])

  function handleAudioPlay() {
    setIsPlaying(!isPlaying)
    return isPlaying ? audioRef.current.pause() : audioRef.current.play()
  }

  return (
    <div className='player'>
      {/* <Button
        variant={'secondary'}
        style={{ width: '40%' }}
        className={'my-2'}
        onClick={handleAudioPlay}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button> */}
      {/* controls özelliği ekleniyor */}
      <audio ref={audioRef} controls />
    </div>
  )
}

export default AudioPlayer
