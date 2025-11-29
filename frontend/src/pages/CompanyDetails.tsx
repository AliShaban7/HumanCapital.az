import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, MapPin, Globe, Mail, Phone, ArrowLeft, ArrowRight, Briefcase, Users, 
  Star, CheckCircle, ExternalLink, Calendar, Target
} from 'lucide-react'
import Button from '../components/ui/Button'
import JobCard from '../components/JobCard'
import { getCompanyLogo } from '../lib/companyLogos'

const CompanyDetails = () => {
  const { id } = useParams()

  // Mock data - will be replaced with API
  const companies = {
    '1': {
      id: '1',
      name: 'Azercell',
      description: 'Azərbaycanın aparıcı telekommunikasiya şirkəti. İnnovativ texnologiyalar və müştəri məmnuniyyəti ilə ön planda. 25 ildən artıq təcrübə ilə ölkənin ən böyük mobil operatorlarından biridir.',
      city: 'Bakı',
      industry: 'IT',
      website: 'https://azercell.com',
      email: 'info@azercell.com',
      phone: '+994 12 123 45 67',
      logo: '/images/azercell_logo-cropped.svg',
      activeJobs: 12,
      totalEmployees: '5000+',
      rating: 4.8,
      verified: true,
      founded: '1996',
      about: 'Azercell 1996-cı ildə yaradılmış və Azərbaycanın telekommunikasiya bazarında lider mövqeyə sahibdir. Şirkət innovativ texnologiyalar, yüksək keyfiyyətli xidmətlər və müştəri məmnuniyyəti ilə fərqlənir. Komandamız 5000-dən çox peşəkar mütəxəssisdən ibarətdir və daim inkişaf edir.',
    },
    '2': {
      id: '2',
      name: 'PASHA Bank',
      description: 'Azərbaycanın ən böyük banklarından biri. Müştərilərə geniş spektrli maliyyə xidmətləri təqdim edir.',
      city: 'Bakı',
      industry: 'Maliyyə',
      website: 'https://pashabank.az',
      email: 'info@pashabank.az',
      phone: '+994 12 234 56 78',
      logo: '/images/pasha_logo.png',
      activeJobs: 8,
      totalEmployees: '3000+',
      rating: 4.9,
      verified: true,
      founded: '2007',
      about: 'PASHA Bank Azərbaycanın aparıcı banklarından biridir və fərdi, kiçik biznes və korporativ müştərilərə geniş spektrli maliyyə xidmətləri təqdim edir. Bank innovativ maliyyə həlləri ilə müştərilərinin uğuruna töhfə verir.',
    },
    '3': {
      id: '3',
      name: 'Birbank',
      description: 'Müasir bankçılıq həlləri ilə fərdi və korporativ müştərilərə xidmət göstərən dinamik bank.',
      city: 'Bakı',
      industry: 'Maliyyə',
      website: 'https://birbank.az',
      email: 'info@birbank.az',
      phone: '+994 12 345 67 89',
      logo: '/images/birbank.png',
      activeJobs: 6,
      totalEmployees: '2000+',
      rating: 4.7,
      verified: true,
      founded: '2010',
      about: 'Birbank müasir bankçılıq xidmətləri ilə müştərilərinə ən yaxşı həlləri təqdim edir. Bank innovativ texnologiyalar və peşəkar komanda ilə fərqlənir.',
    },
    '4': {
      id: '4',
      name: 'Kontakt Home',
      description: 'Mebel və interyer dizaynı sahəsində lider. Keyfiyyətli məhsullar və peşəkar xidmət.',
      city: 'Bakı',
      industry: 'Dizayn',
      website: 'https://kontakthome.az',
      email: 'info@kontakthome.az',
      phone: '+994 12 456 78 90',
      logo: '/images/kontakt-home-yeni-logo.png',
      activeJobs: 4,
      totalEmployees: '500+',
      rating: 4.6,
      verified: true,
      founded: '2005',
      about: 'Kontakt Home 20 ildən artıq təcrübə ilə mebel və interyer dizaynı sahəsində liderdir. Şirkət keyfiyyətli məhsullar və peşəkar xidmətlə müştərilərinə mükəmməl həllər təqdim edir.',
    },
    '5': {
      id: '5',
      name: 'TechCorp Azerbaijan',
      description: 'İT həlləri və texnologiya şirkəti. Software development, cloud services və digital transformation.',
      city: 'Bakı',
      industry: 'IT',
      website: 'https://techcorp.az',
      email: 'info@techcorp.az',
      phone: '+994 12 567 89 01',
      logo: null,
      activeJobs: 15,
      totalEmployees: '200+',
      rating: 4.5,
      verified: false,
      founded: '2015',
      about: 'TechCorp Azerbaijan müasir İT həlləri ilə müştərilərinə yüksək keyfiyyətli xidmətlər təqdim edir. Software development, cloud services və digital transformation sahələrində təcrübəli komandamız var.',
    },
    '6': {
      id: '6',
      name: 'DesignStudio',
      description: 'Kreativ dizayn və branding agentliyi. UI/UX, qrafik dizayn və marketinq həlləri.',
      city: 'Bakı',
      industry: 'Dizayn',
      website: 'https://designstudio.az',
      email: 'info@designstudio.az',
      phone: '+994 12 678 90 12',
      logo: null,
      activeJobs: 3,
      totalEmployees: '50+',
      rating: 4.4,
      verified: false,
      founded: '2018',
      about: 'DesignStudio kreativ dizayn və branding sahəsində peşəkar xidmətlər təqdim edir. UI/UX dizayn, qrafik dizayn və marketinq həlləri ilə müştərilərimizin uğuruna töhfə veririk.',
    },
    '7': {
      id: '7',
      name: 'Engineering Solutions',
      description: 'Mühəndislik və konstruksiya layihələri. İnfrastruktur və tikinti sahəsində təcrübəli komanda.',
      city: 'Gəncə',
      industry: 'Mühəndislik',
      website: 'https://engsolutions.az',
      email: 'info@engsolutions.az',
      phone: '+994 22 789 01 23',
      logo: null,
      activeJobs: 7,
      totalEmployees: '300+',
      rating: 4.3,
      verified: false,
      founded: '2012',
      about: 'Engineering Solutions mühəndislik və konstruksiya layihələri sahəsində təcrübəli komandaya malikdir. İnfrastruktur və tikinti layihələrində yüksək keyfiyyətli həllər təqdim edirik.',
    },
    '8': {
      id: '8',
      name: 'Digital Marketing Pro',
      description: 'Rəqəmsal marketinq və sosial media idarəetməsi. SEO, PPC və content marketing xidmətləri.',
      city: 'Bakı',
      industry: 'Marketinq',
      website: 'https://digitalmarketing.az',
      email: 'info@digitalmarketing.az',
      phone: '+994 12 890 12 34',
      logo: null,
      activeJobs: 5,
      totalEmployees: '80+',
      rating: 4.2,
      verified: false,
      founded: '2019',
      about: 'Digital Marketing Pro rəqəmsal marketinq və sosial media idarəetməsi sahəsində peşəkar xidmətlər təqdim edir. SEO, PPC və content marketing həlləri ilə müştərilərimizin onlayn uğuruna kömək edirik.',
    },
  }

  if (!id || !companies[id as keyof typeof companies]) {
    // If company not found, show a message or redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Şirkət tapılmadı
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Axtardığınız şirkət mövcud deyil və ya silinib.
          </p>
          <Link to="/sirketler">
            <Button>Şirkətlərə Qayıt</Button>
          </Link>
        </div>
      </div>
    )
  }

  const company = companies[id as keyof typeof companies]

  // Mock jobs for this company
  const companyJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: company.name,
      city: company.city,
      salary: '2000-3000 AZN',
      category: 'IT',
      experience: '2-5 il',
      createdAt: new Date().toISOString(),
      views: 1245,
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: company.name,
      city: company.city,
      salary: '2500-3500 AZN',
      category: 'IT',
      experience: '3-5 il',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      views: 892,
    },
    {
      id: '3',
      title: 'Mobile App Developer',
      company: company.name,
      city: company.city,
      salary: '2200-3200 AZN',
      category: 'IT',
      experience: '2-4 il',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      views: 756,
    },
  ]

  const companyLogo = company.logo || getCompanyLogo(company.name)

  const stats = [
    { label: 'Aktiv Vakansiyalar', value: company.activeJobs, icon: Briefcase, bgColor: 'bg-blue-100 dark:bg-blue-900/40', iconColor: 'text-blue-600 dark:text-blue-400' },
    { label: 'İşçi Sayı', value: company.totalEmployees, icon: Users, bgColor: 'bg-green-100 dark:bg-green-900/40', iconColor: 'text-green-600 dark:text-green-400' },
    { label: 'Reytinq', value: company.rating, icon: Star, bgColor: 'bg-yellow-100 dark:bg-yellow-900/40', iconColor: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Qurulma İli', value: company.founded, icon: Calendar, bgColor: 'bg-purple-100 dark:bg-purple-900/40', iconColor: 'text-purple-600 dark:text-purple-400' },
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/sirketler" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Şirkətlərə qayıt</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                {companyLogo ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-blue-900/40 p-4 flex items-center justify-center shadow-md">
                    <img
                      src={companyLogo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shadow-md">
                    <Building2 className="h-12 w-12 md:h-16 md:w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {company.name}
                      </h1>
                      {company.verified && (
                        <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{company.city}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{company.rating}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium">
                        {company.industry}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {company.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      <span>Vebsayt</span>
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  )}
                  {company.email && (
                    <a
                      href={`mailto:${company.email}`}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      <span>Email</span>
                    </a>
                  )}
                  {company.phone && (
                    <a
                      href={`tel:${company.phone}`}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Telefon</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bgColor} mb-2`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
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

      {/* About Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Şirkət Haqqında
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {company.about}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Açıq Vakansiyalar
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {company.name} şirkətinin aktiv iş elanları
                </p>
              </div>
              <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                {companyJobs.length} elan
              </span>
            </div>
          </motion.div>

          {companyJobs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Hal-hazırda açıq vakansiya yoxdur
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Yeni vakansiyalar üçün bizi izləyin
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-blue-700/95 to-purple-700/95" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Bu şirkətdə işləmək istəyirsiniz?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Yuxarıdakı vakansiyalara müraciət edin və ya şirkətlə birbaşa əlaqə saxlayın
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/is-elanlari">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
                    Bütün Vakansiyalara Bax
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {company.email && (
                  <a href={`mailto:${company.email}`}>
                    <button className="inline-flex items-center justify-center h-12 px-8 text-lg rounded-xl font-medium transition-all duration-200 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white shadow-md hover:shadow-lg">
                      <Mail className="mr-2 h-5 w-5" />
                      Email Göndər
                    </button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CompanyDetails

