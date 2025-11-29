import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Star, 
  Sparkles, 
  Rocket, 
  Target, 
  Award,
  Crown,
  Building2,
  CheckCircle2,
  Gift,
  Headphones,
  BarChart3,
  Globe,
  Lock,
  Code,
  Users2,
  FileText,
  Video,
  Search,
  Bell,
  Mail,
  Eye,
  Briefcase,
  Send
} from 'lucide-react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'candidate',
      name: 'Namizəd',
      badge: 'Pulsuz',
      badgeColor: 'from-green-500 to-emerald-600',
      price: '0',
      annualPrice: '0',
      period: 'AZN',
      description: 'Karyeranızı inkişaf etdirmək üçün bütün əsas alətlər',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { text: 'Video CV yükləmə və redaktə', icon: Video },
        { text: 'Tam profil yaratma və idarəetmə', icon: FileText },
        { text: 'Limitsiz iş elanlarına müraciət', icon: Send },
        { text: 'PDF CV yükləmə və paylaşma', icon: FileText },
        { text: 'Şirkətlərlə birbaşa əlaqə', icon: Mail },
        { text: 'İş elanlarına bildirişlər', icon: Bell },
        { text: 'Əsas statistikalar və analitika', icon: BarChart3 },
        { text: 'Profil baxışlarını izləmə', icon: Eye },
      ],
      limitations: [
        { text: 'Premium namizəd axtarışı yoxdur', icon: Search },
        { text: 'Məhdud CV görüntüləmə', icon: Eye },
      ],
      popular: false,
      cta: 'Pulsuz Başla',
      ctaVariant: 'outline' as const,
      link: '/qeydiyyat',
      highlight: false,
    },
    {
      id: 'startup',
      name: 'Şirkət - Başlanğıc',
      badge: 'Ən Populyar',
      badgeColor: 'from-purple-500 to-pink-600',
      price: '99',
      annualPrice: '990',
      period: 'AZN/ay',
      description: 'Kiçik və orta biznes üçün ideal həll',
      icon: Rocket,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        { text: '5 aktiv iş elanı', icon: Briefcase },
        { text: 'Namizəd profillərinə tam giriş', icon: Users2 },
        { text: 'Video CV izləmə və qiymətləndirmə', icon: Video },
        { text: 'Güclü namizəd axtarış filtrləri', icon: Search },
        { text: 'Ətraflı statistikalar və hesabatlar', icon: BarChart3 },
        { text: 'Email dəstəyi (48 saat cavab)', icon: Headphones },
        { text: 'Şirkət profili yaratma', icon: Building2 },
        { text: 'Branded elan səhifələri', icon: Globe },
        { text: 'Müraciətləri idarəetmə paneli', icon: FileText },
      ],
      limitations: [],
      popular: true,
      cta: 'Planı Seç',
      ctaVariant: 'default' as const,
      link: '/qeydiyyat?plan=startup',
      highlight: true,
      savings: '2 ay pulsuz',
    },
    {
      id: 'professional',
      name: 'Şirkət - Professional',
      badge: 'Ən Çox Seçilən',
      badgeColor: 'from-amber-500 to-orange-600',
      price: '299',
      annualPrice: '2990',
      period: 'AZN/ay',
      description: 'Böyük şirkətlər və HR komandaları üçün',
      icon: Crown,
      color: 'gold',
      gradient: 'from-amber-500 to-orange-500',
      features: [
        { text: 'Limitsiz iş elanları', icon: Briefcase },
        { text: 'Prioritet dəstək (24/7)', icon: Headphones },
        { text: 'Tam analitika və hesabatlar', icon: BarChart3 },
        { text: 'Tam branded şirkət səhifəsi', icon: Globe },
        { text: 'Gələcək namizəd bazasına giriş', icon: Users2 },
        { text: 'Avtomatik namizəd uyğunlaşdırması', icon: Zap },
        { text: 'API inteqrasiyası', icon: Code },
        { text: 'Limitsiz istifadəçi hesabları', icon: Users },
        { text: 'Xüsusi təlim və konsultasiya', icon: Target },
        { text: 'Aylıq performans təhlili', icon: TrendingUp },
        { text: 'Prioritet elan yerləşdirmə', icon: Star },
        { text: 'Təhlükəsizlik və məxfilik', icon: Lock },
      ],
      limitations: [],
      popular: false,
      cta: 'Planı Seç',
      ctaVariant: 'outline' as const,
      link: '/qeydiyyat?plan=professional',
      highlight: false,
      savings: '3 ay pulsuz',
    },
  ]

  const features = [
    { name: 'Video CV yükləmə', free: true, startup: true, professional: true, icon: Video },
    { name: 'PDF CV yükləmə', free: true, startup: true, professional: true, icon: FileText },
    { name: 'Profil yaratma', free: true, startup: true, professional: true, icon: Users },
    { name: 'İş elanlarına müraciət', free: true, startup: true, professional: true, icon: Send },
    { name: 'İş elanı yaratma', free: false, startup: '5 elan', professional: 'Limitsiz', icon: Briefcase },
    { name: 'Namizəd axtarışı', free: false, startup: true, professional: true, icon: Search },
    { name: 'Video CV izləmə', free: false, startup: true, professional: true, icon: Video },
    { name: 'Statistikalar', free: 'Əsas', startup: 'Ətraflı', professional: 'Tam analitika', icon: BarChart3 },
    { name: 'Email dəstəyi', free: false, startup: '48 saat', professional: '24/7 Prioritet', icon: Headphones },
    { name: 'Branded səhifə', free: false, startup: true, professional: true, icon: Globe },
    { name: 'API inteqrasiyası', free: false, startup: false, professional: true, icon: Code },
    { name: 'İstifadəçi hesabları', free: false, startup: '3 istifadəçi', professional: 'Limitsiz', icon: Users2 },
  ]

  const testimonials = [
    {
      name: 'Aysel Məmmədova',
      role: 'HR Mənəcəri, Azercell',
      text: 'Professional plan bizim komandaya çox kömək etdi. Namizəd tapmaq prosesi artıq daha sürətli və effektivdir.',
      avatar: 'AM',
    },
    {
      name: 'Rəşad Həsənov',
      role: 'Frontend Developer',
      text: 'Pulsuz plan sayəsində yaxşı iş tapdım. Video CV funksiyası çox faydalı oldu.',
      avatar: 'RH',
    },
  ]

  const currentPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.price
  }

  const getPeriodText = (plan: typeof plans[0]) => {
    if (isAnnual) {
      return plan.period === 'AZN' ? 'AZN/il' : 'AZN/il'
    }
    return plan.period
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Şəffaf Qiymətləndirmə</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Hər kəs üçün{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                uyğun plan
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Namizədlər üçün tamamilə pulsuz, şirkətlər üçün güclü və səmərəli həllər. 
              Karyeranızı növbəti səviyyəyə qaldırın və ya düzgün namizədi tapın.
            </p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                Aylıq
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <motion.div
                  animate={{ x: isAnnual ? 28 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                İllik
              </span>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold"
                >
                  <Gift className="h-3 w-3" />
                  20% endirim
                </motion.span>
              )}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {[
                { icon: Shield, text: '30 günlük zəmanət', color: 'text-blue-600' },
                { icon: Zap, text: 'Dərhal aktivləşmə', color: 'text-purple-600' },
                { icon: TrendingUp, text: 'Məmnuniyyət zəmanəti', color: 'text-pink-600' },
                { icon: Lock, text: 'Təhlükəsiz ödəniş', color: 'text-green-600' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex items-center space-x-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
            {plans.map((plan, index) => {
              const Icon = plan.icon
                const isHovered = hoveredPlan === plan.id
                const displayPrice = currentPrice(plan)
                const monthlyEquivalent = isAnnual && plan.period !== 'AZN' 
                  ? Math.round(parseInt(plan.annualPrice) / 12) 
                  : parseInt(plan.price)

              return (
                <motion.div
                    key={`${plan.id}-${isAnnual}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    className={`relative ${plan.highlight ? 'md:-mt-6 md:mb-6 z-20' : ''}`}
                >
                    {/* Popular Badge */}
                  {plan.popular && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
                      >
                        <span className={`inline-flex items-center space-x-1 rounded-full bg-gradient-to-r ${plan.badgeColor} text-white px-4 py-1.5 text-xs font-bold shadow-lg`}>
                        <Star className="h-3 w-3 fill-current" />
                        <span>{plan.badge}</span>
                      </span>
                      </motion.div>
                  )}

                    {/* Savings Badge for Annual */}
                    {isAnnual && plan.savings && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -right-2 z-30"
                      >
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
                          <Gift className="h-3 w-3" />
                          {plan.savings}
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      animate={{
                        scale: isHovered ? (plan.highlight ? 1.05 : 1.02) : 1,
                        y: isHovered ? -8 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`relative h-full rounded-3xl border-2 transition-all duration-300 ${
                        plan.highlight
                          ? 'border-purple-500 dark:border-purple-400 bg-white dark:bg-gray-900 shadow-2xl'
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl'
                      } overflow-hidden`}
                  >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 hover:opacity-5 transition-opacity duration-300`} />

                      <div className="relative p-8">
                      {/* Header */}
                      <div className="mb-6">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br ${plan.gradient} shadow-lg`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </motion.div>

                        {!plan.popular && plan.badge && (
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3 ${
                              plan.badge === 'Pulsuz' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' 
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {plan.badge}
                          </span>
                        )}

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {plan.name}
                        </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-baseline">
                          <span className="text-5xl font-bold text-gray-900 dark:text-white">
                              {displayPrice}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2 text-lg">
                              {getPeriodText(plan)}
                          </span>
                        </div>
                          {isAnnual && plan.period !== 'AZN' && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              Ayda ~{monthlyEquivalent} AZN
                            </p>
                          )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-4 mb-8">
                          {plan.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon
                            return (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + idx * 0.05 }}
                                className="flex items-start group"
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/60 transition-colors">
                                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  </div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FeatureIcon className="h-4 w-4 text-gray-400" />
                                    {feature.text}
                            </span>
                                </div>
                              </motion.li>
                            )
                          })}
                          {plan.limitations.map((limitation, idx) => {
                            const LimitationIcon = limitation.icon
                            return (
                          <li key={`lim-${idx}`} className="flex items-start opacity-60">
                            <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
                                  <LimitationIcon className="h-4 w-4" />
                                  {limitation.text}
                            </span>
                          </li>
                            )
                          })}
                      </ul>

                      {/* CTA */}
                      <Link to={plan.link}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                        <Button
                          className={`w-full ${
                                plan.highlight
                                  ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white shadow-lg`
                              : ''
                          }`}
                              variant={plan.ctaVariant}
                          size="lg"
                        >
                          {plan.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                          </motion.div>
                      </Link>
                    </div>
                    </motion.div>
                </motion.div>
              )
            })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Xüsusiyyətləri müqayisə edin
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Bütün planların təklif etdiyi funksiyaları görün
              </p>
            </div>

            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                      <th className="text-left p-6 font-bold text-gray-900 dark:text-white">
                        Xüsusiyyət
                      </th>
                      <th className="text-center p-6 font-bold text-gray-900 dark:text-white">
                        Namizəd
                      </th>
                      <th className="text-center p-6 font-bold text-gray-900 dark:text-white bg-purple-50 dark:bg-purple-900/20">
                        Başlanğıc
                      </th>
                      <th className="text-center p-6 font-bold text-gray-900 dark:text-white">
                        Professional
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, idx) => {
                      const FeatureIcon = feature.icon
                      return (
                        <motion.tr
                        key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                          <td className="p-6 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                            <FeatureIcon className="h-5 w-5 text-gray-400" />
                          {feature.name}
                        </td>
                          <td className="p-6 text-center">
                          {feature.free === true ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                          ) : feature.free === false ? (
                              <X className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {feature.free}
                            </span>
                          )}
                        </td>
                          <td className="p-6 text-center bg-purple-50/50 dark:bg-purple-900/10">
                          {feature.startup === true ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                          ) : feature.startup === false ? (
                              <X className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {feature.startup}
                            </span>
                          )}
                        </td>
                          <td className="p-6 text-center">
                          {feature.professional === true ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto" />
                          ) : feature.professional === false ? (
                              <X className="h-6 w-6 text-gray-400 mx-auto" />
                          ) : (
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {feature.professional}
                            </span>
                          )}
                        </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Müştərilərimiz nə deyir
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Minlərlə məmnun istifadəçi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="border-0 shadow-2xl overflow-hidden relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => {
                  const icons = [Sparkles, Target, Star, Rocket, Award]
                  const Icon = icons[i % icons.length]
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${10 + (i % 5) * 18}%`,
                        top: `${15 + Math.floor(i / 5) * 30}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-white/20" />
                    </motion.div>
                  )
                })}
              </div>

              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6"
                  >
              <Target className="h-8 w-8 text-white" />
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Karyeranızı növbəti səviyyəyə qaldırın
            </h2>

                  <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              İndi başlayın və HumanCapital ilə iş dünyasında yeni dövrə qoşulun. 
              Pulsuz qeydiyyatdan keçin və dərhal istifadə etməyə başlayın.
            </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/qeydiyyat">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-lg px-8 py-6">
                  Pulsuz Qeydiyyat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                      </motion.div>
              </Link>
              <Link to="/elaqe">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center h-14 px-8 text-lg rounded-xl font-medium transition-all duration-200 bg-transparent border-2 border-white text-white hover:bg-white/10 hover:text-white shadow-lg hover:shadow-xl"
                      >
                  Bizimlə Əlaqə
                      </motion.button>
              </Link>
            </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-blue-100 text-sm flex items-center justify-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Kredit kartı tələb olunmur • İstənilən vaxt ləğv edin
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
