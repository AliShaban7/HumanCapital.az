import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, 
  HelpCircle, ArrowRight, Sparkles,
  Shield, Headphones, Globe, Users, Briefcase
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'general', // general, candidate, company
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'general',
        subject: '',
        message: '',
      })
    }, 3000)
  }

  const stats = [
    { label: 'Cavab Müddəti', value: '< 10 saat', icon: Clock },
    { label: 'Dəstək Dili', value: '3', icon: Globe },
    { label: 'Online Konsultasiya', value: '7/24', icon: Headphones },
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
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
          
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => {
              const icons = [MessageCircle, Mail, Phone, Users, Briefcase, HelpCircle]
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
              { emoji: '💬', position: { top: '15%', right: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
              { emoji: '📧', position: { top: '25%', left: '6%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
              { emoji: '📞', position: { bottom: '20%', right: '12%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
              { emoji: '🤝', position: { bottom: '30%', left: '8%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
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
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6">
              <MessageCircle className="h-4 w-4" />
              <span>Bizimlə Əlaqə</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
              Bizimlə <span className="text-blue-600">əlaqə saxlayın</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Suallarınız, təklifləriniz və ya köməyə ehtiyacınız varsa, bizimlə əlaqə saxlayın. 
              Komandamız sizə kömək etmək üçün buradadır.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
          </motion.div>
        </div>
      </section>

      {/* Why Contact section removed */}

      {/* Contact Form & Info Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-0 bg-transparent border-0 shadow-none">
                  <div className="rounded-[32px] overflow-hidden border border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                      {/* Left info rail */}
                      <div className="xl:col-span-2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-900 dark:to-blue-950 p-8 md:p-10 text-white flex flex-col gap-8">
                        <div>
                          <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold mb-4">
                            <Sparkles className="h-4 w-4" />
                            <span>Prioritet Dəstək</span>
                          </div>
                          <h2 className="text-3xl font-bold leading-tight mb-3">
                            Mesaj göndərin, 24 saatdan tez cavab verək
                          </h2>
                          <p className="text-blue-100 text-sm leading-relaxed">
                            Komandamız video-CV, namizəd və şirkət dəstəyi üçün həmişə hazırdır.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {[
                            { icon: Headphones, label: '7/24 online dəstək' },
                            { icon: Clock, label: '<10 saat cavab müddəti' },
                            { icon: Shield, label: 'Məlumatların gizliliyi' },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center space-x-3 text-sm font-medium text-blue-50"
                            >
                              <div className="p-2 rounded-2xl bg-white/10">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { title: 'Namizədlər', desc: 'Video CV və profil dəstəyi' },
                            { title: 'Şirkətlər', desc: 'Vakansiyalar və uyğunluq' },
                          ].map((item) => (
                            <div key={item.title} className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                              <p className="text-xs uppercase tracking-wide text-white/70 mb-1">
                                {item.title}
                              </p>
                              <p className="text-sm font-semibold">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Form area */}
                      <div className="xl:col-span-3 p-8 md:p-10 bg-white dark:bg-gray-900">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              Əlaqə Formu
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Formu doldurun və ən qısa zamanda sizinlə əlaqə saxlayaq
                            </p>
                          </div>
                        </div>

                        {isSubmitted ? (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-12"
                          >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 mb-4">
                              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              Mesajınız göndərildi!
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Tezliklə sizinlə əlaqə saxlayacağıq.
                            </p>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Ad Soyad *
                                </label>
                                <Input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  required
                                  className="w-full h-12 rounded-2xl"
                                  placeholder="Adınız və soyadınız"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Email *
                                </label>
                                <Input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  required
                                  className="w-full h-12 rounded-2xl"
                                  placeholder="email@example.com"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Telefon
                                </label>
                                <Input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="w-full h-12 rounded-2xl"
                                  placeholder="+994 50 123 45 67"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Müraciət Növü *
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { value: 'general', label: 'Ümumi' },
                                    { value: 'candidate', label: 'Namizəd' },
                                    { value: 'company', label: 'Şirkət' },
                                  ].map((option) => (
                                    <button
                                      key={option.value}
                                      type="button"
                                      onClick={() => setFormData({ ...formData, type: option.value })}
                                      className={`text-xs font-semibold rounded-2xl py-3 transition-all border ${
                                        formData.type === option.value
                                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-200'
                                      }`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mövzu *
                              </label>
                              <Input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                className="w-full h-12 rounded-2xl"
                                placeholder="Mesajınızın mövzusu"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mesaj *
                              </label>
                              <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={6}
                                className="flex min-h-[150px] w-full rounded-3xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                                placeholder="Mesajınızı buraya yazın..."
                              />
                            </div>

                            <Button
                              type="submit"
                              size="lg"
                              className="w-full h-14 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all rounded-2xl"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Clock className="h-5 w-5 mr-2 animate-spin" />
                                  Göndərilir...
                                </>
                              ) : (
                                <>
                                  <Send className="h-5 w-5 mr-2" />
                                  Mesaj Göndər
                                </>
                              )}
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 relative">
              {/* Decorative background */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border border-blue-100/40 dark:border-blue-900/30 shadow-[0_20px_60px_rgba(15,23,42,0.25)]" />
                <motion.div
                  className="absolute -top-10 -left-6 w-48 h-48 bg-blue-400/30 dark:bg-blue-500/20 blur-3xl rounded-full"
                  animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.2, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-56 h-56 bg-purple-400/30 dark:bg-purple-500/20 blur-3xl rounded-full"
                  animate={{ opacity: [0.2, 0.35, 0.2], scale: [1.1, 0.9, 1.1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
                <div
                  className="absolute inset-4 rounded-[28px] opacity-[0.08]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(59,130,246,0.8) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(59,130,246,0.8) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                />
              </div>
              {/* Direct Contact Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-0 bg-transparent border-0 shadow-none">
                  <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 dark:from-blue-900 dark:via-blue-900 dark:to-blue-950 border border-blue-500/40 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start space-x-4 text-white">
                      <div className="p-3 bg-white rounded-2xl flex-shrink-0 text-blue-600">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Email</h3>
                        <a
                          href="mailto:info@humancapital.az"
                          className="text-white font-semibold text-lg hover:underline"
                        >
                          info@humancapital.az
                        </a>
                        <p className="text-sm text-white/80 mt-1">
                          24/7 dəstək
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-0 bg-transparent border-0 shadow-none">
                  <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 dark:from-blue-900 dark:via-blue-900 dark:to-blue-950 border border-blue-500/40 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start space-x-4 text-white">
                      <div className="p-3 bg-white rounded-2xl flex-shrink-0 text-blue-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Telefon</h3>
                        <a
                          href="tel:+994501234567"
                          className="text-white font-semibold text-lg hover:underline"
                        >
                          +994 50 123 45 67
                        </a>
                        <p className="text-sm text-white/80 mt-1">
                          Bazar ertəsi - Cümə: 09:00 - 18:00
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-0 bg-transparent border-0 shadow-none">
                  <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 dark:from-blue-900 dark:via-blue-900 dark:to-blue-950 border border-blue-500/40 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
                    <div className="flex items-start space-x-4 text-white">
                      <div className="p-3 bg-white rounded-2xl flex-shrink-0 text-blue-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Ünvan</h3>
                        <p className="text-white font-semibold text-lg">
                          Bakı, Azərbaycan
                        </p>
                        <p className="text-sm text-white/80 mt-1">
                          Online konsultasiya mövcuddur
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto rounded-[36px] p-8 md:p-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(15,23,42,0.45)]"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-[0.08]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
                    `,
                    backgroundSize: '70px 70px',
                  }}
                />
              </div>
              <motion.div
                className="absolute -top-10 -right-10 w-72 h-72 bg-white/30 rounded-full blur-3xl"
                animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-blue-300/30 rounded-full blur-3xl"
                animate={{ opacity: [0.15, 0.3, 0.15], scale: [1.1, 0.9, 1.1] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div className="text-white space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                    <span>Hazırsınız başlamağa?</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-3xl shadow-lg">
                    🚀
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                    Karyeranızı növbəti səviyyəyə qaldırın
                  </h2>
                  <p className="text-lg text-white/80">
                    Qeydiyyatdan keçin, video CV yaradın və şirkətlərlə birbaşa əlaqə qurun.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    '30-90 saniyəlik video intro ilə fərqlənin',
                    'Şirkətlərə birbaşa müraciət edin',
                    'Premium namizəd məkanı və sürətli cavablar',
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3 text-white/90">
                      <div className="p-1.5 rounded-full bg-white/20">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/qeydiyyat">
                    <Button size="lg" className="h-14 px-8 text-base bg-white text-blue-600 hover:bg-blue-50 shadow-2xl rounded-2xl">
                      Pulsuz Qeydiyyat
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/resurslar">
                    <button className="h-14 px-8 rounded-2xl border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition">
                      Resurslara Bax
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Premium Namizəd Mərkəzi</p>
                      <h3 className="text-2xl font-bold text-white">2,500+</h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/15 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Video CV-lər', value: '3K+' },
                      { label: 'Şirkətlər', value: '500+' },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-white/10 p-4 text-white border border-white/10">
                        <p className="text-sm text-white/70">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-blue-600/20 border border-white/10 p-4 text-white space-y-2">
                    <p className="text-sm text-white/70">Şirkətlər üçün</p>
                    <p className="text-lg font-semibold">Şirkət hesabı açın və vakansiyalarınızı yerləşdirin</p>
                    <Link to="/elan-paylas" className="inline-flex items-center text-sm font-semibold text-white hover:underline">
                      Elan Paylaş
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
