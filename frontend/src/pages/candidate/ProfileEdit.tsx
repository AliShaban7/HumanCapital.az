import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, GraduationCap, Briefcase, Plus, X, Trash2, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface Education {
  degree: string
  field: string
  university: string
  year: string
  description?: string
}

interface Experience {
  position: string
  company: string
  period: string
  description?: string
}

const ProfileEdit = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    profession: '',
    bio: '',
    portfolio: '',
    skills: [] as string[],
  })

  const [education, setEducation] = useState<Education[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me')
        if (response.data.candidate) {
          const candidate = response.data.candidate
          setFormData({
            firstName: candidate.firstName || '',
            lastName: candidate.lastName || '',
            phone: candidate.phone || '',
            city: candidate.city || '',
            profession: candidate.profession || '',
            bio: candidate.bio || '',
            portfolio: candidate.portfolio || '',
            skills: candidate.skills || [],
          })
          
          if (candidate.education) {
            try {
              const edu = typeof candidate.education === 'string' 
                ? JSON.parse(candidate.education) 
                : candidate.education
              setEducation(Array.isArray(edu) ? edu : [])
            } catch {
              setEducation([])
            }
          }
          
          if (candidate.experience) {
            try {
              const exp = typeof candidate.experience === 'string'
                ? JSON.parse(candidate.experience)
                : candidate.experience
              setExperience(Array.isArray(exp) ? exp : [])
            } catch {
              setExperience([])
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleAddEducation = () => {
    setEducation([...education, { degree: '', field: '', university: '', year: '', description: '' }])
  }

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleUpdateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const handleAddExperience = () => {
    setExperience([...experience, { position: '', company: '', period: '', description: '' }])
  }

  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const handleUpdateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      if (formData.phone) formDataToSend.append('phone', formData.phone)
      if (formData.city) formDataToSend.append('city', formData.city)
      if (formData.profession) formDataToSend.append('profession', formData.profession)
      if (formData.bio) formDataToSend.append('bio', formData.bio)
      if (formData.portfolio) formDataToSend.append('portfolio', formData.portfolio)
      formDataToSend.append('skills', JSON.stringify(formData.skills))

      // Get existing files to preserve them
      const userResponse = await api.get('/users/me')
      const existingCandidate = userResponse.data.candidate

      if (existingCandidate?.videoUrl) {
        const videoBlob = await fetch(existingCandidate.videoUrl).then(r => r.blob())
        const videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' })
        formDataToSend.append('video', videoFile)
      }

      if (existingCandidate?.cvUrl) {
        const cvBlob = await fetch(existingCandidate.cvUrl).then(r => r.blob())
        const cvFile = new File([cvBlob], 'cv.pdf', { type: 'application/pdf' })
        formDataToSend.append('cv', cvFile)
      }

      await api.post('/candidates/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Update education and experience separately if needed
      // (This would require a separate endpoint or updating the schema)

      setSuccess(true)
      setTimeout(() => {
        navigate('/namized/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.response?.data?.message || 'Profil yenilənərkən xəta baş verdi')
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
          className="max-w-4xl mx-auto"
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
              Profil Redaktə Et
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Profil məlumatlarınızı yeniləyin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Şəxsi Məlumatlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad *</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Soyad *</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Şəhər</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Peşə</label>
                  <Input
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="Məsələn: Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Haqqında</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Özünüz haqqında qısa məlumat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio</label>
                  <Input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    placeholder="https://portfolio.example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bacarıqlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Bacarıq əlavə et"
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    <Plus className="h-4 w-4 mr-2" />
                    Əlavə Et
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Təhsil
                  </CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddEducation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Əlavə Et
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Təhsil #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEducation(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Dərəcə (məs: Bakalavr)"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                      />
                      <Input
                        placeholder="İxtisas"
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(index, 'field', e.target.value)}
                      />
                      <Input
                        placeholder="Universitet"
                        value={edu.university}
                        onChange={(e) => handleUpdateEducation(index, 'university', e.target.value)}
                      />
                      <Input
                        placeholder="İl (məs: 2015-2019)"
                        value={edu.year}
                        onChange={(e) => handleUpdateEducation(index, 'year', e.target.value)}
                      />
                    </div>
                    <textarea
                      placeholder="Əlavə məlumat"
                      value={edu.description || ''}
                      onChange={(e) => handleUpdateEducation(index, 'description', e.target.value)}
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    />
                  </div>
                ))}
                {education.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Təhsil məlumatı yoxdur. Əlavə etmək üçün düyməyə basın.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Təcrübə
                  </CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddExperience}>
                    <Plus className="h-4 w-4 mr-2" />
                    Əlavə Et
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Təcrübə #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Vəzifə"
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(index, 'position', e.target.value)}
                      />
                      <Input
                        placeholder="Şirkət"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                      />
                      <Input
                        placeholder="Dövr (məs: 2020 - 2023)"
                        value={exp.period}
                        onChange={(e) => handleUpdateExperience(index, 'period', e.target.value)}
                        className="md:col-span-2"
                      />
                    </div>
                    <textarea
                      placeholder="Vəzifə təsviri"
                      value={exp.description || ''}
                      onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm"
                    />
                  </div>
                ))}
                {experience.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Təcrübə məlumatı yoxdur. Əlavə etmək üçün düyməyə basın.
                  </p>
                )}
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
                onClick={() => navigate('/namized/dashboard')}
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

export default ProfileEdit

