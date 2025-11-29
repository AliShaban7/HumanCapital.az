import { useNavigate } from 'react-router-dom'
import { MapPin, Banknote, Briefcase, Calendar, Building2, Send, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { motion } from 'framer-motion'
import { getCompanyLogo } from '@/lib/companyLogos'
import Button from './ui/Button'

interface JobCardProps {
  id: string
  title: string
  company: string
  city: string
  salary?: string
  category: string
  experience?: string
  createdAt: string
  logoUrl?: string
  views?: number
}

const JobCard = ({ id, title, company, city, salary, category: _category, experience, createdAt, logoUrl, views = 0 }: JobCardProps) => {
  const navigate = useNavigate()
  
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

  const companyLogo = logoUrl || getCompanyLogo(company)

  const handleCardClick = () => {
    navigate(`/is-elanlari/${id}`)
  }

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/is-elanlari/${id}`, { state: { apply: true } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-2 border-blue-100 hover:border-blue-300"
        onClick={handleCardClick}
      >
        <CardHeader>
          <div className="flex items-start space-x-4 mb-3">
            {companyLogo ? (
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white border border-blue-100 p-2 flex items-center justify-center">
                <img
                  src={companyLogo}
                  alt={company}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-2 line-clamp-2 text-gray-900">{title}</CardTitle>
              <p className="text-blue-600 font-semibold">{company}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>{city}</span>
            </div>
            {salary && (
              <div className="flex items-center space-x-1">
                <Banknote className="h-4 w-4 text-blue-600" />
                <span>{salary}</span>
              </div>
            )}
            {experience && (
              <div className="flex items-center space-x-1">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>{experience}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-blue-100">
            <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{formatViews(views)} baxış</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          <div className="pt-3" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={handleApply}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Müraciət et
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default JobCard

