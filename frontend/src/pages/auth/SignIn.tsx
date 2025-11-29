import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'
import api from '../../lib/api'
import { Shield, Users, Sparkles } from 'lucide-react'

const SignIn = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', formData)
      const { user, token } = response.data
      setAuth(user, token)
      navigate(user.role === 'CANDIDATE' ? '/namized/dashboard' : '/sirket/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Giriş zamanı xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-purple-400/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59,130,246,0.7) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59,130,246,0.7) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
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
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>HumanCapital hesabı</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Video-CV platformasına <span className="text-blue-600">daxil olun</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Namizəd profilləri, video CV-lər və şirkət panelinə sürətli giriş.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Users, label: '3K+ namizəd' },
                { icon: Shield, label: 'Təhlükəsiz giriş' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center space-x-3 bg-white/80 dark:bg-gray-900/50 rounded-2xl border border-white/60 dark:border-gray-800 p-4 shadow-sm"
                >
                  <item.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-800 dark:text-gray-200 font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Hesabınız yoxdur?
              <Link to="/qeydiyyat" className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline">
                Qeydiyyatdan keçin
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-[0_30px_80px_rgba(15,23,42,0.15)] p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Giriş edin</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Hesab məlumatlarınızı daxil edin
                </p>
              </div>
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
                  {error}
                </div>
              )}
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
              <Button type="submit" className="w-full h-12 text-base rounded-2xl" disabled={loading}>
                {loading ? 'Giriş edilir...' : 'Giriş Et'}
              </Button>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Şifrənizi unutdunuz?
                <button type="button" className="ml-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Bərpa edin
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignIn

