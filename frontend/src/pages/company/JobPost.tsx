import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import api from '../../lib/api'

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    city: '',
    salary: '',
    category: 'IT',
    experience: '',
    requirements: '',
    responsibilities: '',
    description: '',
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const categories = ['IT', 'Marketing', 'Design', 'Sales', 'HR', 'Finance', 'Education', 'Healthcare', 'Other']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value as string)
      })
      if (pdfFile) formDataToSend.append('pdf', pdfFile)

      await api.post('/jobs/create', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      alert('İş elanı uğurla yaradıldı!')
      // Reset form
      setFormData({
        title: '',
        companyName: '',
        city: '',
        salary: '',
        category: 'IT',
        experience: '',
        requirements: '',
        responsibilities: '',
        description: '',
      })
      setPdfFile(null)
    } catch (error) {
      console.error(error)
      alert('İş elanı yaradılarkən xəta baş verdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Elan Yarat</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Əsas Məlumatlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">İş Başlığı *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Məsələn: Frontend Developer"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Şirkət Adı *</label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Şəhər *</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Maaş</label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="Məsələn: 2000-3000 AZN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Təcrübə</label>
                  <Input
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Məsələn: 2-5 il"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kateqoriya *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-11 w-full px-4 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İş Təsviri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ümumi Təsvir *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                  placeholder="İş haqqında ümumi məlumat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vəzifələr</label>
                <textarea
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="İş vəzifələri"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tələblər</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Namizəddən tələb olunan bacarıqlar və təcrübə"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PDF İş Təsviri (İsteğe Bağlı)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  İş təsvirini PDF formatında yükləyin
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      PDF Seç
                    </span>
                  </Button>
                </label>
                {pdfFile && (
                  <p className="mt-4 text-sm text-foreground">{pdfFile.name}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Yaradılır...' : 'Elan Yarat'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default JobPost

