import { Play, Lock, Award, MapPin, ArrowRight, Video, User } from 'lucide-react'
import { Card, CardContent } from './ui/Card'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface CandidateCardProps {
  id: string
  firstName: string
  lastName: string
  profession?: string
  city?: string
  videoUrl?: string
  photoUrl?: string
  experienceLevel?: string
}

const CandidateCard = ({
  id,
  firstName,
  lastName,
  profession,
  city,
  videoUrl,
  photoUrl,
  experienceLevel,
}: CandidateCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/namizedler/${id}`)
  }

  const initials = `${firstName[0]}${lastName[0]}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer group"
    >
      <Link to={`/namizedler/${id}`}>
        <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 relative">
        {/* Experience Badge */}
        <div className="absolute top-3 left-3 z-20 bg-white text-blue-700 px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-lg flex items-center space-x-1 border border-blue-100">
          <Award className="h-3.5 w-3.5 text-blue-600" />
          <span>{experienceLevel || 'Peşəkar'}</span>
          </div>

          {/* Video Indicator */}
          {videoUrl && (
            <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
              <Video className="h-4 w-4 text-blue-600" />
            </div>
          )}

          {/* Image/Avatar Section */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 overflow-hidden">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-xl">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {initials}
                  </span>
                </div>
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Video Play Button - Centered */}
            {videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white"
                >
                  <Play className="h-8 w-8 md:h-10 md:w-10 text-blue-600 ml-1" fill="currentColor" />
                </motion.div>
              </div>
            )}

            {/* Lock Overlay - Only shows if not authenticated */}
            <div className="absolute inset-0 bg-blue-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 md:p-6 shadow-2xl transform group-hover:scale-110 transition-transform mb-3 mx-auto w-fit">
                  <Lock className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
                </div>
                <p className="text-white font-semibold text-sm md:text-base">Giriş edin</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="p-5 md:p-6 space-y-4">
            {/* Name and Initials */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 line-clamp-1">
                  {firstName} {lastName}
                </h3>
                {profession && (
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base">
                    {profession}
                  </p>
                )}
              </div>
              {/* Small Avatar in corner */}
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-2 border-blue-100 dark:border-blue-900/40 shadow-md">
                <span className="text-sm md:text-base font-bold text-white">
                  {initials}
                </span>
              </div>
            </div>

            {/* Location */}
            {city && (
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium">{city}</span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* CTA Button */}
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
              size="md"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleClick()
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Profilə Bax
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export default CandidateCard
