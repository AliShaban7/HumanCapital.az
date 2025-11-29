import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Video, Camera, Square, CheckCircle, Lightbulb, X, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const VideoCVUpload = () => {
  const navigate = useNavigate()
  const { user: _user } = useAuthStore()
  const [mode, setMode] = useState<'select' | 'upload' | 'record'>('select')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const tips = [
    {
      icon: '🎯',
      title: 'Qısa və məqsədyönlü olun',
      description: '30-90 saniyə arası ideal uzunluqdur. Qısa və effektiv olun.',
    },
    {
      icon: '👔',
      title: 'Peşəkar görünün',
      description: 'Təmiz və düzgün geyimin, yaxşı işıqlandırma və sakit mühit.',
    },
    {
      icon: '💬',
      title: 'Özünüzü təqdim edin',
      description: 'Adınız, peşəniz, əsas bacarıqlarınız və nə üçün bu işə uyğun olduğunuzu qeyd edin.',
    },
    {
      icon: '😊',
      title: 'Müsbət və enerjili olun',
      description: 'Gülümsəyin, özünüzə inam göstərin və həvəslə danışın.',
    },
    {
      icon: '👀',
      title: 'Kameraya baxın',
      description: 'Kameraya birbaşa baxın, təbii və rahat görünün.',
    },
    {
      icon: '🎬',
      title: 'Bir neçə dəfə çəkin',
      description: 'Ən yaxşısını seçmək üçün bir neçə dəfə çəkin və ən yaxşısını yükləyin.',
    },
  ]

  useEffect(() => {
    return () => {
      // Cleanup: stop recording and release camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
      })

      chunksRef.current = []
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        setVideoBlob(blob)
        const url = URL.createObjectURL(blob)
        setVideoPreview(url)
        setMode('select')
        setIsRecording(false)
        setRecordingTime(0)
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      let seconds = 0
      timerRef.current = setInterval(() => {
        seconds++
        setRecordingTime(seconds)
      }, 1000)
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Kameraya giriş mümkün olmadı. Zəhmət olmasa icazələri yoxlayın.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setError('Video fayl çox böyükdür. Maksimum 100MB olmalıdır.')
        return
      }
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
      setError('')
    }
  }

  const handleSubmit = async () => {
    if (!videoFile && !videoBlob) {
      setError('Zəhmət olmasa video seçin və ya çəkin')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      
      // Use recorded blob or uploaded file
      if (videoBlob) {
        const file = new File([videoBlob], 'video-cv.webm', { type: 'video/webm' })
        formData.append('video', file)
      } else if (videoFile) {
        formData.append('video', videoFile)
      }

      // Get existing candidate profile to update
      const userResponse = await api.get('/users/me')
      const existingCandidate = userResponse.data.candidate

      if (existingCandidate) {
        // Update existing profile with video
        const updateFormData = new FormData()
        updateFormData.append('firstName', existingCandidate.firstName || '')
        updateFormData.append('lastName', existingCandidate.lastName || '')
        if (existingCandidate.phone) updateFormData.append('phone', existingCandidate.phone)
        if (existingCandidate.city) updateFormData.append('city', existingCandidate.city)
        if (existingCandidate.profession) updateFormData.append('profession', existingCandidate.profession)
        if (existingCandidate.bio) updateFormData.append('bio', existingCandidate.bio)
        if (existingCandidate.portfolio) updateFormData.append('portfolio', existingCandidate.portfolio)
        if (existingCandidate.skills && Array.isArray(existingCandidate.skills)) {
          updateFormData.append('skills', JSON.stringify(existingCandidate.skills))
        }
        // Add video
        updateFormData.append('video', videoBlob ? new File([videoBlob], 'video-cv.webm', { type: 'video/webm' }) : videoFile!)

        await api.post('/candidates/create', updateFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        // If no profile exists, redirect to create profile first
        setError('Zəhmət olmasa əvvəlcə profil məlumatlarınızı tamamlayın. Profil yaratmaq üçün CV Yüklə səhifəsinə keçin.')
        setLoading(false)
        setTimeout(() => {
          navigate('/cv-yukle')
        }, 3000)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/namized/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Error uploading video:', err)
      setError(err.response?.data?.message || 'Video yüklənərkən xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  const resetVideo = () => {
    setVideoFile(null)
    setVideoBlob(null)
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setVideoPreview(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        
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
            const icons = [Video, Camera, Upload, CheckCircle, Lightbulb]
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
            { emoji: '🎥', position: { top: '12%', right: '10%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
            { emoji: '📹', position: { top: '22%', left: '5%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
            { emoji: '✨', position: { bottom: '18%', right: '8%' }, size: 'w-18 h-18 md:w-26 md:h-26' },
            { emoji: '🎬', position: { bottom: '28%', left: '6%' }, size: 'w-20 h-20 md:w-28 md:h-28' },
            { emoji: '💼', position: { top: '50%', right: '4%' }, size: 'w-16 h-16 md:w-24 md:h-24' },
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/namized/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri qayıt
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Video CV Yüklə
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Özünüzü təqdim edin və şirkətlərə təsir edin
            </p>
          </div>

          {/* Tips Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="text-xl">İdeal Video CV üçün Məsləhətlər</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mode Selection */}
          {mode === 'select' && !videoPreview && (
            <Card className="mb-8 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setMode('upload')}
                  >
                    <Card className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                      <CardContent className="p-8 text-center">
                        <Upload className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          Video Yüklə
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Kompüterinizdən video fayl seçin
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => setMode('record')}
                  >
                    <Card className="border-2 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-500 transition-all">
                      <CardContent className="p-8 text-center">
                        <Camera className="h-16 w-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                          Video Çək
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Kameradan birbaşa video çəkin
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Mode */}
          {mode === 'upload' && !videoPreview && (
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Video Fayl Seçin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    MP4, MOV, WEBM formatlarında video yükləyin (max 100MB)
                  </p>
                  <input
                    type="file"
                    accept="video/mp4,video/mov,video/webm"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Video Seç
                      </span>
                    </Button>
                  </label>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="ghost" onClick={() => setMode('select')}>
                    Geri
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Record Mode */}
          {mode === 'record' && !videoPreview && (
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Video Çəkin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="font-mono text-sm">
                          {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-4">
                    {!isRecording ? (
                      <Button
                        onClick={startRecording}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        size="lg"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Çəkməyə Başla
                      </Button>
                    ) : (
                      <Button
                        onClick={stopRecording}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        size="lg"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        Dayandır
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => {
                      if (streamRef.current) {
                        streamRef.current.getTracks().forEach(track => track.stop())
                      }
                      setMode('select')
                    }}>
                      Geri
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Preview */}
          {videoPreview && (
            <Card className="mb-8 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Video Önizləmə</CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetVideo}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Yüklənir...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Uğurla Yükləndi!
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 mr-2" />
                          Video CV-ni Yüklə
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {success && (
            <Card className="mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-600 dark:text-green-400">
                    Video CV uğurla yükləndi! Dashboard-a yönləndirilirsiniz...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default VideoCVUpload

