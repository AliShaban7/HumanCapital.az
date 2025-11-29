import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Play, Users, Briefcase, TrendingUp, CheckCircle, Zap, Shield, Settings, Banknote, Wrench, Megaphone, Code, Smartphone, Palette, Search, MapPin, Lock, Upload, Send, Bell, Star, Award, Sparkles, Rocket, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import JobCard from '../components/JobCard'
import CandidateCard from '../components/CandidateCard'
import Input from '../components/ui/Input'
import AdSlot from '../components/AdSlot'
import api from '../lib/api'

const Home = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [_selectedCategory, _setSelectedCategory] = useState('')
  const [filteredCategory, setFilteredCategory] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('type')
  const [selectedJobType, setSelectedJobType] = useState<string[]>([])
  const [selectedJobLevel, setSelectedJobLevel] = useState<string[]>([])
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [featuredCandidates, setFeaturedCandidates] = useState<any[]>([])
  const [candidatesLoading, setCandidatesLoading] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Separate ref for auto-scrolling hero categories
  const heroScrollRef = useRef<HTMLDivElement>(null)
  
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
  const filteredSuggestions = searchQuery.trim().length > 0
    ? searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }
  
  // Handle input focus
  const handleInputFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSuggestions(true)
    }
  }
  
  // Handle input blur (with delay to allow clicks)
  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  // Fetch featured candidates
  useEffect(() => {
    const fetchFeaturedCandidates = async () => {
      try {
        setCandidatesLoading(true)
        const response = await api.get('/candidates/list', { 
          params: { limit: 8 } // Get first 8 candidates
        })
        // Ensure all candidates have required fields
        const validCandidates = (response.data || []).filter((candidate: any) => 
          candidate && candidate.id && candidate.firstName && candidate.lastName
        ).slice(0, 8) // Limit to 8 candidates
        setFeaturedCandidates(validCandidates)
      } catch (err: any) {
        console.error('Failed to fetch featured candidates:', err)
        setFeaturedCandidates([])
      } finally {
        setCandidatesLoading(false)
      }
    }

    fetchFeaturedCandidates()
  }, [])

  // Auto-scroll effect for hero categories
  useEffect(() => {
    const scrollContainer = heroScrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const autoScroll = () => {
      if (scrollContainer) {
        const { scrollWidth } = scrollContainer
        const maxScroll = scrollWidth / 2 // Since we duplicate items

        scrollPosition += scrollSpeed

        // Reset to beginning for seamless loop
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft = scrollPosition
        }

        animationFrameId = requestAnimationFrame(autoScroll)
      }
    }

    // Start auto-scroll after a short delay
    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(autoScroll)
    }, 1000)

    return () => {
      clearTimeout(startDelay)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const categories = [
    { name: 'İdarəetmə', icon: Settings },
    { name: 'Maliyyə', icon: Banknote },
    { name: 'Mühəndislik', icon: Wrench },
    { name: 'Marketinq', icon: Megaphone },
    { name: 'IT', icon: Code },
    { name: 'Rəqəmsal', icon: Smartphone },
    { name: 'Dizayn', icon: Palette },
  ]


  // Mock data - will be replaced with API calls
  const featuredJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Azercell',
      city: 'Bakı',
      salary: '2000-3000 AZN',
      category: 'IT',
      experience: '2-5 il',
      createdAt: new Date().toISOString(),
      views: 1245,
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      company: 'Kontakt Home',
      city: 'Bakı',
      salary: '1500-2500 AZN',
      category: 'Design',
      experience: '1-3 il',
      createdAt: new Date().toISOString(),
      views: 892,
    },
    {
      id: '3',
      title: 'Backend Developer',
      company: 'PASHA Bank',
      city: 'Bakı',
      salary: '2500-3500 AZN',
      category: 'IT',
      experience: '3-5 il',
      createdAt: new Date().toISOString(),
      views: 2156,
    },
    {
      id: '4',
      title: 'Marketing Manager',
      company: 'Birbank',
      city: 'Bakı',
      salary: '1800-2500 AZN',
      category: 'Marketing',
      experience: '2-4 il',
      createdAt: new Date().toISOString(),
      views: 634,
    },
  ]


  // Get unique categories from featured jobs
  const jobCategories = Array.from(new Set(featuredJobs.map(job => job.category)))
  
  // Category mapping for display and icons
  const categoryConfig: { [key: string]: { label: string; icon: any } } = {
    'IT': { label: 'IT', icon: Code },
    'Design': { label: 'Dizayn', icon: Palette },
    'Marketing': { label: 'Marketinq', icon: Megaphone },
    'İdarəetmə': { label: 'İdarəetmə', icon: Settings },
    'Maliyyə': { label: 'Maliyyə', icon: Banknote },
    'Mühəndislik': { label: 'Mühəndislik', icon: Wrench },
    'Rəqəmsal': { label: 'Rəqəmsal', icon: Smartphone },
  }

  // Filter jobs based on selected category
  const filteredJobs = filteredCategory 
    ? featuredJobs.filter(job => job.category === filteredCategory)
    : featuredJobs

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-background.avif"
            alt="Background"
            className="w-full h-full object-cover scale-105"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/75 to-blue-900/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12">
              {/* Left Side - Headline & Description */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6"
                >
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">Azərbaycanın İlk Video-CV Platforması</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-[1.2] overflow-visible">
                  <span className="block mb-2 pb-1">İnsan kapitalına</span>
                  <span className="block bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent mb-2 pb-1">
                    sərmayə,
                  </span>
                  <span className="block bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent pb-1">
                    gələcəyə dəyər
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed max-w-xl">
                  Azərbaycanın ilk innovativ video-CV iş platforması. Namizədlər video-intro yükləyir, şirkətlər onları izləyərək işə qəbul edir.
                </p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-3 gap-6 mt-10"
                >
                  {[
                    { number: '1000+', label: 'İş Elanı' },
                    { number: '500+', label: 'Şirkət' },
                    { number: '2000+', label: 'Namizəd' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Side - Search Area */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:ml-8 h-full flex items-center"
              >
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 border-2 border-white/30 relative overflow-hidden w-full h-full flex flex-col justify-center">
                  {/* Decorative Gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
                  
                  {/* Memoji in top right corner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200/50 backdrop-blur-sm">
                        <span className="text-3xl md:text-4xl">👋</span>
                      </div>
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping"></div>
                    </div>
                  </motion.div>
                  
                  {/* Decorative geometric shapes */}
                  <div className="absolute top-16 left-6 opacity-5">
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-blue-600 rounded-lg rotate-12"></div>
                      <div className="absolute top-2 left-2 w-12 h-12 border-2 border-blue-500 rounded-lg rotate-12"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-24 left-10 opacity-5">
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                    <div className="absolute top-4 left-4 w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-4 opacity-5 transform -translate-y-1/2">
                    <div className="w-3 h-20 bg-gradient-to-b from-blue-600 to-transparent rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10 w-full">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Search className="h-6 w-6 text-blue-600" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">İş axtarışı</h2>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base ml-9">Karyera fürsətləri üçün axtarış edin</p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const params = new URLSearchParams()
                        if (searchQuery) params.append('search', searchQuery)
                        if (selectedCity) params.append('city', selectedCity)
                        if (selectedCategories.length > 0) {
                          selectedCategories.forEach(cat => params.append('category', cat))
                        }
                        if (selectedJobType.length > 0) {
                          selectedJobType.forEach(type => params.append('jobType', type))
                        }
                        if (selectedJobLevel.length > 0) {
                          selectedJobLevel.forEach(level => params.append('jobLevel', level))
                        }
                        if (selectedSalaryRange.length > 0) {
                          selectedSalaryRange.forEach(range => params.append('salaryRange', range))
                        }
                        navigate(`/is-elanlari?${params.toString()}`)
                      }}
                      className="space-y-6"
                    >
                      {/* Search Bar and Location - Side by Side */}
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative group flex-[2]">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" />
                            <Input
                              ref={searchInputRef}
                              type="text"
                              placeholder="Vakansiya adı və ya açar söz"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowSuggestions(e.target.value.trim().length > 0)
                              }}
                              onFocus={handleInputFocus}
                              onBlur={handleInputBlur}
                              className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-md bg-white/90 backdrop-blur-sm"
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
                                      <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {suggestion}
                                      </span>
                                    </button>
                                  ))}
                        </div>
                              </motion.div>
                            )}
                            
                            {/* Tips/Hints when typing */}
                            {searchQuery.trim().length > 0 && filteredSuggestions.length === 0 && (
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
                        </div>

                        {/* City Filter - Icon Only */}
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="relative w-14 h-14 pl-4 pr-4 rounded-xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer shadow-md hover:shadow-lg hover:border-blue-300 transition-all"
                            title={selectedCity || "Şəhər seç"}
                          >
                            <option value="" className="text-gray-500 font-normal"></option>
                            <option value="Bakı" className="py-2">Bakı</option>
                            <option value="Gəncə" className="py-2">Gəncə</option>
                            <option value="Sumqayıt" className="py-2">Sumqayıt</option>
                            <option value="Mingəçevir" className="py-2">Mingəçevir</option>
                          </select>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                            <MapPin className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                            <div className="w-1.5 h-1.5 border-r border-b border-gray-400 rotate-45 transform"></div>
                          </div>
                        </div>

                        {/* Search Button */}
                        <Button
                          type="submit"
                          className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl whitespace-nowrap"
                        >
                          Axtar
                        </Button>
                      </div>

                      {/* Tabbed Navigation */}
                      <div className="border-b border-gray-200">
                        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
                          <button
                            type="button"
                            onClick={() => setActiveTab('type')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                              activeTab === 'type'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Vakansiyanın növü
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('category')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                              activeTab === 'category'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Kateqoriyalar
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('level')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                              activeTab === 'level'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Vəzifə dərəcəsi
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('salary')}
                            className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                              activeTab === 'salary'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Maaş aralığı
                          </button>
                        </div>
                      </div>

                      {/* Filter Content */}
                      <div className="h-[120px]">
                        {activeTab === 'type' && (
                          <div className="grid grid-cols-5 gap-3">
                          {[
                            'Tam ştat',
                            'Daimi',
                            'Frilans',
                            'Könüllü',
                            'Mövsümi',
                            'Müvəqqəti',
                            'Təcrübə',
                            'Yarım ştat',
                          ].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setSelectedJobType(prev => 
                                    prev.includes(type) 
                                      ? prev.filter(t => t !== type)
                                      : [...prev, type]
                                  )
                                }}
                                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center text-center ${
                                  selectedJobType.includes(type)
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'category' && (
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              { value: 'IT', label: 'IT' },
                              { value: 'Marketing', label: 'Marketinq' },
                              { value: 'Design', label: 'Dizayn' },
                              { value: 'Sales', label: 'Satış' },
                              { value: 'HR', label: 'İnsan Resursları' },
                              { value: 'Finance', label: 'Maliyyə' },
                              { value: 'Engineering', label: 'Mühəndislik' },
                              { value: 'Management', label: 'İdarəetmə' },
                            ].map((cat) => (
                              <button
                                key={cat.value}
                                type="button"
                                onClick={() => {
                                  setSelectedCategories(prev => 
                                    prev.includes(cat.value) 
                                      ? prev.filter(c => c !== cat.value)
                                      : [...prev, cat.value]
                                  )
                                }}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center text-center ${
                                  selectedCategories.includes(cat.value)
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                                }`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'level' && (
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              'Təcrübəsiz',
                              'Kiçik təcrübə',
                              'Orta səviyyə',
                              'Böyük təcrübə',
                              'Senior',
                              'Lead',
                              'Manager',
                            ].map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => {
                                  setSelectedJobLevel(prev => 
                                    prev.includes(level) 
                                      ? prev.filter(l => l !== level)
                                      : [...prev, level]
                                  )
                                }}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center text-center ${
                                  selectedJobLevel.includes(level)
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        )}

                        {activeTab === 'salary' && (
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              '500-1000 AZN',
                              '1000-1500 AZN',
                              '1500-2000 AZN',
                              '2000-3000 AZN',
                              '3000-5000 AZN',
                              '5000+ AZN',
                            ].map((range) => (
                              <button
                                key={range}
                                type="button"
                                onClick={() => {
                                  setSelectedSalaryRange(prev => 
                                    prev.includes(range) 
                                      ? prev.filter(r => r !== range)
                                      : [...prev, range]
                                  )
                                }}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center text-center ${
                                  selectedSalaryRange.includes(range)
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Reset Button */}
                      {(selectedJobType.length > 0 || selectedCategories.length > 0 || selectedJobLevel.length > 0 || selectedSalaryRange.length > 0) && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedJobType([])
                              setSelectedCategories([])
                              setSelectedJobLevel([])
                              setSelectedSalaryRange([])
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Sıfırla
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Category Rollbar with Icons - Auto Scrolling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <div className="text-center mb-6">
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Kateqoriyalar</p>
              </div>
              <div className="relative overflow-hidden">
                {/* Gradient overlays for smooth fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-900/95 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-900/95 to-transparent z-10 pointer-events-none"></div>
                
                <div
                  ref={heroScrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                  }}
                >
                  {/* Duplicate categories for seamless loop */}
                  {[...categories, ...categories].map((category, index) => (
                    <motion.div
                      key={`${category.name}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + (index % categories.length) * 0.05 }}
                      className="flex-shrink-0"
                    >
                      <Link
                        to={`/is-elanlari?category=${encodeURIComponent(category.name)}`}
                        className="group flex items-center gap-3 px-5 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-200 min-w-[160px] shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-white text-sm font-medium whitespace-nowrap">
                          {category.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ad Banner - After Category Bar */}
      <section className="py-8 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AdSlot
              position="home-after-categories"
              format="banner"
              size="728x90"
              priority="premium"
              title="Premium İş Elanları"
              description="Yüksək maaşlı vakansiyalar və peşəkar imkanlar"
              className="hidden md:block"
            />
            <AdSlot
              position="home-after-categories-mobile"
              format="banner"
              size="320x100"
              priority="premium"
              title="Premium İş Elanları"
              className="block md:hidden"
            />
          </div>
        </div>
      </section>

      {/* Platform Advantages Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-[160px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Platformamızın Üstünlükləri
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Niyə <span className="text-blue-600">HumanCapital?</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Video əsaslı işə qəbul prosesi ilə şirkətlər və namizədlər üçün çevik, şəffaf və effektli təcrübə yaradırıq.
                  Bir platformada CV yükləyin, video ilə fərqlənin və düzgün insanlarla anında əlaqə yaradın.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Play,
                    title: 'Video CV ekosistemi',
                    description: 'Namizədlər özlərini video formatda təqdim edir, şirkətlər insanı daha yaxından tanıyır.'
                  },
                  {
                    icon: Users,
                    title: 'Peşəkar şəbəkə',
                    description: 'Yüzlərlə şirkət və minlərlə namizəd arasında uyğunlaşmanı ağıllı alqoritm sürətləndirir.'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Tez nəticə',
                    description: 'İşə qəbul prosesi avtomatlaşdırılmış filtr, analitika və bildirişlərlə daha qısa müddətdə tamamlanır.'
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl bg-white/70 border border-blue-100 p-5 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Aktiv iş elanları', value: '1000+' },
                  { label: 'Şirkət tərəfdaşları', value: '500+' },
                  { label: 'CV yükləməsi', value: '15K+' },
                  { label: 'Video müsahibə', value: '92% sürət' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm">
                    <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column visual cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
                <div className="relative flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0 rounded-2xl bg-white/10 p-5 backdrop-blur">
                    <Play className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <span className="text-sm font-medium uppercase tracking-wider text-white/80">Video CV</span>
                    <h3 className="text-3xl font-bold leading-tight">Video ilə özünü tanıt</h3>
                    <p className="text-white/80 text-base">
                      90 saniyəyə qədər video CV-lər namizədin enerjisini, nitqini və motivasiyasını göstərir. HR komandaları qərarı daha inamla verir.
                    </p>
                    <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      <span>CV qəbuluna 3x sürət</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Geniş Şəbəkə',
                    description: 'Azərbaycanın qabaqcıl şirkətləri və peşəkarları burada görüşür.',
                    icon: Users,
                    accent: 'from-purple-500 to-purple-600',
                  },
                  {
                    title: 'Sürətli Filtrləmə',
                    description: 'Ağıllı filtrlər və təkliflər ilə ideal namizədi ani tapın.',
                    icon: Target,
                    accent: 'from-emerald-500 to-emerald-600',
                  },
                  {
                    title: 'Etibarlı İnfrastruktur',
                    description: 'Şifrələnmiş məlumatlarla təhlükəsiz inteqrasiya.',
                    icon: Shield,
                    accent: 'from-blue-500 to-blue-700',
                  },
                  {
                    title: 'Analytics Panel',
                    description: 'Müraciətləri izləyin, qərarları data ilə dəstəkləyin.',
                    icon: TrendingUp,
                    accent: 'from-orange-500 to-orange-600',
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/40 bg-white/90 p-5 shadow-lg"
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white mb-4`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h4>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-lg">
                {[
                  { title: 'Video CV yüklə', value: '90s limit' },
                  { title: 'Şirkətlərə görün', value: 'Algoritmik uyğunluq' },
                  { title: 'Məlumat təhlükəsizliyi', value: 'ISO standartı' },
                ].map((item) => (
                  <div key={item.title} className="flex-1 min-w-[180px]">
                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">{item.title}</p>
                    <p className="text-base text-gray-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      {/* Removed at user's request */}

      {/* Featured Jobs */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
                Son İş Elanları
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Yeni imkanlar sizi gözləyir
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ən yeni iş elanlarını kəşf edin və karyeranızı növbəti səviyyəyə qaldırın
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setFilteredCategory('')}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filteredCategory === ''
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-blue-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Hamısı
              </button>
              {jobCategories.map((category) => {
                const config = categoryConfig[category] || { label: category, icon: Briefcase }
                const IconComponent = config.icon
                
                return (
                  <button
                    key={category}
                    onClick={() => setFilteredCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                      filteredCategory === category
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-blue-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{config.label}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Job Cards Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredJobs.map((job, index) => {
                // Insert ad after every 3 jobs
                const shouldShowAd = (index + 1) % 3 === 0 && index > 0
                return (
                  <>
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobCard {...job} />
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
                          position={`home-jobs-infeed-${Math.floor(index / 3)}`}
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
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                Bu kateqoriyada iş elanı tapılmadı
              </p>
              <button
                onClick={() => setFilteredCategory('')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
              >
                Bütün elanlara bax
              </button>
            </motion.div>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/is-elanlari">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-8 py-6 text-lg font-semibold"
              >
                Bütün iş elanlarına bax
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CV Upload Promo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/10 dark:bg-blue-900/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 dark:bg-blue-800/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.01, y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              {/* Main Card Background */}
              <div className="relative bg-gradient-to-br from-blue-50 via-blue-100/80 to-white dark:from-blue-900/30 dark:via-blue-800/20 dark:to-gray-800 rounded-3xl p-8 md:p-12 lg:p-16 border-2 border-blue-200/50 dark:border-blue-800/50 shadow-2xl overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(45deg, #3b82f6 1px, transparent 1px),
                      linear-gradient(-45deg, #3b82f6 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}></div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/15 to-transparent rounded-tr-full"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12">
                  {/* Icon Section */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-shrink-0 relative"
                  >
                    {/* Icon Container with Glow */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500">
                        <Upload className="h-12 w-12 md:h-14 md:w-14 text-white relative z-10" />
                        {/* Animated Glow Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-60"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 0.8, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      {/* Floating Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-400 rounded-full"
                          style={{
                            top: `${20 + i * 30}%`,
                            left: `${-10 + i * 20}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            opacity: [0.4, 0.8, 0.4],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Text and Button Section */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-full mb-4"
                    >
                      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">CV Yükləmə</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight"
                    >
                      CV-nizi əlavə edin
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl"
                    >
                      Vebsaytımızda hər gün yüzlərlə şirkət öz vakansiyalarına uyğun namizəd üçün CV hovuzumuza üz tuturlar. Siz də indi CV yaradın, şirkətlər üçün daha əlçatan olun!
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Link to="/cv-yukle">
                        <Button 
                          size="lg"
                          className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-xl hover:shadow-2xl px-8 py-6 text-lg font-bold transition-all duration-300 overflow-hidden"
                        >
                          {/* Button Background Animation */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <span className="relative z-10 flex items-center">
                            <Upload className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                            CV Yüklə
                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                          </span>

                          {/* Shine Effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </Button>
                      </Link>
                    </motion.div>

                    {/* Stats or Additional Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Pulsuz yükləmə</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Tez proses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Şirkətlərə görün</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
        </div>
      </div>

      {/* Featured Candidates - Main Feature */}
      <section className="pt-12 pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Subtle Background Blur Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/15 dark:bg-blue-900/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300/15 dark:bg-blue-800/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/8 dark:bg-blue-900/4 rounded-full blur-3xl"></div>
        </div>

        {/* Elegant Geometric Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid Pattern with Increased Opacity */}
          <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}></div>
          </div>

          {/* Floating Orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/5 dark:from-blue-500/8 dark:to-blue-700/4"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Professional Icon Illustrations - Refined */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Section Icons */}
          <motion.div
            className="absolute top-20 left-[8%]"
            animate={{
              y: [0, -10, 0],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Briefcase className="h-16 w-16 text-blue-400/15 dark:text-blue-500/12" />
          </motion.div>

          <motion.div
            className="absolute top-32 right-[12%]"
            animate={{
              y: [0, -15, 0],
              opacity: [0.08, 0.12, 0.08],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Award className="h-14 w-14 text-blue-300/15 dark:text-blue-400/12" />
          </motion.div>

          {/* Middle Section Icons */}
          <motion.div
            className="absolute top-1/2 left-[5%] -translate-y-1/2"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Target className="h-20 w-20 text-blue-400/12 dark:text-blue-500/10" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-[8%] -translate-y-1/2"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Rocket className="h-16 w-16 text-blue-300/12 dark:text-blue-400/10" />
          </motion.div>

          {/* Bottom Section Icons */}
          <motion.div
            className="absolute bottom-24 left-[15%]"
            animate={{
              y: [0, -12, 0],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <Users className="h-16 w-16 text-blue-400/12 dark:text-blue-500/10" />
          </motion.div>

          <motion.div
            className="absolute bottom-32 right-[10%]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            <Play className="h-14 w-14 text-blue-500/12 dark:text-blue-400/10" />
          </motion.div>
        </div>

        {/* 3D Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
          {/* Base Wave Layer - Back */}
          <motion.svg 
            className="absolute bottom-0 w-full h-full opacity-20" 
            viewBox="0 0 1200 160" 
            preserveAspectRatio="none"
            style={{ 
              transform: 'translateZ(-20px) scale(1.05)',
            }}
          >
            <motion.path
              d="M0,80 Q300,40 600,80 T1200,80 L1200,160 L0,160 Z"
              fill="url(#waveGradient1)"
              animate={{
                d: [
                  "M0,80 Q300,40 600,80 T1200,80 L1200,160 L0,160 Z",
                  "M0,80 Q300,120 600,80 T1200,80 L1200,160 L0,160 Z",
                  "M0,80 Q300,40 600,80 T1200,80 L1200,160 L0,160 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Middle Wave Layer */}
          <motion.svg 
            className="absolute bottom-0 w-full h-full opacity-25" 
            viewBox="0 0 1200 160" 
            preserveAspectRatio="none"
            style={{ 
              transform: 'translateZ(0px)',
            }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.path
              d="M0,90 Q300,50 600,90 T1200,90 L1200,160 L0,160 Z"
              fill="url(#waveGradient2)"
              animate={{
                d: [
                  "M0,90 Q300,50 600,90 T1200,90 L1200,160 L0,160 Z",
                  "M0,90 Q300,130 600,90 T1200,90 L1200,160 L0,160 Z",
                  "M0,90 Q300,50 600,90 T1200,90 L1200,160 L0,160 Z",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Top Wave Layer - Front */}
          <motion.svg 
            className="absolute bottom-0 w-full h-full opacity-30" 
            viewBox="0 0 1200 160" 
            preserveAspectRatio="none"
            style={{ 
              transform: 'translateZ(20px) scale(0.98)',
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <motion.path
              d="M0,100 Q300,60 600,100 T1200,100 L1200,160 L0,160 Z"
              fill="url(#waveGradient3)"
              animate={{
                d: [
                  "M0,100 Q300,60 600,100 T1200,100 L1200,160 L0,160 Z",
                  "M0,100 Q300,140 600,100 T1200,100 L1200,160 L0,160 Z",
                  "M0,100 Q300,60 600,100 T1200,100 L1200,160 L0,160 Z",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            <defs>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6"
              >
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                <span className="text-sm text-blue-700 dark:text-blue-300 font-semibold uppercase tracking-wide">
                  Peşəkar Namizədlər
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6"
              >
                Ən yaxşı peşəkarları kəşf edin
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8"
              >
                Video CV ilə özünü təqdim edən peşəkar namizədlərlə tanış olun. Hər bir namizəd öz bacarıqlarını, təcrübəsini və potensialını video formatda sizə təqdim edir.
              </motion.p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8"
              >
                {[
                  { 
                    icon: Play, 
                    text: 'Video CV', 
                    description: 'Özünü video formatda təqdim et',
                    gradient: 'from-blue-500 to-blue-600',
                    bgGradient: 'from-blue-50 via-blue-100/50 to-white',
                    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
                    borderColor: 'border-blue-200',
                    hoverBorder: 'hover:border-blue-400',
                  },
                  { 
                    icon: Users, 
                    text: 'Peşəkar Namizədlər', 
                    description: 'Yüksək keyfiyyətli işçilər',
                    gradient: 'from-purple-500 to-purple-600',
                    bgGradient: 'from-purple-50 via-purple-100/50 to-white',
                    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
                    borderColor: 'border-purple-200',
                    hoverBorder: 'hover:border-purple-400',
                  },
                  { 
                    icon: Award, 
                    text: 'Bacarıq və Təcrübə', 
                    description: 'Sənayedə təcrübəli mütəxəssislər',
                    gradient: 'from-emerald-500 to-emerald-600',
                    bgGradient: 'from-emerald-50 via-emerald-100/50 to-white',
                    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
                    borderColor: 'border-emerald-200',
                    hoverBorder: 'hover:border-emerald-400',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Background with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Card */}
                    <div className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 ${feature.borderColor} dark:border-gray-700 ${feature.hoverBorder} dark:hover:border-gray-600 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden`}>
                      {/* Decorative corner element */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
                      
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`relative mb-6 inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        <feature.icon className="h-8 w-8 text-white relative z-10" />
                        {/* Icon glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-gray-100 dark:group-hover:to-gray-300 transition-all duration-300">
                          {feature.text}
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Lock Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-6 py-3 rounded-full border-2 border-blue-200 dark:border-blue-800 shadow-lg"
              >
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-base text-blue-700 dark:text-blue-300 font-semibold">Profilləri görmək üçün giriş edin</span>
              </motion.div>
            </div>

            {/* Candidate Cards Grid */}
            {candidatesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[...Array(4)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : featuredCandidates.length === 0 ? (
              <div className="text-center py-12 mb-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Hal-hazırda namizəd yoxdur
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  Yeni namizədlər qeydiyyatdan keçdikcə burada görünəcək
                </p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                    <CandidateCard 
                      id={candidate.id}
                      firstName={candidate.firstName}
                      lastName={candidate.lastName}
                      profession={candidate.profession}
                      city={candidate.city}
                      videoUrl={candidate.videoUrl}
                    />
                </motion.div>
              ))}
            </div>
            )}

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center"
            >
              <Link to="/giris">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Giriş et və bütün namizədlərə bax
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Telegram Subscription Promo Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Notification Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <Bell className="h-8 w-8 text-white/20" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                >
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">Anında Bildirişlər</span>
                </motion.div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Elanlar telefonunuza gəlsin
                </h3>
                <p className="text-xl text-blue-50 leading-relaxed">
                  Telegram kanalımıza abunə olun, vakansiyalardan anında bildiriş alın. Heç bir iş imkanını qaçırmayın!
                </p>

                {/* Features */}
                <div className="space-y-4 pt-4">
                  {[
                    { icon: CheckCircle, text: 'Yeni elanlar anında bildirilir' },
                    { icon: CheckCircle, text: 'Sizin maraqlarınıza uyğun filtrlər' },
                    { icon: CheckCircle, text: 'Pulsuz və asan' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-green-300" />
                      </div>
                      <span className="text-blue-50 text-lg">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="pt-4"
                >
                  <a 
                    href="https://t.me/humancapital" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-bold group"
                    >
                      <Send className="h-6 w-6 mr-2 group-hover:translate-x-1 transition-transform" />
                      Telegram-a Qoşul
                      <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Phone/Notification Visual */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
                    <div className="space-y-4">
                      {/* Notification Cards */}
                      {[
                        { title: 'Yeni İş Elanı', company: 'Azercell', time: '5 dəqiqə əvvəl' },
                        { title: 'Frontend Developer', company: 'PASHA Bank', time: '15 dəqiqə əvvəl' },
                        { title: 'UI/UX Designer', company: 'Kontakt Home', time: '1 saat əvvəl' },
                      ].map((notification, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Bell className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-white font-semibold text-sm">{notification.title}</h4>
                                <span className="text-blue-200 text-xs">{notification.time}</span>
                              </div>
                              <p className="text-blue-100 text-xs">{notification.company}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/30 rounded-full blur-xl"
                  ></motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/30 rounded-full blur-xl"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Dynamic Background with Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6 border border-blue-200 dark:border-blue-800"
                >
                  <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Pulsuz və Asandır</span>
                </motion.div>

                {/* Main Heading */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
                  İndi başlayın
                </h2>

                {/* Subheading */}
                <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                  HumanCapital ilə iş dünyasında yeni dövrə qoşulun. Karyeranızı növbəti səviyyəyə qaldırın və ideal işi tapın.
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-10">
                  {[
                    { icon: CheckCircle, text: '1000+ Aktiv İş Elanı', color: 'text-green-600 dark:text-green-400' },
                    { icon: CheckCircle, text: '500+ Etibarlı Şirkət', color: 'text-green-600 dark:text-green-400' },
                    { icon: CheckCircle, text: 'Video CV ilə Fərqlənin', color: 'text-green-600 dark:text-green-400' },
                    { icon: CheckCircle, text: 'Tez və Asan Qeydiyyat', color: 'text-green-600 dark:text-green-400' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`flex-shrink-0 ${feature.color}`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/qeydiyyat">
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-bold w-full sm:w-auto"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Pulsuz Qeydiyyat
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/haqqimizda">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-bold w-full sm:w-auto"
                    >
                      Daha Ətraflı
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column - Stats & Trust */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '1000+', label: 'Aktiv İş Elanı', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
                    { number: '500+', label: 'Şirkət', icon: Users, color: 'from-purple-500 to-purple-600' },
                    { number: '2000+', label: 'Namizəd', icon: TrendingUp, color: 'from-green-500 to-green-600' },
                    { number: '95%', label: 'Məmnuniyyət', icon: Star, color: 'from-yellow-500 to-orange-500' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Bizə etibar edənlər</h3>
                  </div>
                  {/* Scrollable Company Logos */}
                  <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
                    <div className="flex gap-4 min-w-max">
                      {[
                        { name: 'Azercell', logo: '/azercell_logo-cropped.svg' },
                        { name: 'PASHA Bank', logo: '/pasha_logo.png' },
                        { name: 'Birbank', logo: '/birbank.png' },
                        { name: 'Kontakt Home', logo: '/kontakt-home-yeni-logo.png' },
                        // Add more companies here as needed
                        // { name: 'Company 5', logo: '/company5-logo.png' },
                        // { name: 'Company 6', logo: '/company6-logo.png' },
                        // ... up to 15 companies
                      ].map((company, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                          className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[140px]"
                        >
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="h-10 w-auto max-w-[120px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* Alternative: Grid layout for many companies (uncomment if preferred) */}
                  {/* <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[
                      { name: 'Azercell', logo: '/azercell_logo-cropped.svg' },
                      { name: 'PASHA Bank', logo: '/pasha_logo.png' },
                      { name: 'Birbank', logo: '/birbank.png' },
                      { name: 'Kontakt Home', logo: '/kontakt-home-yeni-logo.png' },
                      // Add more companies here
                    ].map((company, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center justify-center border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-8 w-auto max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    ))}
                  </div> */}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

