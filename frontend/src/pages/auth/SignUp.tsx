import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'
import api from '../../lib/api'
import { Sparkles, Users, Building2, CheckCircle } from 'lucide-react'

const SignUp = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CANDIDATE' as 'CANDIDATE' | 'COMPANY',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Şifrələr uyğun gəlmir')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      const { user, token } = response.data
      setAuth(user, token)
      navigate(user.role === 'CANDIDATE' ? '/namized/dashboard' : '/sirket/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Qeydiyyat zamanı xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-blue-400/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(120deg, rgba(79,70,229,0.6) 1px, transparent 1px),
              linear-gradient(240deg, rgba(14,165,233,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>HumanCapital qeydiyyatı</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Bir neçə addımda <span className="text-blue-600">hesab yaradın</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Namizəd və ya şirkət olaraq video əsaslı iş platformamıza qoşulun.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Users, title: 'Namizəd hesabı', desc: 'Video CV, karyera dəstəyi' },
                { icon: Building2, title: 'Şirkət hesabı', desc: 'Vakansiyalar, namizəd hovuzu' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-white/85 dark:bg-gray-900/60 border border-white/70 dark:border-gray-800 p-4 shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Artıq hesabınız var?
              <Link to="/giris" className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline">
                Giriş edin
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-[0_30px_80px_rgba(15,23,42,0.2)] p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Qeydiyyat</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Əvvəlcə hesab növünü seçin, sonra məlumatları daxil edin
                </p>
              </div>
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rol seçimi</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'CANDIDATE', title: 'Namizəd', desc: 'İş axtarıram' },
                    { value: 'COMPANY', title: 'Şirkət', desc: 'İşçi axtarıram' },
                  ].map((role) => (
                    <button
                      type="button"
                      key={role.value}
                      onClick={() => setFormData({ ...formData, role: role.value as 'CANDIDATE' | 'COMPANY' })}
                      className={`rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                        formData.role === role.value
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{role.title}</span>
                        {formData.role === role.value && <CheckCircle className="h-4 w-4 text-blue-600" />}
                      </div>
                      <p className="text-sm text-gray-500">{role.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="email@example.com"
                  className="h-12 rounded-2xl"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Şifrə</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="h-12 rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Şifrəni Təsdiqlə</label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="h-12 rounded-2xl"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-base rounded-2xl" disabled={loading}>
                {loading ? 'Qeydiyyat edilir...' : 'Qeydiyyatdan Keç'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

