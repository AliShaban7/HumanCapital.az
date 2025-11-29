import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, BookOpen, Video, FileText, TrendingUp, Calendar, User, 
  ArrowRight, Sparkles, Award, Lightbulb, Briefcase, GraduationCap,
  Clock, Eye, Tag, Filter, X
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Resources = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'video-cv', label: 'Video CV', icon: Video, color: 'blue' },
    { id: 'career', label: 'Karyera', icon: Briefcase, color: 'purple' },
    { id: 'interview', label: 'Müsahibə', icon: User, color: 'green' },
    { id: 'skills', label: 'Bacarıqlar', icon: Award, color: 'yellow' },
    { id: 'tips', label: 'Məsləhətlər', icon: Lightbulb, color: 'orange' },
  ]

  // Mock data - will be replaced with API
  const articles = [
    {
      id: '1',
      title: 'Video CV hazırlamaq üçün 10 məsləhət',
      excerpt: 'Video CV-nizi daha cəlbedici etmək üçün praktik məsləhətlər. İşəgötürənlərin diqqətini cəlb edəcək video CV yaratmağın sirləri.',
      author: 'HumanCapital Team',
      publishedAt: new Date().toISOString(),
      category: 'video-cv',
      readTime: '5 dəq',
      views: 1245,
      imageUrl: null,
      featured: true,
    },
    {
      id: '2',
      title: 'İş müsahibəsində uğur qazanmaq',
      excerpt: 'Müsahibədə özünüzü düzgün təqdim etmək üçün tövsiyələr. Ən çox verilən suallara hazırlıq və özünü inandırma texnikaları.',
      author: 'HumanCapital Team',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      category: 'interview',
      readTime: '7 dəq',
      views: 892,
      imageUrl: null,
      featured: true,
    },
    {
      id: '3',
      title: 'Karyera planı necə hazırlanır?',
      excerpt: 'Uzunmüddətli karyera məqsədlərinizi müəyyənləşdirmək və onlara çatmaq üçün addım-addım bələdçi.',
      author: 'HumanCapital Team',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      category: 'career',
      readTime: '10 dəq',
      views: 634,
      imageUrl: null,
      featured: false,
    },
    {
      id: '4',
      title: 'Texniki bacarıqların inkişafı',
      excerpt: 'İT sahəsində özünüzü necə inkişaf etdirmək olar. Ən populyar texnologiyalar və öyrənmə yolları.',
      author: 'HumanCapital Team',
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      category: 'skills',
      readTime: '8 dəq',
      views: 1123,
      imageUrl: null,
      featured: false,
    },
    {
      id: '5',
      title: 'İş axtarışında ən yaxşı praktikalar',
      excerpt: 'Effektiv iş axtarış strategiyaları. LinkedIn, iş axtarış platformaları və şəbəkə qurma texnikaları.',
      author: 'HumanCapital Team',
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      category: 'career',
      readTime: '6 dəq',
      views: 756,
      imageUrl: null,
      featured: false,
    },
    {
      id: '6',
      title: 'CV yazmaq üçün əsas qaydalar',
      excerpt: 'Mükəmməl CV yaratmaq üçün vacib məqamlar. Format, məzmun və dizayn tövsiyələri.',
      author: 'HumanCapital Team',
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      category: 'tips',
      readTime: '5 dəq',
      views: 987,
      imageUrl: null,
      featured: false,
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const formatViews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const activeFiltersCount = selectedCategory ? 1 : 0

  const stats = [
    { label: 'Məqalələr', value: articles.length, icon: BookOpen },
    { label: 'Kateqoriyalar', value: categories.length, icon: Tag },
    { label: 'Oxucular', value: '5K+', icon: User },
    { label: 'Orta oxuma müddəti', value: '7 dəq', icon: Clock },
  ]

  const clearFilters = () => {
    setSelectedCategory('')
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
          
          {/* Floating Geometric Shapes */}
          {[...Array(6)].map((_, i) => {
            const sizes = [80, 120, 100, 150, 90, 110]
            const positions = [
              { top: '10%', left: '5%' },
              { top: '20%', right: '8%' },
              { bottom: '15%', left: '12%' },
              { bottom: '25%', right: '10%' },
              { top: '50%', left: '3%' },
              { top: '60%', right: '5%' },
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
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <div className="w-full h-full border-2 border-blue-300/20 dark:border-blue-600/20 rounded-lg rotate-45" />
              </motion.div>
            )
          })}
          
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const icons = [BookOpen, FileText, Video, Lightbulb, Award, TrendingUp]
              const Icon = icons[i % icons.length]
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${5 + (i % 6) * 16}%`,
                    top: `${10 + Math.floor(i / 6) * 40}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
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
              { emoji: '📚', position: { top: '15%', right: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '💡', position: { top: '25%', left: '6%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
              { emoji: '📖', position: { bottom: '20%', right: '12%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
              { emoji: '🎓', position: { bottom: '30%', left: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
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
              <BookOpen className="h-4 w-4" />
              <span>Resurslar</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Karyera <span className="text-blue-600">resursları</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Karyera inkişafı, iş axtarışı və video CV hazırlamaq haqqında praktik məqalələr və məsləhətlər. 
              Karyeranızı növbəti səviyyəyə qaldırın.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Məqalə axtar..."
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
                  <span>Kateqoriyalar</span>
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
                    Təmizlə
                  </button>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {filteredArticles.length} məqalə
                </span>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-6xl mx-auto mb-8"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kateqoriyalar</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      !selectedCategory
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    Hamısı
                  </button>
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </button>
                    )
                  })}
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Seçilmiş Məqalələr
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Ən populyar və faydalı məqalələr
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {featuredArticles.map((article, index) => {
                const category = categories.find(cat => cat.id === article.category)
                const CategoryIcon = category?.icon || FileText
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/resurslar/${article.id}`}>
                      <div className="group h-full bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        {/* Image/Icon Section */}
                        <div className="relative h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 overflow-hidden">
                          {article.imageUrl ? (
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <CategoryIcon className="h-20 w-20 text-white/80" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center space-x-1">
                              <Sparkles className="h-3 w-3" />
                              <span>Seçilmiş</span>
                            </span>
                          </div>
                          {category && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center space-x-1">
                                <CategoryIcon className="h-3 w-3" />
                                <span>{category.label}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                <span>{article.author}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              <span className="text-sm font-medium mr-1">Oxu</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm">
                  {categories.find(c => c.id === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-2 hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {regularArticles.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Məqalə tapılmadı
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
                  Bütün Məqalələr
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {regularArticles.length} məqalə
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article, index) => {
                  const category = categories.find(cat => cat.id === article.category)
                  const CategoryIcon = category?.icon || FileText
                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link to={`/resurslar/${article.id}`}>
                        <div className="group h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          {/* Image/Icon Section */}
                          <div className="relative h-40 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 overflow-hidden">
                            {article.imageUrl ? (
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <CategoryIcon className="h-16 w-16 text-white/80" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            {category && (
                              <div className="absolute bottom-3 left-3">
                                <span className="px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-700 dark:text-gray-300 text-xs font-medium flex items-center space-x-1">
                                  <CategoryIcon className="h-3 w-3" />
                                  <span>{category.label}</span>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  <span>{formatViews(article.views)}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
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
                const icons = [BookOpen, FileText, Video, Lightbulb, Award, TrendingUp, GraduationCap, Briefcase]
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
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Karyeranızı inkişaf etdirin
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Daha çox məqalə, məsləhət və resurslar üçün bizi izləyin. 
                Karyera uğurunuz üçün lazım olan bütün məlumatlar burada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/namizedler">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                    Namizədlərə Bax
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/is-elanlari">
                  <button className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-xl font-medium transition-all duration-200 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg">
                    İş Elanlarına Bax
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Resources
