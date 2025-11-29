import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import Header from './components/Header'
import Footer from './components/Footer'

// Main Pages
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Companies from './pages/Companies'
import CompanyDetails from './pages/CompanyDetails'
import JobListings from './pages/JobListings'
import JobDetails from './pages/JobDetails'
import Candidates from './pages/Candidates'
import CandidateDetails from './pages/CandidateDetails'
import Resources from './pages/Resources'
import ResourceDetails from './pages/ResourceDetails'
import Contact from './pages/Contact'

// Auth Pages
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

// Candidate Pages
import CVUpload from './pages/candidate/CVUpload'
import PDFCVUpload from './pages/candidate/PDFCVUpload'
import VideoCVUpload from './pages/candidate/VideoCVUpload'
import ProfileEdit from './pages/candidate/ProfileEdit'
import CandidateDashboard from './pages/candidate/Dashboard'

// Company Pages
import JobPost from './pages/company/JobPost'
import CompanyProfileEdit from './pages/company/ProfileEdit'
import CompanyDashboard from './pages/company/Dashboard'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/haqqimizda" element={<About />} />
            <Route path="/qiymetler" element={<Pricing />} />
            <Route path="/sirketler" element={<Companies />} />
            <Route path="/sirketler/:id" element={<CompanyDetails />} />
            <Route path="/is-elanlari" element={<JobListings />} />
            <Route path="/is-elanlari/:id" element={<JobDetails />} />
            <Route path="/namizedler" element={<Candidates />} />
            <Route path="/namizedler/:id" element={<CandidateDetails />} />
            <Route path="/resurslar" element={<Resources />} />
            <Route path="/resurslar/:id" element={<ResourceDetails />} />
            <Route path="/elaqe" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/giris" element={<SignIn />} />
            <Route path="/qeydiyyat" element={<SignUp />} />

            {/* Candidate Routes */}
            <Route path="/cv-yukle" element={<CVUpload />} />
            <Route path="/pdf-cv-yukle" element={<PDFCVUpload />} />
            <Route path="/video-cv-yukle" element={<VideoCVUpload />} />
            <Route path="/profil-redakte" element={<ProfileEdit />} />
            <Route path="/namized/dashboard" element={<CandidateDashboard />} />

            {/* Company Routes */}
            <Route path="/elan-paylas" element={<JobPost />} />
            <Route path="/sirket/profil-redakte" element={<CompanyProfileEdit />} />
            <Route path="/sirket/dashboard" element={<CompanyDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

