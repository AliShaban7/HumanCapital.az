import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { 
  Building2, 
  Plus, 
  Briefcase, 
  Users, 
  CheckCircle,
  Clock,
  X,
  Eye,
  Download,
  Video,
  Sparkles,
  Edit,
  BarChart3,
  Calendar,
  MapPin,
  DollarSign
} from 'lucide-react'

interface CompanyProfile {
  id: string
  name: string
  description?: string
  city?: string
  logo?: string
  website?: string
}

interface Job {
  id: string
  title: string
  category: string
  city: string
  salary?: string
  isActive: boolean
  createdAt: string
  _count: {
    applications: number
    savedBy: number
  }
}

interface Application {
  id: string
  status: string
  createdAt: string
  candidate: {
    id: string
    firstName: string
    lastName: string
    profession?: string
    city?: string
    cvUrl?: string
    videoUrl?: string
    skills?: string[]
  }
  job: {
    id: string
    title: string
  }
}

const CompanyDashboard = () => {
  const { user } = useAuthStore()
  const [company, setCompany] = useState<CompanyProfile | null>(null)
  const [_loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  })
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [selectedTab, setSelectedTab] = useState<'overview' | 'jobs' | 'applications'>('overview')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users/me')
        if (response.data.company) {
          setCompany(response.data.company)
        }

        // Fetch stats
        const statsRes = await api.get('/company/stats')
        setStats(statsRes.data)

        // Fetch recent jobs
        const jobsRes = await api.get('/company/my-jobs')
        setRecentJobs(jobsRes.data.slice(0, 5))

        // Fetch recent applications
        const appsRes = await api.get('/company/applications')
        setRecentApplications(appsRes.data.slice(0, 10))
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  const companyName = company?.name || user?.email?.split('@')[0] || 'Şirkət'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Sabahınız xeyir'
    if (hour < 18) return 'Günortanız xeyir'
    return 'Axşamınız xeyir'
  }

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    try {
      await api.patch(`/company/applications/${applicationId}/status`, { status })
      // Refresh data
      const appsRes = await api.get('/company/applications')
      setRecentApplications(appsRes.data.slice(0, 10))
      const statsRes = await api.get('/company/stats')
      setStats(statsRes.data)
    } catch (error: any) {
      console.error('Failed to update status:', error)
      alert(error.response?.data?.message || 'Status yenilənərkən xəta baş verdi')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Qəbul edildi'
      case 'rejected':
        return 'Rədd edildi'
      default:
        return 'Gözləyir'
    }
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
            <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white overflow-hidden">
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
                      <span className="text-purple-100 text-sm font-semibold">
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
                      <span className="text-yellow-300">{companyName}</span>!
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-purple-100 text-lg md:text-xl max-w-2xl"
                    >
                      İş elanlarınızı idarə edin, namizədləri görüntüləyin və ən yaxşı komandanı qurun.
                    </motion.p>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                      <Building2 className="h-16 w-16 md:h-20 md:w-20 text-white" />
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ümumi Elanlar</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalJobs}</p>
                    <p className="text-xs text-gray-500 mt-1">{stats.activeJobs} aktiv</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Müraciətlər</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalApplications}</p>
                    <p className="text-xs text-gray-500 mt-1">{stats.pendingApplications} gözləyir</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Qəbul Edilənlər</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.acceptedApplications}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Uğurlu</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gözləyənlər</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingApplications}</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Nəzərdən keçirilməlidir</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'overview', label: 'Ümumi Baxış', icon: BarChart3 },
                { id: 'jobs', label: 'İş Elanları', icon: Briefcase },
                { id: 'applications', label: 'Müraciətlər', icon: Users },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors border-b-2 ${
                      selectedTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Sürətli Əməliyyatlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                          <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <CardTitle className="text-xl">Yeni Elan</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Yeni iş elanı yaradın və namizədlərə çatın
                      </p>
                      <Link to="/elan-paylas">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Elan Yarat
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
                        <CardTitle className="text-xl">Profil Redaktə</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Şirkət məlumatlarınızı yeniləyin
                      </p>
                      <Link to="/sirket/profil-redakte">
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
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-xl">Namizədlər</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Bütün namizədləri görüntüləyin və axtarın
                      </p>
                      <Link to="/namizedler">
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Namizədlərə Bax
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Recent Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Son Elanlar
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedTab('jobs')}>
                    Hamısına Bax
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentJobs.length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-8 text-center">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Hələ heç bir elan yaratmamısınız
                        </p>
                        <Link to="/elan-paylas" className="mt-4 inline-block">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            İlk Elanı Yarat
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    recentJobs.map((job) => (
                      <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {job.title}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  job.isActive 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                  {job.isActive ? 'Aktiv' : 'Qeyri-aktiv'}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.city}
                                </div>
                                {job.salary && (
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {job.salary}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {job._count.applications} müraciət
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {new Date(job.createdAt).toLocaleDateString('az-AZ', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                            <Link to={`/is-elanlari/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Bax
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Recent Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Son Müraciətlər
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedTab('applications')}>
                    Hamısına Bax
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentApplications.length === 0 ? (
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-8 text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Hələ heç bir müraciət yoxdur
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    recentApplications.slice(0, 5).map((application) => (
                      <Card key={application.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {application.candidate.firstName} {application.candidate.lastName}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                                  {getStatusLabel(application.status)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {application.job.title}
                              </p>
                              {application.candidate.profession && (
                                <p className="text-sm text-gray-500 mb-3">
                                  {application.candidate.profession}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(application.createdAt).toLocaleDateString('az-AZ')}
                                </div>
                                {application.candidate.city && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {application.candidate.city}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 ml-4">
                              <Link to={`/namizedler/${application.candidate.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Profil
                                </Button>
                              </Link>
                              {application.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleStatusUpdate(application.id, 'accepted')}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                    onClick={() => handleStatusUpdate(application.id, 'rejected')}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Jobs Tab */}
          {selectedTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bütün İş Elanları
                </h2>
                <Link to="/elan-paylas">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Elan
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentJobs.length === 0 ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Heç bir elan yoxdur
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        İlk iş elanınızı yaradın və namizədlərə çatın
                      </p>
                      <Link to="/elan-paylas">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Plus className="h-5 w-5 mr-2" />
                          İlk Elanı Yarat
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  recentJobs.map((job) => (
                    <Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {job.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                job.isActive 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {job.isActive ? 'Aktiv' : 'Qeyri-aktiv'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.city}
                              </div>
                              {job.salary && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {job.salary}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.category}
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Users className="h-4 w-4" />
                                <span className="font-semibold">{job._count.applications}</span>
                                <span>müraciət</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <Calendar className="h-4 w-4" />
                                {new Date(job.createdAt).toLocaleDateString('az-AZ', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 ml-4">
                            <Link to={`/is-elanlari/${job.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Bax
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Redaktə
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {selectedTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bütün Müraciətlər
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTab === 'applications' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTab('applications')}
                  >
                    Hamısı ({stats.totalApplications})
                  </Button>
                  <Button variant="outline" size="sm">
                    Gözləyir ({stats.pendingApplications})
                  </Button>
                  <Button variant="outline" size="sm">
                    Qəbul ({stats.acceptedApplications})
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {recentApplications.length === 0 ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Heç bir müraciət yoxdur
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        İş elanlarınız yayımlandıqda müraciətlər burada görünəcək
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  recentApplications.map((application) => (
                    <Card key={application.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                  {application.candidate.firstName[0]}{application.candidate.lastName[0]}
                                </span>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {application.candidate.firstName} {application.candidate.lastName}
                                </h3>
                                {application.candidate.profession && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {application.candidate.profession}
                                  </p>
                                )}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                                {getStatusLabel(application.status)}
                              </span>
                            </div>
                            <div className="ml-15 space-y-2">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">İş:</span> {application.job.title}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(application.createdAt).toLocaleDateString('az-AZ', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </div>
                                {application.candidate.city && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {application.candidate.city}
                                  </div>
                                )}
                              </div>
                              {application.candidate.skills && application.candidate.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {application.candidate.skills.slice(0, 5).map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link to={`/namizedler/${application.candidate.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                Profilə Bax
                              </Button>
                            </Link>
                            {application.candidate.cvUrl && (
                              <a
                                href={application.candidate.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                              >
                                <Button variant="outline" size="sm" className="w-full">
                                  <Download className="h-4 w-4 mr-2" />
                                  CV Endir
                                </Button>
                              </a>
                            )}
                            {application.candidate.videoUrl && (
                              <a
                                href={application.candidate.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                              >
                                <Button variant="outline" size="sm" className="w-full">
                                  <Video className="h-4 w-4 mr-2" />
                                  Video CV
                                </Button>
                              </a>
                            )}
                            {application.status === 'pending' && (
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleStatusUpdate(application.id, 'accepted')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Qəbul
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                  onClick={() => handleStatusUpdate(application.id, 'rejected')}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Rədd
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
