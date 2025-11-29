import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Send, CheckCircle, Shield, Award, TrendingUp, Users, Briefcase, FileText, HelpCircle, Facebook, Twitter, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from './ui/Button'
import AdSlot from './AdSlot'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <>
      {/* Footer Banner Ad - Before Footer */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <AdSlot
            position="footer-banner"
            format="banner"
            size="728x90"
            priority="standard"
            title="Karyera İnkişafı"
            description="Peşəkar təlim proqramları və sertifikatlar"
            className="hidden md:block"
          />
          <AdSlot
            position="footer-banner-mobile"
            format="banner"
            size="320x100"
            priority="standard"
            title="Karyera İnkişafı"
            className="block md:hidden"
          />
        </div>
      </div>
      
      <footer className="relative mt-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t-2 border-blue-500/30">
      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
      </div>

      {/* Enhanced Newsletter Section */}
      <div className="relative z-10 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-gray-800/40 rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-2xl backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-3 mb-4"
                  >
                    <div className="p-2 bg-blue-600/30 rounded-xl">
                      <Send className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Elanlardan Xəbərdar Olun
                    </h3>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-300 text-lg leading-relaxed"
                  >
                    Yeni iş imkanları, məsləhətlər və platforma yenilikləri haqqında məlumat alın
                  </motion.p>
                </div>
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-row items-center gap-3"
                >
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email ünvanınız"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/80 backdrop-blur-sm border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <span className="flex items-center">
                      Abunə ol
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Section 1: Logo & Brand */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="inline-block group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <img
                    src="/images/HumanCapital_whitelogo.png"
                    alt="HumanCapital"
                    className="h-16 w-auto transition-opacity group-hover:opacity-90 filter drop-shadow-lg"
                  />
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                İş dünyasında yeni dövr – video əsaslı işə qəbul! Peşəkar namizədlərlə şirkətləri birləşdiririk.
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-500/30">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <p className="text-blue-300 italic font-semibold text-base leading-relaxed">
                  "İnsan kapitalına sərmayə, gələcəyə dəyər."
                </p>
              </div>
            </motion.div>
            
            {/* Enhanced Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-3 pt-4"
            >
              <motion.a
                href="https://linkedin.com/company/humancapital"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-blue-600/80 backdrop-blur-sm text-white hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com/humancapital"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://t.me/humancapital"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-400/30"
                aria-label="Telegram"
              >
                <Send className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://facebook.com/humancapital"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-blue-700/80 backdrop-blur-sm text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-600/30"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </div>

          {/* Section 2: For Candidates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-xl mb-6 text-white flex items-center group">
              <div className="p-2 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-600/30 transition-colors">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Namizədlər üçün
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/cv-yukle', label: 'CV Yüklə', icon: FileText },
                { path: '/is-elanlari', label: 'İş Elanları', icon: Briefcase },
                { path: '/namizedler', label: 'Namizəd Profilləri', icon: Users },
                { path: '/resurslar', label: 'Karyera Məsləhətləri', icon: TrendingUp },
                { path: '/qeydiyyat', label: 'Qeydiyyat', icon: CheckCircle },
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 py-2 rounded-lg hover:bg-blue-900/20 px-2 -mx-2"
                  >
                    <div className="p-1.5 bg-gray-700/50 group-hover:bg-blue-600/30 rounded-lg mr-3 transition-colors">
                      <link.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="flex-1">{link.label}</span>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Section 3: For Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-xl mb-6 text-white flex items-center group">
              <div className="p-2 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-600/30 transition-colors">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Şirkətlər üçün
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/elan-paylas', label: 'Elan Paylaş', icon: Send },
                { path: '/namizedler', label: 'Namizəd Axtar', icon: Users },
                { path: '/qiymetler', label: 'Qiymətlər', icon: TrendingUp },
                { path: '/sirketler', label: 'Şirkət Profilləri', icon: Briefcase },
                { path: '/qeydiyyat', label: 'Qeydiyyat', icon: CheckCircle },
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 py-2 rounded-lg hover:bg-blue-900/20 px-2 -mx-2"
                  >
                    <div className="p-1.5 bg-gray-700/50 group-hover:bg-blue-600/30 rounded-lg mr-3 transition-colors">
                      <link.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="flex-1">{link.label}</span>
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Section 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-bold text-xl mb-6 text-white flex items-center group">
              <div className="p-2 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-600/30 transition-colors">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Əlaqə
              </span>
            </h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:info@humancapital.az"
                className="flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 group p-2 rounded-lg hover:bg-blue-900/20 -mx-2"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-gray-700/50 group-hover:bg-blue-600/30 rounded-lg mr-3 transition-colors">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <span className="break-all">info@humancapital.az</span>
              </motion.a>
              <motion.a
                href="tel:+994501234567"
                className="flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 group p-2 rounded-lg hover:bg-blue-900/20 -mx-2"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-gray-700/50 group-hover:bg-blue-600/30 rounded-lg mr-3 transition-colors">
                  <Phone className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <span>+994 50 123 45 67</span>
              </motion.a>
              <div className="flex items-start text-base text-gray-300 p-2 rounded-lg -mx-2">
                <div className="p-2 bg-gray-700/50 rounded-lg mr-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <span>Bakı, Azərbaycan</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative my-12"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gray-800 px-4">
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Copyright & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">HumanCapital</span>. Bütün hüquqlar qorunur.
            </p>
            <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <p className="text-xs text-gray-500">
              Azərbaycanın ilk video-CV platforması
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link
              to="/haqqimizda"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group"
            >
              Məxfilik Siyasəti
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              to="/haqqimizda"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 relative group"
            >
              İstifadə Şərtləri
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
    </>
  )
}

export default Footer

