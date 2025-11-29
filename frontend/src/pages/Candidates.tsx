import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, Users, MapPin, Briefcase, TrendingUp, X, 
  Award, Sparkles, ArrowRight, Video, CheckCircle, Star, Lock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import CandidateCard from '../components/CandidateCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import AdSlot from '../components/AdSlot'
import api from '../lib/api'

interface Candidate {
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

const Candidates = () => {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedProfession, setSelectedProfession] = useState('')
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cities = ['Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Lənkəran', 'Şəki']
  const professions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Marketing Manager',
    'Product Manager',
    'Data Analyst',
    'DevOps Engineer',
    'Mobile Developer',
  ]

  const experienceLevels = [
    '0-1 il • Junior',
    '1-3 il • Middle',
    '3-5 il • Mid-Senior',
    '5+ il • Senior',
  ]

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const params: any = {}
        if (selectedCity) params.city = selectedCity
        if (selectedProfession) params.profession = selectedProfession
        if (search) params.search = search

        const response = await api.get('/candidates/list', { params })
        setCandidates(response.data)
        setError('')
      } catch (err: any) {
        console.error('Failed to fetch candidates:', err)
        setError('Namizədləri yükləmək mümkün olmadı')
        setCandidates([])
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [selectedCity, selectedProfession, search])


  // Filter candidates (additional client-side filtering if needed)
  const filteredCandidates = candidates.filter((candidate) => {
    // Note: Most filtering is done server-side via API params
    // This is for any additional client-side filtering
    const matchesSearch = 
      !search || 
      `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      candidate.profession?.toLowerCase().includes(search.toLowerCase()) ||
      candidate.city?.toLowerCase().includes(search.toLowerCase())
    const matchesCity = !selectedCity || candidate.city === selectedCity
    const matchesProfession = !selectedProfession || candidate.profession === selectedProfession
    return matchesSearch && matchesCity && matchesProfession
  })

  const activeFiltersCount = [selectedCity, selectedProfession].filter(Boolean).length

  const stats = [
    { label: 'Peşəkar Namizədlər', value: candidates.length, icon: Users },
    { label: 'Video CV-lər', value: candidates.filter(c => c.videoUrl).length, icon: Video },
    { label: 'Şəhərlər', value: new Set(candidates.map(c => c.city).filter(Boolean)).size, icon: MapPin },
    { label: 'Peşələr', value: new Set(candidates.map(c => c.profession).filter(Boolean)).size, icon: Briefcase },
  ]

  const clearFilters = () => {
    setSelectedCity('')
    setSelectedProfession('')
    setSelectedExperienceLevel('')
    setSearch('')
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
        {/* Sophisticated Background Layers */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
          
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/30 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Animated Blur Orbs */}
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
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.15, 0.35, 0.15],
              y: [0, -70, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
          />
          
          {/* Floating Geometric Shapes */}
          {[...Array(8)].map((_, i) => {
            const sizes = [100, 140, 120, 160, 110, 130, 90, 150]
            const positions = [
              { top: '8%', left: '4%' },
              { top: '18%', right: '6%' },
              { bottom: '12%', left: '10%' },
              { bottom: '22%', right: '8%' },
              { top: '45%', left: '2%' },
              { top: '55%', right: '4%' },
              { bottom: '35%', left: '6%' },
              { bottom: '45%', right: '3%' },
            ]
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  ...positions[i],
                  width: `${sizes[i]}px`,
                  height: `${sizes[i]}px`,
                }}
                animate={{
                  y: [0, -35, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 9 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <div className="w-full h-full border-2 border-blue-300/20 dark:border-blue-600/20 rounded-lg rotate-45" />
              </motion.div>
            )
          })}
          
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => {
              const icons = [Users, Video, Award, CheckCircle, Sparkles, Star, TrendingUp]
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${3 + (i % 5) * 18}%`,
                    top: `${8 + Math.floor(i / 5) * 30}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0.05, 0.18, 0.05],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 7 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="h-8 w-8 md:h-12 md:w-12 text-blue-400/30 dark:text-blue-500/20" />
                </motion.div>
              )
            })}
          </div>
          
          {/* Memojis */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { emoji: '👨‍💼', position: { top: '12%', right: '10%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '👩‍💼', position: { top: '22%', left: '5%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
              { emoji: '🎓', position: { bottom: '18%', right: '8%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
              { emoji: '💡', position: { bottom: '28%', left: '6%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '⭐', position: { top: '50%', right: '4%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
            ].map((memoji, i) => (
              <div
                key={i}
                className={`absolute ${memoji.size} rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg flex items-center justify-center`}
                style={memoji.position}
              >
                <span className="text-2xl md:text-4xl">{memoji.emoji}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-8"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
              <Users className="h-4 w-4" />
              <span>Namizədlər</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Peşəkar <span className="text-blue-600">namizədlər</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Video CV ilə özünü təqdim edən peşəkar namizədlərlə tanış olun. 
              Hər bir namizəd öz bacarıqlarını, təcrübəsini və potensialını video formatda sizə təqdim edir.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Ad, soyad, peşə və ya şəhər axtar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filtrlər</span>
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Bütün filtrləri təmizlə
                  </button>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {filteredCandidates.length} namizəd tapıldı
                </span>
              </div>
            </div>
          </motion.div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-6xl mx-auto mb-8"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Şəhər
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      <option value="">Bütün şəhərlər</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Profession Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Peşə
                    </label>
                    <select
                      value={selectedProfession}
                      onChange={(e) => setSelectedProfession(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      <option value="">Bütün peşələr</option>
                      {professions.map((profession) => (
                        <option key={profession} value={profession}>
                          {profession}
                        </option>
                      ))}
                    </select>
                  </div>
                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Təcrübə səviyyəsi
                  </label>
                  <select
                    value={selectedExperienceLevel}
                    onChange={(e) => setSelectedExperienceLevel(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="">Bütün səviyyələr</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 mb-2">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ad Banner - After Hero Section */}
      <section className="py-6 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AdSlot
              position="candidates-hero"
              format="banner"
              size="728x90"
              priority="standard"
              title="Təlim Proqramları"
              description="Karyeranızı inkişaf etdirin və yeni bacarıqlar əldə edin"
              className="hidden md:block"
            />
            <AdSlot
              position="candidates-hero-mobile"
              format="banner"
              size="320x100"
              priority="standard"
              title="Təlim Proqramları"
              className="block md:hidden"
            />
          </div>
        </div>
      </section>

      {/* Candidates Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCity && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {selectedCity}
                  <button
                    onClick={() => setSelectedCity('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedProfession && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {selectedProfession}
                  <button
                    onClick={() => setSelectedProfession('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedExperienceLevel && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {selectedExperienceLevel}
                  <button
                    onClick={() => setSelectedExperienceLevel('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Profilləri görmək üçün giriş edin
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Namizədlərin video CV-lərini və ətraflı məlumatlarını görmək üçün sistemə giriş etməlisiniz.
                </p>
                <Link to="/giris">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Giriş Et
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Namizədlər yüklənir...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Results */}
          {!loading && !error && filteredCandidates.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Namizəd tapılmadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Axtarış parametrlərinizi dəyişdirin və ya filtrləri təmizləyin
              </p>
              <Button onClick={clearFilters}>
                Filtrləri Təmizlə
              </Button>
            </div>
          ) : !loading && !error && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Peşəkar Namizədlər
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredCandidates.length} namizəd
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCandidates.map((candidate, index) => {
                  // Insert ad after every 4 candidates
                  const shouldShowAd = (index + 1) % 4 === 0 && index > 0
                  return (
                    <>
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <CandidateCard {...candidate} />
                      </motion.div>
                      {shouldShowAd && (
                        <motion.div
                          key={`ad-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="md:col-span-2 lg:col-span-4"
                        >
                          <AdSlot
                            position={`candidates-infeed-${Math.floor(index / 4)}`}
                            format="card"
                            priority="standard"
                            title="Karyera İnkişafı"
                            description="Peşəkar təlim proqramları və sertifikatlar"
                          />
                        </motion.div>
                      )}
                    </>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-12 md:pt-16 pb-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => {
                const icons = [Users, Video, Award, Sparkles, CheckCircle, Star, TrendingUp, Briefcase]
                const Icon = icons[i % icons.length]
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${15 + Math.floor(i / 4) * 35}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-white/20" />
                  </motion.div>
                )
              })}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Video CV-nizi yükləyin
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Özünüzü video formatda təqdim edin və şirkətlər üçün daha əlçatan olun. 
                Video CV ilə iş imkanlarınızı artırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cv-yukle">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                    Video CV Yüklə
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/qeydiyyat">
                  <button className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-xl font-medium transition-all duration-200 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg">
                    Pulsuz Qeydiyyat
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
        </div>
      </div>
    </div>
  )
}

export default Candidates
