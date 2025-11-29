import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { useEffect } from 'react'

interface VideoPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title?: string
}

const VideoPlayerModal = ({ isOpen, onClose, videoUrl, title }: VideoPlayerModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-background rounded-xl shadow-2xl max-w-4xl w-full aspect-video"
            >
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              {title && (
                <div className="absolute -top-12 left-0 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <h3 className="text-lg font-semibold">{title}</h3>
                </div>
              )}
              <div className="w-full h-full rounded-xl overflow-hidden">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={isOpen}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VideoPlayerModal

