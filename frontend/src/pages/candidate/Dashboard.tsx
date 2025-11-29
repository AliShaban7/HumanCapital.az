import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { 
  FileText, 
  Video, 
  Edit, 
  User, 
  Briefcase, 
  TrendingUp, 
  CheckCircle,
  Sparkles,
  Award,
  Eye
} from 'lucide-react'

interface CandidateProfile {
  id: string
  firstName: string
  lastName: string
  profession?: string
  city?: string
  videoUrl?: string
  cvUrl?: string
  skills?: string[]
  bio?: string
}

const CandidateDashboard = () => {
  const { user } = useAuthStore()
  const [candidate, setCandidate] = useState<CandidateProfile | null>(null)
  const [_loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    profileViews: 0,
    applications: 0,
    savedJobs: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me')
        if (response.data.candidate) {
          setCandidate(response.data.candidate)
          
          // Fetch stats
          const [applicationsRes, savedJobsRes, viewsRes] = await Promise.all([
            api.get('/applications/count').catch(() => ({ data: { count: 0 } })),
            api.get('/saved-jobs/count').catch(() => ({ data: { count: 0 } })),
            api.get(`/profile-views/count/${response.data.candidate.id}`).catch(() => ({ data: { count: 0 } })),
          ])
          
          setStats({
            applications: applicationsRes.data.count || 0,
            savedJobs: savedJobsRes.data.count || 0,
            profileViews: viewsRes.data.count || 0,
          })
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const userName = candidate 
    ? `${candidate.firstName} ${candidate.lastName}` 
    : user?.email?.split('@')[0] || 'İstifadəçi'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Sabahınız xeyir'
    if (hour < 18) return 'Günortanız xeyir'
    return 'Axşamınız xeyir'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-blue-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Welcome Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <span className="text-blue-100 text-sm font-semibold">
                        {getGreeting()}
                      </span>
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    >
                      Xoş gəlmisiniz,{' '}
                      <span className="text-yellow-300">{userName}</span>!
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-blue-100 text-lg md:text-xl max-w-2xl"
                    >
                      {candidate?.profession 
                        ? `${candidate.profession} kimi karyera yolunuzda uğurlar!`
                        : 'Karyera yolunuzda uğurlar! Profilinizi tamamlayın və yeni imkanlar tapın.'
                      }
                    </motion.p>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                      <User className="h-16 w-16 md:h-20 md:w-20 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Profil Baxışları</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.profileViews}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Müraciətlər</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.applications}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Saxlanılmış Vakansiyalar</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.savedJobs}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
      >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Sürətli Əməliyyatlar
            </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">CV Yüklə</CardTitle>
                  </div>
            </CardHeader>
            <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Video CV və PDF CV yükləyin və şirkətlərə özünüzü təqdim edin
              </p>
              <Link to="/pdf-cv-yukle">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF CV Yüklə
                </Button>
                  </Link>
            </CardContent>
          </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                      <Edit className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">Profilim</CardTitle>
                  </div>
            </CardHeader>
            <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Profil məlumatlarınızı redaktə edin və yeniləyin
              </p>
              <Link to="/profil-redakte">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Redaktə Et
                </Button>
              </Link>
            </CardContent>
          </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                      <Video className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl">Video CV</CardTitle>
                  </div>
            </CardHeader>
            <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {candidate?.videoUrl 
                      ? 'Video CV-nizi izləyin və ya yeniləyin'
                      : 'Video CV yükləyin və paylaşın'
                    }
              </p>
              {candidate?.videoUrl ? (
                <div className="space-y-2">
                  <Link to="/video-cv-yukle">
                    <Button variant="outline" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Video CV Redaktə Et
                    </Button>
                  </Link>
                  <a 
                    href={candidate.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Video className="h-4 w-4 mr-2" />
                      Video CV İzlə
                    </Button>
                  </a>
                </div>
              ) : (
                <Link to="/video-cv-yukle">
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Video CV Yüklə
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

          {/* Profile Status */}
          {candidate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Profil Statusu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${candidate.firstName ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={candidate.firstName ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                        Şəxsi məlumatlar {candidate.firstName ? 'tamamlı' : 'tamamlı deyil'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${candidate.profession ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={candidate.profession ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                        Peşə {candidate.profession ? 'göstərilmişdir' : 'göstərilməyib'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${candidate.videoUrl ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={candidate.videoUrl ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                        Video CV {candidate.videoUrl ? 'yüklənmişdir' : 'yüklənməyib'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${candidate.cvUrl ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={candidate.cvUrl ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                        PDF CV {candidate.cvUrl ? 'yüklənmişdir' : 'yüklənməyib'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard

