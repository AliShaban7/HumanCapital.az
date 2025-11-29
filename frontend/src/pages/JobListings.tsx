import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, MapPin, Briefcase, TrendingUp, X, 
  Code, Palette, Megaphone, Settings, Banknote, Wrench, Smartphone,
  ArrowRight, Sparkles, CheckCircle, Bell, Send, Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import JobCard from '../components/JobCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import AdSlot from '../components/AdSlot'
import api from '../lib/api'

interface Job {
  id: string
  title: string
  company?: {
    name: string
    logo?: string
  }
  city: string
  salary?: string
  category: string
  experience?: string
  createdAt: string
  description?: string
}

const JobListings = () => {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [selectedSalary, setSelectedSalary] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Common job titles and search suggestions
  const searchSuggestions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Marketing Manager',
    'Sales Manager',
    'HR Manager',
    'Product Manager',
    'Data Analyst',
    'DevOps Engineer',
    'Mobile Developer',
    'Web Developer',
    'Software Engineer',
    'Project Manager',
    'Business Analyst',
    'Accountant',
    'Financial Analyst',
    'Content Writer',
    'Social Media Manager',
    'Customer Service',
    'IT Support',
    'Network Administrator',
    'System Administrator',
    'QA Engineer',
    'Test Engineer',
    'Security Specialist',
    'Database Administrator',
    'Cloud Engineer',
    'Machine Learning Engineer',
  ]
  
  // Filter suggestions based on search query
  const filteredSuggestions = search.trim().length > 0
    ? searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)
    : []
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }
  
  // Handle input focus
  const handleInputFocus = () => {
    if (search.trim().length > 0) {
      setShowSuggestions(true)
    }
  }
  
  // Handle input blur (with delay to allow clicks)
  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const cities = ['Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Lənkəran', 'Şəki']
  const categories = [
    { value: 'IT', label: 'IT', icon: Code },
    { value: 'Design', label: 'Dizayn', icon: Palette },
    { value: 'Marketing', label: 'Marketinq', icon: Megaphone },
    { value: 'İdarəetmə', label: 'İdarəetmə', icon: Settings },
    { value: 'Maliyyə', label: 'Maliyyə', icon: Banknote },
    { value: 'Mühəndislik', label: 'Mühəndislik', icon: Wrench },
    { value: 'Rəqəmsal', label: 'Rəqəmsal', icon: Smartphone },
  ]
  const experienceLevels = ['1-2 il', '2-3 il', '3-5 il', '5+ il']
  const salaryRanges = ['1000-1500 AZN', '1500-2000 AZN', '2000-3000 AZN', '3000+ AZN']

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError('')
        const params: any = {}
        if (selectedCity) params.city = selectedCity
        if (selectedCategory) params.category = selectedCategory
        if (search) params.search = search

        const response = await api.get('/jobs/list', { params })
        // Ensure all jobs have required fields and handle missing company data
        const validJobs = (response.data || []).filter((job: any) => 
          job && job.id && job.title
        ).map((job: any) => ({
          ...job,
          company: job.company || { name: 'Naməlum Şirkət' }
        }))
        setJobs(validJobs)
      } catch (err: any) {
        console.error('Failed to fetch jobs:', err)
        setError('İş elanları yüklənərkən xəta baş verdi')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [selectedCity, selectedCategory, search])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.company?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchesCity = !selectedCity || job.city === selectedCity
    const matchesCategory = !selectedCategory || job.category === selectedCategory
    const matchesExperience = !selectedExperience || (job.experience && job.experience === selectedExperience)
    const matchesSalary = !selectedSalary || (job.salary && job.salary === selectedSalary)
    return matchesSearch && matchesCity && matchesCategory && matchesExperience && matchesSalary
  })

  const activeFiltersCount = [selectedCity, selectedCategory, selectedExperience, selectedSalary].filter(Boolean).length

  const stats = [
    { label: 'Aktiv Vakansiyalar', value: jobs.length, icon: Briefcase },
    { label: 'Şirkətlər', value: new Set(jobs.map(j => j.company?.name).filter(Boolean)).size, icon: TrendingUp },
    { label: 'Şəhərlər', value: new Set(jobs.map(j => j.city).filter(Boolean)).size, icon: MapPin },
    { label: 'Kateqoriyalar', value: new Set(jobs.map(j => j.category).filter(Boolean)).size, icon: Code },
  ]

  const clearFilters = () => {
    setSelectedCity('')
    setSelectedCategory('')
    setSelectedExperience('')
    setSelectedSalary('')
    setSearch('')
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-transparent dark:from-gray-950 dark:via-gray-900 dark:to-transparent">
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
              const icons = [Briefcase, Search, TrendingUp, CheckCircle, Sparkles, Code, Palette, Megaphone]
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
              { emoji: '💼', position: { top: '12%', right: '10%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '🔍', position: { top: '22%', left: '5%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
              { emoji: '✨', position: { bottom: '18%', right: '8%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
              { emoji: '🎯', position: { bottom: '28%', left: '6%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '🚀', position: { top: '50%', right: '4%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
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
              <Briefcase className="h-4 w-4" />
              <span>İş Elanları</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Axtardığınız işi <span className="text-blue-600">tapın</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Yüzlərlə iş elanı arasından özünüzə uyğun olanı tapın. 
              Karyeranızı oradan davam edin.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="İş adı, şirkət adı və ya açar söz axtar..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setShowSuggestions(e.target.value.trim().length > 0)
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl"
                />
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-xl z-50 max-h-64 overflow-y-auto"
                  >
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wide">
                        Tövsiyələr
                      </div>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 group"
                        >
                          <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Tips/Hints when typing */}
                {search.trim().length > 0 && filteredSuggestions.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg z-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          Axtarış tövsiyələri
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Məsələn: "Frontend Developer", "UI/UX Designer", "Marketing Manager" və s.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
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
                  {filteredJobs.length} nəticə
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kateqoriya
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      <option value="">Bütün kateqoriyalar</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Təcrübə
                    </label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
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

                  {/* Salary Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Maaş
                    </label>
                    <select
                      value={selectedSalary}
                      onChange={(e) => setSelectedSalary(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    >
                      <option value="">Bütün aralıqlar</option>
                      {salaryRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
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
              position="joblistings-hero"
              format="banner"
              size="728x90"
              priority="premium"
              title="Premium İş Elanları"
              description="Yüksək maaşlı vakansiyalar və peşəkar imkanlar"
              className="hidden md:block"
            />
            <AdSlot
              position="joblistings-hero-mobile"
              format="banner"
              size="320x100"
              priority="premium"
              title="Premium İş Elanları"
              className="block md:hidden"
            />
          </div>
        </div>
      </section>

      {/* Job Listings */}
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
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {categories.find(c => c.value === selectedCategory)?.label || selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedExperience && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {selectedExperience}
                  <button
                    onClick={() => setSelectedExperience('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedSalary && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {selectedSalary}
                  <button
                    onClick={() => setSelectedSalary('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Loader2 className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                İş elanları yüklənir...
              </h3>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Xəta baş verdi
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                Yenidən Yoxla
              </Button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                İş elanı tapılmadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Axtarış parametrlərinizi dəyişdirin və ya filtrləri təmizləyin
              </p>
              <Button onClick={clearFilters}>
                Filtrləri Təmizlə
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tapılan Vakansiyalar
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredJobs.length} nəticə
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => {
                  // Insert ad after every 4 jobs
                  const shouldShowAd = (index + 1) % 4 === 0 && index > 0
                  return (
                    <>
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                        <JobCard 
                          id={job.id}
                          title={job.title}
                          company={job.company?.name || 'Naməlum Şirkət'}
                          city={job.city}
                          salary={job.salary}
                          category={job.category}
                          experience={job.experience}
                          createdAt={job.createdAt}
                        />
                      </motion.div>
                      {shouldShowAd && (
                        <motion.div
                          key={`ad-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="md:col-span-2 lg:col-span-3"
                        >
                          <AdSlot
                            position={`joblistings-infeed-${Math.floor(index / 4)}`}
                            format="card"
                            priority="premium"
                            title="Premium İş İmkanları"
                            description="Yüksək maaşlı vakansiyalar və peşəkar şirkətlər"
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
                const icons = [Briefcase, Sparkles, Send, Bell, TrendingUp, CheckCircle, Code, Palette]
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
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                İş elanı paylaşmaq istəyirsiniz?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Şirkətiniz üçün düzgün namizədi tapın. HumanCapital platformasında iş elanı paylaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/elan-paylas">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                    Elan Paylaş
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/qiymetler">
                  <button className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-xl font-medium transition-all duration-200 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg">
                    Qiymətlərə Bax
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

export default JobListings
