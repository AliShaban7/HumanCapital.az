import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Heart, Play, Target, Users, Zap } from 'lucide-react'

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero / Intro */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Baku Cityscape Background */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/teymur-mammadov-BYZhvzyNOMY-unsplash.jpg')`,
              zIndex: 0,
            }}
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-blue-50/80 dark:from-gray-950/95 dark:via-gray-900/90 dark:to-gray-950/95 z-10" />
          
          {/* Additional subtle overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30 z-10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Haqqımızda</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Azərbaycanın ilk <span className="text-blue-600">video‑CV</span> iş platforması
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                HumanCapital işə qəbul prosesinə yeni baxış gətirir: namizədlər özlərini video ilə təqdim edir,
                şirkətlər isə CV arxasındakı insanı daha real şəkildə tanıyır.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  'Video əsaslı işə qəbul',
                  'Şəffaf və ədalətli seçim',
                  'Namizəd təcrübəsinə fokus',
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center space-x-2 rounded-full bg-white/80 dark:bg-gray-900/60 border border-blue-100/70 dark:border-blue-900/60 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: hero card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-blue-100/60 dark:border-gray-800 shadow-2xl p-6 md:p-8 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      HumanCapital nədir?
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">
                      Video CV ilə yeni nəsil iş platforması
                    </h2>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="h-6 w-6" />
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                  Biz namizəd və işəgötürənlər arasında emosional əlaqə yaradır, sadəcə CV yox,
                  insan hekayələri ilə qərar verməyə imkan veririk.
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: 'Aktiv iş elanları', value: '1000+' },
                    { label: 'Video CV-lər', value: '3K+' },
                    { label: 'Şirkət tərəfdaşları', value: '500+' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-blue-50/70 dark:bg-blue-900/30 border border-blue-100/60 dark:border-blue-800 px-3 py-4"
                    >
                      <p className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] md:text-xs text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Missiyamız
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                HumanCapital olaraq, namizədlərin öz potensiallarını video vasitəsilə daha yaxşı nümayiş
                etdirməsinə və şirkətlərin insanı daha dərindən tanımasına şərait yaradırıq.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Məqsədimiz işə qəbul prosesini daha <span className="font-semibold">sürətli</span>,{' '}
                <span className="font-semibold">ədalətli</span> və <span className="font-semibold">
                  şəffaf
                </span>{' '}
                etməkdir – hər iki tərəf üçün qazandıran təcrübə dizayn edirik.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Vizyonumuz
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Azərbaycanın ən böyük və ən etibarlı iş platforması olmaq, video əsaslı işə qəbul
                modelini regionda standart halına gətirmək.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Gələcəkdə hər CV‑nin yanında qısa bir video təqdimat olacaq – biz bu gələcəyi bu gündən
                qururuq.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Dəyərlərimiz
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Dəqiq Məqsəd',
                description:
                  'Hər funksiya və dizayn qərarı işə qəbul təcrübəsini yaxşılaşdırmaq üçün ölçülür.',
              },
              {
                icon: Users,
                title: 'İnsan mərkəzli',
                description:
                  'Namizəd və HR komandalarının ehtiyacları bizim bütün proseslərimizin mərkəzindədir.',
              },
              {
                icon: Zap,
                title: 'İnnovasiya',
                description:
                  'Texnologiyanın gücündən istifadə edərək ənənəvi iş elanlarını interaktiv təcrübəyə çeviririk.',
              },
              {
                icon: Heart,
                title: 'Hədəf',
                description:
                  'Komandamız hər layihəyə sanki öz karyerası kimi yanaşır – detallara həssaslıqla.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-blue-100/60 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-50">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works & stats */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                HumanCapital necə işləyir?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Platformanı həm namizədlər, həm də şirkətlər üçün mümkün qədər sadə və intuitiv
                dizayn etmişik. Yalnız bir neçə addımda video‑CV ekosisteminə qoşulursunuz.
              </p>
              <div className="space-y-3">
                {[
                  'Namizəd profilini və video təqdimatını yaradın.',
                  'Şirkətlər filtrlər və tövsiyələr vasitəsilə sizi kəşf etsin.',
                  'Uğurlu uyğunluq üçün daha az görüş, daha çox dəqiq məlumat əldə edin.',
                ].map((step, idx) => (
                  <div key={step} className="flex items-start space-x-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-white/90 dark:bg-gray-900/80 border border-blue-100/60 dark:border-gray-800 shadow-xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    Rəqəmlərlə HumanCapital
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    Real təsir, ölçülə bilən nəticə
                  </h3>
                </div>
                <ArrowRight className="h-6 w-6 text-blue-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Video CV baxışları', value: '250K+' },
                  { label: 'Tamamlanan müsahibələr', value: '12K+' },
                  { label: 'Orta uyğunluq səviyyəsi', value: '89%' },
                  { label: 'Müsahibə vaxtına qənaət', value: '60%' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-blue-50/70 dark:bg-blue-900/30 p-4">
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

