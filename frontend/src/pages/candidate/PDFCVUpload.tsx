import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, ArrowLeft, CheckCircle, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const PDFCVUpload = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [existingCv, setExistingCv] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me')
        if (response.data.candidate?.cvUrl) {
          setExistingCv(response.data.candidate.cvUrl)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('PDF fayl çox böyükdür. Maksimum 10MB olmalıdır.')
        return
      }
      if (file.type !== 'application/pdf') {
        setError('Yalnız PDF faylları qəbul olunur.')
        return
      }
      setCvFile(file)
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!cvFile) {
      setError('Zəhmət olmasa PDF CV seçin')
      return
    }

    setLoading(true)
    setError('')

    try {
      const userResponse = await api.get('/users/me')
      const existingCandidate = userResponse.data.candidate

      if (!existingCandidate) {
        setError('Zəhmət olmasa əvvəlcə profil məlumatlarınızı tamamlayın.')
        setLoading(false)
        setTimeout(() => {
          navigate('/profil-redakte')
        }, 2000)
        return
      }

      const formData = new FormData()
      formData.append('firstName', existingCandidate.firstName || '')
      formData.append('lastName', existingCandidate.lastName || '')
      if (existingCandidate.phone) formData.append('phone', existingCandidate.phone)
      if (existingCandidate.city) formData.append('city', existingCandidate.city)
      if (existingCandidate.profession) formData.append('profession', existingCandidate.profession)
      if (existingCandidate.bio) formData.append('bio', existingCandidate.bio)
      if (existingCandidate.portfolio) formData.append('portfolio', existingCandidate.portfolio)
      if (existingCandidate.skills && Array.isArray(existingCandidate.skills)) {
        formData.append('skills', JSON.stringify(existingCandidate.skills))
      }
      if (existingCandidate.videoUrl) {
        // Keep existing video
        const videoBlob = await fetch(existingCandidate.videoUrl).then(r => r.blob())
        const videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' })
        formData.append('video', videoFile)
      }
      formData.append('cv', cvFile)

      await api.post('/candidates/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/namized/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Error uploading CV:', err)
      setError(err.response?.data?.message || 'CV yüklənərkən xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/namized/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri qayıt
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              PDF CV Yüklə
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              PDF formatında CV-nizi yükləyin
            </p>
          </div>

          {/* Upload Area */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>PDF CV Yüklə</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {existingCv && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Mövcud CV</p>
                          <a
                            href={existingCv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            CV-ni görüntülə
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    PDF formatında CV yükləyin (max 10MB)
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                    Yalnız PDF faylları qəbul olunur
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        PDF CV Seç
                      </span>
                    </Button>
                  </label>
                </div>

                {cvFile && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{cvFile.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCvFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !cvFile}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Yüklənir...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Uğurla Yükləndi!
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      CV Yüklə
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {success && (
            <Card className="mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-600 dark:text-green-400">
                    PDF CV uğurla yükləndi! Dashboard-a yönləndirilirsiniz...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PDFCVUpload

