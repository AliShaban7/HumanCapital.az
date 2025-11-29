import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, MapPin, Globe, Search, Briefcase, Users, TrendingUp, Filter, CheckCircle, Star, ArrowRight, ExternalLink, Sparkles, Send, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { getCompanyLogo } from '../lib/companyLogos'

const Companies = () => {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const cities = ['Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Lənkəran', 'Şəki']
  const industries = ['IT', 'Maliyyə', 'Mühəndislik', 'Marketinq', 'Dizayn', 'İdarəetmə', 'Rəqəmsal']

  const companies = [
    {
      id: '1',
      name: 'Azercell',
      description: 'Azərbaycanın aparıcı telekommunikasiya şirkəti. İnnovativ texnologiyalar və müştəri məmnuniyyəti ilə ön planda.',
      city: 'Bakı',
      industry: 'IT',
      website: 'https://azercell.com',
      logo: '/images/azercell_logo-cropped.svg',
      activeJobs: 12,
      totalEmployees: '5000+',
      rating: 4.8,
      verified: true,
    },
    {
      id: '2',
      name: 'PASHA Bank',
      description: 'Azərbaycanın ən böyük banklarından biri. Müştərilərə geniş spektrli maliyyə xidmətləri təqdim edir.',
      city: 'Bakı',
      industry: 'Maliyyə',
      website: 'https://pashabank.az',
      logo: '/images/pasha_logo.png',
      activeJobs: 8,
      totalEmployees: '3000+',
      rating: 4.9,
      verified: true,
    },
    {
      id: '3',
      name: 'Birbank',
      description: 'Müasir bankçılıq həlləri ilə fərdi və korporativ müştərilərə xidmət göstərən dinamik bank.',
      city: 'Bakı',
      industry: 'Maliyyə',
      website: 'https://birbank.az',
      logo: '/images/birbank.png',
      activeJobs: 6,
      totalEmployees: '2000+',
      rating: 4.7,
      verified: true,
    },
    {
      id: '4',
      name: 'Kontakt Home',
      description: 'Mebel və interyer dizaynı sahəsində lider. Keyfiyyətli məhsullar və peşəkar xidmət.',
      city: 'Bakı',
      industry: 'Dizayn',
      website: 'https://kontakthome.az',
      logo: '/images/kontakt-home-yeni-logo.png',
      activeJobs: 4,
      totalEmployees: '500+',
      rating: 4.6,
      verified: true,
    },
    {
      id: '5',
      name: 'TechCorp Azerbaijan',
      description: 'İT həlləri və texnologiya şirkəti. Software development, cloud services və digital transformation.',
      city: 'Bakı',
      industry: 'IT',
      website: 'https://techcorp.az',
      logo: null,
      activeJobs: 15,
      totalEmployees: '200+',
      rating: 4.5,
      verified: false,
    },
    {
      id: '6',
      name: 'DesignStudio',
      description: 'Kreativ dizayn və branding agentliyi. UI/UX, qrafik dizayn və marketinq həlləri.',
      city: 'Bakı',
      industry: 'Dizayn',
      website: 'https://designstudio.az',
      logo: null,
      activeJobs: 3,
      totalEmployees: '50+',
      rating: 4.4,
      verified: false,
    },
    {
      id: '7',
      name: 'Engineering Solutions',
      description: 'Mühəndislik və konstruksiya layihələri. İnfrastruktur və tikinti sahəsində təcrübəli komanda.',
      city: 'Gəncə',
      industry: 'Mühəndislik',
      website: 'https://engsolutions.az',
      logo: null,
      activeJobs: 7,
      totalEmployees: '300+',
      rating: 4.3,
      verified: false,
    },
    {
      id: '8',
      name: 'Digital Marketing Pro',
      description: 'Rəqəmsal marketinq və sosial media idarəetməsi. SEO, PPC və content marketing xidmətləri.',
      city: 'Bakı',
      industry: 'Marketinq',
      website: 'https://digitalmarketing.az',
      logo: null,
      activeJobs: 5,
      totalEmployees: '80+',
      rating: 4.2,
      verified: false,
    },
  ]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.description.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase())
    const matchesCity = !selectedCity || company.city === selectedCity
    const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry
    return matchesSearch && matchesCity && matchesIndustry
  })

  const stats = [
    { label: 'Aktiv Şirkətlər', value: companies.length, icon: Building2 },
    { label: 'Açıq Vakansiyalar', value: companies.reduce((sum, c) => sum + c.activeJobs, 0), icon: Briefcase },
    { label: 'İşçi Sayı', value: '10K+', icon: Users },
    { label: 'Şəhərlər', value: cities.length, icon: MapPin },
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-20 md:pb-24">
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
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
              x: [0, -40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.15, 0.35, 0.15],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
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
              const icons = [Building2, Briefcase, TrendingUp, CheckCircle, Star, Globe]
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
              { emoji: '👔', position: { top: '15%', right: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '💼', position: { top: '25%', left: '6%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
              { emoji: '🎯', position: { bottom: '20%', right: '12%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
              { emoji: '🚀', position: { bottom: '30%', left: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
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
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
              <Building2 className="h-4 w-4" />
              <span>Şirkətlər</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Bizə <span className="text-blue-600">etibar edən</span> şirkətlər
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              HumanCapital platformasında iş elanı paylaşan aparıcı şirkətlərlə tanış olun. 
              Hər bir şirkət öz komandasına yeni üzvlər axtarır.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Şirkət adı, sənaye və ya təsvir axtar..."
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
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {filteredCompanies.length} şirkət tapıldı
                </span>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Filtrlər</h3>
                  <button
                    onClick={() => {
                      setSelectedCity('')
                      setSelectedIndustry('')
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Təmizlə
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Şəhər
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCity === city
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sənaye
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => setSelectedIndustry(selectedIndustry === industry ? '' : industry)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedIndustry === industry
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl border border-blue-100/60 dark:border-gray-800 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 mb-3">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Şirkət tapılmadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Axtarış parametrlərinizi dəyişdirin və ya filtrləri təmizləyin
              </p>
              <Button onClick={() => {
                setSearch('')
                setSelectedCity('')
                setSelectedIndustry('')
              }}>
                Təmizlə
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCompanies.map((company, index) => {
                const logo = company.logo || getCompanyLogo(company.name)
                return (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/sirketler/${company.id}`}>
                      <div className="group h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Header with Logo */}
                        <div className="p-6 pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              {logo ? (
                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-blue-900/40 p-2 flex items-center justify-center">
                                  <img
                                    src={logo}
                                    alt={company.name}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                                  <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                    {company.name}
                                  </h3>
                                  {company.verified && (
                                    <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{company.city}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                    <span>{company.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                            {company.description}
                          </p>
                        </div>

                        {/* Stats and Info */}
                        <div className="px-6 pb-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Briefcase className="h-4 w-4 mr-1" />
                                <span>{company.activeJobs} vakansiya</span>
                              </div>
                              <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{company.totalEmployees}</span>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium">
                              {company.industry}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex items-center justify-between">
                            {company.website && (
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <Globe className="h-4 w-4 mr-1" />
                                <span>Vebsayt</span>
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            )}
                            <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              <span className="text-sm font-medium mr-1">Ətraflı</span>
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
                const icons = [Building2, Briefcase, Sparkles, Send, Bell, TrendingUp, CheckCircle, Users]
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
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Şirkətinizlə bizə qoşulun
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                HumanCapital platformasında iş elanı paylaşın və düzgün namizədləri tapın. 
                Video CV ilə daha sürətli və effektiv işə qəbul prosesi.
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
    </div>
  )
}

export default Companies
