import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, DollarSign, Briefcase, Calendar, Building2, ArrowLeft, Send, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getCompanyLogo } from '@/lib/companyLogos'
import { useAuthStore } from '../store/authStore'
import { useState, useEffect } from 'react'
import api from '../lib/api'

const JobDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuthStore()
  const [applied, setApplied] = useState(false)
  const [showLoginMessage, setShowLoginMessage] = useState(false)

  useEffect(() => {
    // Check if user came from apply button
    if (location.state?.apply) {
      if (isAuthenticated() && user?.role === 'CANDIDATE') {
        handleApply()
      } else {
        setShowLoginMessage(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  const handleApply = async () => {
    if (!isAuthenticated()) {
      setShowLoginMessage(true)
      return
    }

    if (user?.role !== 'CANDIDATE') {
      alert('Yalnız namizədlər müraciət edə bilər')
      return
    }

    if (!id) {
      alert('İş elanı tapılmadı')
      return
    }

    try {
      await api.post(`/applications/apply/${id}`)
      setApplied(true)
      // Refresh dashboard stats
      window.dispatchEvent(new Event('refresh-stats'))
    } catch (err: any) {
      console.error('Error applying:', err)
      const errorMessage = err.response?.data?.message || 'Müraciət zamanı xəta baş verdi'
      
      if (err.response?.status === 404 && errorMessage.includes('Candidate profile')) {
        alert('Zəhmət olmasa əvvəlcə profil məlumatlarınızı tamamlayın. Profil yaratmaq üçün dashboard-a keçin.')
        setTimeout(() => {
          navigate('/namized/dashboard')
        }, 2000)
      } else if (err.response?.status === 400 && errorMessage.includes('Already applied')) {
        alert('Bu işə artıq müraciət etmisiniz.')
        setApplied(true)
      } else {
        alert(errorMessage)
      }
    }
  }

  // Mock data - will be replaced with API
  const job = {
    id: id || '1',
    title: 'Frontend Developer',
    company: 'Azercell',
    city: 'Bakı',
    salary: '2000-3000 AZN',
    category: 'IT',
    experience: '2-5 il',
    description: 'Frontend developer vəzifəsi üçün təcrübəli mütəxəssis axtarırıq.',
    requirements: 'React, TypeScript, HTML, CSS bilikləri tələb olunur.',
    responsibilities: 'Frontend inkişafı, komanda ilə işləmə, kod yazma.',
    createdAt: new Date().toISOString(),
  }

  const companyLogo = getCompanyLogo(job.company)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link to="/is-elanlari" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Geri qayıt
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            {companyLogo ? (
              <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-white border-2 border-blue-100 p-3 flex items-center justify-center">
                <img
                  src={companyLogo}
                  alt={job.company}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-gray-900">{job.title}</h1>
              <p className="text-blue-600 font-semibold text-lg">{job.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.city}</span>
            </div>
            {job.salary && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{job.salary}</span>
              </div>
            )}
            {job.experience && (
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                <span>{job.experience}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">İş Haqqında</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Vəzifələr</h2>
                <p className="text-muted-foreground leading-relaxed">{job.responsibilities}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Tələblər</h2>
                <p className="text-muted-foreground leading-relaxed">{job.requirements}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {showLoginMessage && (
                  <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                      Müraciət etmək üçün giriş etməlisiniz
                    </p>
                    <Button
                      onClick={() => navigate('/giris')}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                      size="sm"
                    >
                      Giriş Et
                    </Button>
                  </div>
                )}
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleApply}
                  disabled={applied}
                >
                  {applied ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Müraciət Edildi
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Müraciət Et
                    </>
                  )}
                </Button>
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground">Kateqoriya</span>
                    <p className="font-medium">{job.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Şəhər</span>
                    <p className="font-medium">{job.city}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <span className="text-sm text-muted-foreground">Maaş</span>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default JobDetails

