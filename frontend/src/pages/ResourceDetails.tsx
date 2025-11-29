import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { 
  Calendar, User, ArrowLeft, Clock, Eye, Bookmark, 
  Facebook, Twitter, Linkedin, Copy, Check, ArrowRight,
  FileText, Lightbulb, Briefcase, Video, Award,
  Heart, MessageCircle, BookOpen
} from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'

const ResourceDetails = () => {
  const { id } = useParams()
  const contentRef = useRef<HTMLDivElement>(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(1247)
  const [copied, setCopied] = useState(false)
  const [activeHeading, setActiveHeading] = useState('')
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start start', 'end end']
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mock data - will be replaced with API
  const article = {
    id: id || '1',
    title: 'Video CV hazırlamaq üçün 10 məsləhət',
    excerpt: 'Video CV-nizi daha cəlbedici etmək üçün praktik məsləhətlər. İşəgötürənlərin diqqətini cəlb edəcək video CV yaratmağın sirləri.',
    content: `
      <p class="lead">Video CV hazırlamaq müasir iş dünyasında vacib bacarıqdır. Bu məqalədə sizə praktik məsləhətlər verəcəyik ki, özünüzü ən yaxşı şəkildə təqdim edə biləsiniz.</p>
      
      <h2 id="heading-1">1. Yaxşı işıqlandırma</h2>
      <p>Video çəkilişi zamanı yaxşı işıqlandırma çox vacibdir. Təbii işıqdan istifadə edin və pəncərə yaxınlığında çəkin. Əgər təbii işıq kifayət etmirsə, əlavə işıq mənbələri istifadə edin.</p>
      <ul>
        <li>Pəncərə yaxınlığında çəkin</li>
        <li>Üzünüzə birbaşa işıq düşməməlidir</li>
        <li>Arxa planda parlaq işıq olmamalıdır</li>
      </ul>
      
      <h2 id="heading-2">2. Səssiz mühit</h2>
      <p>Kənar səslərin olmadığı səssiz mühit seçin. Əgər evdə çəkirsinizsə, ailə üzvlərindən və ya ev heyvanlarından uzaq ola biləcəyiniz bir otaq seçin.</p>
      <p>Mikrofonun keyfiyyəti də vacibdir. Əgər smartfon istifadə edirsinizsə, xarici mikrofon istifadə etməyi düşünün.</p>
      
      <h2 id="heading-3">3. Professional görünüş</h2>
      <p>İş mühitinə uyğun geyim seçin. Video CV-nizdə özünüzü iş yerində necə görünəcəyinizi göstərməlisiniz. Düzgün geyim seçimi işəgötürənlərin sizə olan ilk təəssüratını müsbət təsir edir.</p>
      
      <h2 id="heading-4">4. Kamera bucağı və kompozisiya</h2>
      <p>Kameranı göz səviyyəsində yerləşdirin. Üzünüz ekranın mərkəzində olsun və yuxarıdan bir az boşluq buraxın. Beləliklə, daha professional görünəcəksiniz.</p>
      
      <h2 id="heading-5">5. Məzmun hazırlığı</h2>
      <p>Video CV-nizdə nə danışacağınızı əvvəlcədən planlaşdırın. Əsas məqamları qeyd edin və təcrübənizi vurğulayın. Lakin həddən artıq hazırlıq etməyin - təbii görünməlisiniz.</p>
      
      <h2 id="heading-6">6. Müddət</h2>
      <p>Video CV-nizin müddəti 30-90 saniyə arasında olmalıdır. Bu müddət işəgötürənlərin diqqətini saxlamaq üçün kifayətdir.</p>
      
      <h2 id="heading-7">7. Təcrübə və bacarıqlar</h2>
      <p>Öz təcrübənizi və bacarıqlarınızı konkret nümunələrlə təqdim edin. Rəqəmlər və nəticələr istifadə edin.</p>
      
      <h2 id="heading-8">8. Bədən dili</h2>
      <p>Bədən diliniz özünü inamla təqdim etməyinizə kömək edir. Düz oturun, göz təması saxlayın və təbii gülümsəyin.</p>
      
      <h2 id="heading-9">9. Redaktə və montaj</h2>
      <p>Video CV-nizi redaktə edərkən sadə və professional görünüşü saxlayın. Əlavə effektlər və animasiyalar istifadə etməyin.</p>
      
      <h2 id="heading-10">10. Test və təkmilləşdirmə</h2>
      <p>Video CV-nizi bir neçə dəfə izləyin və dostlarınızdan rəy alın. Təkmilləşdirmə üçün məsləhətləri nəzərə alın.</p>
    `,
    author: 'HumanCapital Team',
    authorBio: 'HumanCapital komandası karyera inkişafı və işə qəbul prosesi üzrə məsləhətlər verir.',
    authorAvatar: null,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: '7 dəq',
    views: 1245,
    category: 'video-cv',
    tags: ['Video CV', 'Karyera', 'İşə Qəbul', 'Məsləhətlər'],
    imageUrl: null,
  }

  const relatedArticles = [
    {
      id: '2',
      title: 'İş müsahibəsində uğur qazanmaq',
      excerpt: 'Müsahibədə özünüzü düzgün təqdim etmək üçün tövsiyələr.',
      category: 'interview',
      readTime: '7 dəq',
      views: 892,
    },
    {
      id: '3',
      title: 'Karyera planı necə hazırlanır?',
      excerpt: 'Uzunmüddətli karyera məqsədlərinizi müəyyənləşdirmək üçün bələdçi.',
      category: 'career',
      readTime: '10 dəq',
      views: 634,
    },
    {
      id: '4',
      title: 'Texniki bacarıqların inkişafı',
      excerpt: 'İT sahəsində özünüzü necə inkişaf etdirmək olar.',
      category: 'skills',
      readTime: '8 dəq',
      views: 1123,
    },
  ]

  const categories = [
    { id: 'video-cv', label: 'Video CV', icon: Video, color: 'blue' },
    { id: 'career', label: 'Karyera', icon: Briefcase, color: 'purple' },
    { id: 'interview', label: 'Müsahibə', icon: User, color: 'green' },
    { id: 'skills', label: 'Bacarıqlar', icon: Award, color: 'yellow' },
    { id: 'tips', label: 'Məsləhətlər', icon: Lightbulb, color: 'orange' },
  ]

  const category = categories.find(cat => cat.id === article.category)
  const CategoryIcon = category?.icon || FileText

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

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = article.title
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  // Extract headings for table of contents dynamically
  useEffect(() => {
    if (contentRef.current) {
      const headingElements = contentRef.current.querySelectorAll('h2')
      const extractedHeadings: { id: string; text: string }[] = []
      
      headingElements.forEach((heading) => {
        const id = heading.id || heading.getAttribute('id') || ''
        const text = heading.textContent || ''
        if (id && text) {
          extractedHeadings.push({ id, text })
        }
      })
      
      setHeadings(extractedHeadings)
      
      // Set up intersection observer for active heading tracking
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id)
            }
          })
        },
        { rootMargin: '-20% 0% -35% 0%' }
      )
      
      headingElements.forEach((heading) => observer.observe(heading))
      
      return () => {
        headingElements.forEach((heading) => observer.unobserve(heading))
      }
    }
  }, [article.content])

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
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
              const icons = [BookOpen, FileText, Video, Lightbulb, Award, Briefcase]
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
          {/* Back Button */}
          <Link 
            to="/resurslar" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Geri qayıt</span>
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold text-sm">
                <CategoryIcon className="h-4 w-4" />
                <span>{category?.label || 'Məqalə'}</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {article.excerpt}
            </motion.p>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{article.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Müəllif</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Clock className="h-5 w-5" />
                <span className="text-sm">{article.readTime} oxuma</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Eye className="h-5 w-5" />
                <span className="text-sm">{formatViews(article.views)} baxış</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isBookmarked
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>Saxla</span>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="Facebook-da paylaş"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="Twitter-də paylaş"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="LinkedIn-də paylaş"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="Linki kopyala"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-7xl mx-auto grid grid-cols-1 ${headings.length > 0 ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8`}>
            {/* Table of Contents - Sticky Sidebar */}
            {headings.length > 0 && (
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-24">
                  <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Məzmun
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            const element = document.getElementById(heading.id)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                          className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                            activeHeading === heading.id
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </Card>
                </div>
              </aside>
            )}

            {/* Article Content */}
            <article className={headings.length > 0 ? "lg:col-span-9 order-1 lg:order-2" : "lg:col-span-1 order-1"}>
              <Card className="p-8 md:p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div
                  ref={contentRef}
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-2xl prose-h2:scroll-mt-24 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-ul:my-6 prose-li:my-2 prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </Card>

              {/* Author Card */}
              <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {article.author}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {article.authorBio}
                    </p>
                    <Link
                      to="/resurslar"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      Daha çox məqalə
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Engagement Section */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-all ${
                      isLiked
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-semibold">{likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="h-6 w-6" />
                    <span className="font-semibold">Şərh yaz</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Paylaş:</span>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Əlaqəli Məqalələr
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Daha çox faydalı məqalələr
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => {
                const relatedCategory = categories.find(cat => cat.id === relatedArticle.category)
                const RelatedCategoryIcon = relatedCategory?.icon || FileText
                return (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/resurslar/${relatedArticle.id}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-800">
                        <div className="p-6">
                          <div className="flex items-center space-x-2 mb-4">
                            <RelatedCategoryIcon className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {relatedCategory?.label}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                            {relatedArticle.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{relatedArticle.readTime}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{formatViews(relatedArticle.views)}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
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
            className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-blue-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Sophisticated Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Base Gradient Mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-purple-700/80 dark:from-blue-800/90 dark:via-blue-900/90 dark:to-purple-900/80" />
              
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(255, 255, 255) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(255, 255, 255) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
              
              {/* Animated Blur Orbs */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.3, 0.15],
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.35, 0.2],
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.25, 0.1],
                  x: [0, 30, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl"
              />
              
              {/* Floating Geometric Shapes */}
              {[...Array(8)].map((_, i) => {
                const sizes = [60, 80, 100, 70, 90, 75, 85, 65]
                const positions = [
                  { top: '10%', left: '8%' },
                  { top: '15%', right: '10%' },
                  { bottom: '12%', left: '12%' },
                  { bottom: '18%', right: '8%' },
                  { top: '50%', left: '5%' },
                  { top: '55%', right: '6%' },
                  { bottom: '45%', left: '15%' },
                  { bottom: '50%', right: '12%' },
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
                      y: [0, -25, 0],
                      rotate: [0, 180, 360],
                      opacity: [0.08, 0.15, 0.08],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 7 + i * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  >
                    <div className="w-full h-full border-2 border-white/20 rounded-lg rotate-45" />
                  </motion.div>
                )
              })}
              
              {/* Floating Icons */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => {
                  const icons = [BookOpen, FileText, Video, Lightbulb, Award, Briefcase, BookOpen, FileText, Video, Lightbulb]
                  const Icon = icons[i % icons.length]
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${8 + (i % 5) * 20}%`,
                        top: `${12 + Math.floor(i / 5) * 35}%`,
                      }}
                      animate={{
                        y: [0, -35, 0],
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.15, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 5 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-white/20" />
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Wave Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
                <motion.div
                  animate={{
                    x: [0, -100, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 30, 50 50 T100 50 L100 100 L0 100 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    backgroundRepeat: 'repeat-x',
                  }}
                />
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6"
              >
                <BookOpen className="h-8 w-8 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4"
              >
                Daha çox məqalə oxuyun
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
              >
                Karyeranızı inkişaf etdirmək üçün daha çox resurs və məsləhətlər
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/resurslar">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    Bütün Məqalələrə Bax
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ResourceDetails
