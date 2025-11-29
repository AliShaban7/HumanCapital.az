import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Building2, Globe, MapPin, Phone, Mail, Upload, X, CheckCircle, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const CompanyProfileEdit = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    city: '',
    phone: '',
    email: '',
  })

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await api.get('/users/me')
        if (response.data.company) {
          const company = response.data.company
          setFormData({
            name: company.name || '',
            description: company.description || '',
            website: company.website || '',
            city: company.city || '',
            phone: company.phone || '',
            email: company.email || '',
          })
          
          if (company.logo) {
            setLogoPreview(company.logo)
          }
        }
      } catch (error) {
        console.error('Failed to fetch company data:', error)
      }
    }

    if (user) {
      fetchCompanyData()
    }
  }, [user])

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Logo fayl çox böyükdür. Maksimum 5MB olmalıdır.')
        return
      }
      if (!file.type.startsWith('image/')) {
        setError('Yalnız şəkil faylları qəbul olunur.')
        return
      }
      setLogoFile(file)
      const url = URL.createObjectURL(file)
      setLogoPreview(url)
      setError('')
    }
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      if (formData.description) formDataToSend.append('description', formData.description)
      if (formData.website) formDataToSend.append('website', formData.website)
      if (formData.city) formDataToSend.append('city', formData.city)
      if (formData.phone) formDataToSend.append('phone', formData.phone)
      if (formData.email) formDataToSend.append('email', formData.email)
      
      if (logoFile) {
        formDataToSend.append('logo', logoFile)
      }

      await api.post('/companies/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/sirket/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      const errorMessage = err.response?.data?.message || 'Profil yenilənərkən xəta baş verdi'
      const errorDetails = err.response?.data?.errors
      
      if (errorDetails && Array.isArray(errorDetails)) {
        const detailedErrors = errorDetails.map((e: any) => `${e.path.join('.')}: ${e.message}`).join('\n')
        setError(`${errorMessage}\n\n${detailedErrors}`)
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/30 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
        
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.25, 0.45, 0.25],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/sirket/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri qayıt
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Şirkət Profilini Redaktə Et
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Şirkət məlumatlarınızı yeniləyin və namizədlərə daha yaxşı təqdim edin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Logo */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Şirkət Loqosu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {logoPreview && (
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
                        <img
                          src={logoPreview}
                          alt="Company logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                    <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Şirkət loqosu yükləyin (PNG, JPG, max 5MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoSelect}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Logo Seç
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Şirkət Məlumatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Şirkət Adı *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Məsələn: Azercell"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Şirkət Haqqında
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Şirkətiniz haqqında qısa məlumat..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Veb Sayt
                    </label>
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Şəhər
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bakı"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+994 12 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@company.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Saxlanılır...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Dəyişiklikləri Saxla
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/sirket/dashboard')}
                size="lg"
              >
                Ləğv Et
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-4">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            {success && (
              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-600 dark:text-green-400">
                      Profil uğurla yeniləndi! Dashboard-a yönləndirilirsiniz...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyProfileEdit

