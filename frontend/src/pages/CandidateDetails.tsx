import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, Briefcase, GraduationCap, ArrowLeft, Play, Download, 
  Mail, Phone, Globe, Award, Calendar, FileText, CheckCircle,
  Code, Users
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Button from '../components/ui/Button'
import VideoPlayerModal from '../components/VideoPlayerModal'
import api from '../lib/api'

interface Candidate {
  id: string
  firstName: string
  lastName: string
  profession?: string
  city?: string
  phone?: string
  email?: string
  bio?: string
  videoUrl?: string
  cvUrl?: string
  portfolio?: string
  photoUrl?: string
  skills?: string[]
  education?: any
  experience?: any
  certifications?: any[]
  languages?: any[]
}

const CandidateDetails = () => {
  const { id } = useParams()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) return
      try {
        setLoading(true)
        const response = await api.get(`/candidates/${id}`)
        setCandidate(response.data)
        setError('')
        
        // Record profile view
        try {
          await api.post(`/profile-views/view/${id}`)
        } catch (viewError) {
          // Silently fail - view recording is not critical
          console.error('Failed to record view:', viewError)
        }
      } catch (err: any) {
        console.error('Failed to fetch candidate:', err)
        setError('Namizəd məlumatlarını yükləmək mümkün olmadı')
      } finally {
        setLoading(false)
      }
    }

    fetchCandidate()
  }, [id])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Yüklənir...</p>
        </div>
      </div>
    )
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Namizəd tapılmadı
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Axtardığınız namizəd mövcud deyil və ya silinib.
          </p>
          <Link to="/namizedler">
            <Button>Namizədlərə Qayıt</Button>
          </Link>
        </div>
      </div>
    )
  }

  const initials = `${candidate.firstName[0]}${candidate.lastName[0]}`

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/namizedler" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Namizədlərə qayıt</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar/Photo */}
              <div className="flex-shrink-0">
                {candidate.photoUrl ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-blue-100 dark:border-blue-900/40 shadow-lg">
                    <img
                      src={candidate.photoUrl}
                      alt={`${candidate.firstName} ${candidate.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900/40 shadow-lg">
                    <span className="text-4xl md:text-5xl font-bold text-white">
                      {initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Candidate Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {candidate.firstName} {candidate.lastName}
                      </h1>
                      <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40">
                        <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Peşəkar</span>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                      {candidate.profession}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{candidate.city}</span>
                      </div>
                      {candidate.email && (
                        <a href={`mailto:${candidate.email}`} className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Mail className="h-5 w-5 mr-2" />
                          <span>Email</span>
                        </a>
                      )}
                      {candidate.phone && (
                        <a href={`tel:${candidate.phone}`} className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Phone className="h-5 w-5 mr-2" />
                          <span>Telefon</span>
                        </a>
                      )}
                      {candidate.portfolio && (
                        <a 
                          href={candidate.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Globe className="h-5 w-5 mr-2" />
                          <span>Portfolio</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {candidate.videoUrl && (
                    <Button
                      onClick={() => setIsVideoOpen(true)}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Video CV İzlə
                    </Button>
                  )}
                  {candidate.cvUrl && (
                    <a href={candidate.cvUrl} download target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline">
                        <Download className="h-5 w-5 mr-2" />
                        CV Yüklə
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              {candidate.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Haqqında
                    </h2>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {candidate.bio}
                  </p>
                </motion.div>
              )}

              {/* Experience Section */}
              {candidate.experience && candidate.experience.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      İş Təcrübəsi
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {Array.isArray(candidate.experience) && candidate.experience.map((exp: any, index: number) => (
                      <div key={index} className="relative pl-8 pb-6 last:pb-0">
                        {/* Timeline Line */}
                        {index < candidate.experience.length - 1 && (
                          <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/40" />
                        )}
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-900 shadow-md" />
                        
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-900/40">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {exp.position}
                              </h3>
                              <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-900/40">
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Uğurlar:</p>
                              <ul className="space-y-2">
                                {Array.isArray(exp.achievements) && exp.achievements.map((achievement: any, idx: number) => (
                                  <li key={idx} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Education Section */}
              {candidate.education && candidate.education.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Təhsil
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {Array.isArray(candidate.education) && candidate.education.map((edu: any, index: number) => (
                      <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-900/40">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-1">
                          {edu.field}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {edu.university}
                        </p>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{edu.year}</span>
                        </div>
                        {edu.description && (
                          <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Certifications Section */}
              {candidate.certifications && candidate.certifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      Sertifikatlar
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Array.isArray(candidate.certifications) && candidate.certifications.map((cert: any, index: number) => (
                      <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/40">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Skills Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 sticky top-24"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Bacarıqlar
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills && Array.isArray(candidate.skills) && candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Languages Card */}
              {candidate.languages && candidate.languages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Dillər
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {Array.isArray(candidate.languages) && candidate.languages.map((lang: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {lang.name}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4">Əlaqə</h3>
                <div className="space-y-3">
                  {candidate.email && (
                    <a
                      href={`mailto:${candidate.email}`}
                      className="flex items-center space-x-3 hover:text-blue-100 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="text-sm break-all">{candidate.email}</span>
                    </a>
                  )}
                  {candidate.phone && (
                    <a
                      href={`tel:${candidate.phone}`}
                      className="flex items-center space-x-3 hover:text-blue-100 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{candidate.phone}</span>
                    </a>
                  )}
                  {candidate.portfolio && (
                    <a
                      href={candidate.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 hover:text-blue-100 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-sm">Portfolio</span>
                    </a>
                  )}
                </div>
                {candidate.cvUrl && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <a
                      href={candidate.cvUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-4 py-3 font-semibold transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      <span>CV Yüklə</span>
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {candidate.videoUrl && (
        <VideoPlayerModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl={candidate.videoUrl}
          title={`${candidate.firstName} ${candidate.lastName} - Video CV`}
        />
      )}
    </div>
  )
}

export default CandidateDetails
