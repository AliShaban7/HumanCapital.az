import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface AdSlotProps {
  position: string
  format: 'banner' | 'rectangle' | 'card' | 'native'
  size?: '728x90' | '300x250' | '336x280' | '160x600' | '300x600' | '320x50' | '320x100'
  priority?: 'premium' | 'standard' | 'economy'
  className?: string
  image?: string
  link?: string
  title?: string
  description?: string
}

const AdSlot = ({
  position,
  format,
  size = '300x250',
  priority = 'standard',
  className = '',
  image = '/images/ogs0qz4cJFrQtg8KfkgXNQCcyQKFgHu6m9MGsvjv-2880--resize.webp',
  link = '#',
  title,
  description,
}: AdSlotProps) => {
  // Size mapping
  const sizeMap: Record<string, { width: string; height: string }> = {
    '728x90': { width: '728px', height: '90px' },
    '300x250': { width: '300px', height: '250px' },
    '336x280': { width: '336px', height: '280px' },
    '160x600': { width: '160px', height: '600px' },
    '300x600': { width: '300px', height: '600px' },
    '320x50': { width: '320px', height: '50px' },
    '320x100': { width: '320px', height: '100px' },
  }

  const dimensions = sizeMap[size] || { width: '300px', height: '250px' }

  // Format-specific rendering
  if (format === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative w-full ${className}`}
      >
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            style={{ height: dimensions.height }}
          >
            <img
              src={image}
              alt={title || 'Advertisement'}
              className="w-full h-full object-cover"
            />
            {title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
                <div className="text-white">
                  <p className="font-semibold text-sm">{title}</p>
                  {description && <p className="text-xs opacity-90 mt-1">{description}</p>}
                </div>
              </div>
            )}
          </a>
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">
            Reklam
          </div>
        </div>
      </motion.div>
    )
  }

  if (format === 'rectangle') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative ${className}`}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={image}
              alt={title || 'Advertisement'}
              className="w-full h-full object-cover"
            />
            {title && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                <div className="text-white">
                  <p className="font-semibold text-sm mb-1">{title}</p>
                  {description && <p className="text-xs opacity-90 line-clamp-2">{description}</p>}
                </div>
              </div>
            )}
          </a>
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            <span>Reklam</span>
          </div>
        </div>
      </motion.div>
    )
  }

  if (format === 'card' || format === 'native') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative ${className}`}
      >
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title || 'Advertisement'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">
                Reklam
              </div>
            </div>
            {(title || description) && (
              <div className="p-4">
                {title && <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>}
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
                )}
              </div>
            )}
          </a>
        </div>
      </motion.div>
    )
  }

  return null
}

export default AdSlot

