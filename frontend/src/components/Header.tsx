import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'
import { useAuthStore } from '../store/authStore'
import Button from './ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { user, logout, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Ana Səhifə' },
    { path: '/haqqimizda', label: 'Haqqımızda' },
    { path: '/qiymetler', label: 'Qiymətlər' },
    { path: '/sirketler', label: 'Şirkətlər' },
    { path: '/is-elanlari', label: 'İş Elanları' },
    { path: '/namizedler', label: 'Namizədlər' },
    { path: '/resurslar', label: 'Resurslar' },
    { path: '/elaqe', label: 'Əlaqə' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-blue-100 dark:border-gray-800'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <img
              src="/images/HumanCapital_logo.png"
              alt="HumanCapital"
              className="h-10 w-auto dark:hidden transition-opacity group-hover:opacity-80"
            />
            <img
              src="/images/HumanCapital_whitelogo.png"
              alt="HumanCapital"
              className="h-10 w-auto hidden dark:block transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group whitespace-nowrap"
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Auth Buttons */}
            {isAuthenticated() ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link to={user?.role === 'CANDIDATE' ? '/namized/dashboard' : '/sirket/dashboard'}>
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Çıxış
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/giris">
                  <Button variant="ghost" size="sm">
                    Giriş
                  </Button>
                </Link>
                <Link to="/qeydiyyat">
                  <Button size="sm">Qeydiyyat</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-xl transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated() ? (
                <div className="pt-4 space-y-2 border-t border-blue-100 dark:border-gray-800 mt-2">
                  <Link
                    to={user?.role === 'CANDIDATE' ? '/namized/dashboard' : '/sirket/dashboard'}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Çıxış
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-2 border-t border-blue-100 dark:border-gray-800 mt-2">
                  <Link
                    to="/giris"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-center text-gray-700 dark:text-gray-300"
                  >
                    Giriş
                  </Link>
                  <Link
                    to="/qeydiyyat"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Qeydiyyat
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

