import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import VehicleList from './pages/VehicleList'
import VehicleDetail from './pages/VehicleDetail'
import Compare from './pages/Compare'
import About from './pages/About'
import Contact from './pages/Contact'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import VehicleManage from './pages/admin/VehicleManage'
import VehicleForm from './pages/admin/VehicleForm'
import InquiryManage from './pages/admin/InquiryManage'
import Settings from './pages/admin/Settings'
import HomepageManage from './pages/admin/HomepageManage'
import StaffManage from './pages/admin/StaffManage'

// Components
import ProtectedRoute from './components/ProtectedRoute'
import WhatsAppButton from './components/WhatsAppButton'
import CompareBar from './components/CompareBar'
import MobileBottomNav from './components/MobileBottomNav'

const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-16 md:pt-20 pb-16 md:pb-0">
      {children}
    </main>
    <Footer />
    <WhatsAppButton />
    <CompareBar />
    <MobileBottomNav />
  </div>
)

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/vehicles" element={<PublicLayout><VehicleList /></PublicLayout>} />
      <Route path="/vehicles/:id" element={<PublicLayout><VehicleDetail /></PublicLayout>} />
      <Route path="/compare" element={<PublicLayout><Compare /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<VehicleManage />} />
          <Route path="vehicles/new" element={<VehicleForm />} />
          <Route path="vehicles/edit/:id" element={<VehicleForm />} />
          <Route path="inquiries" element={<InquiryManage />} />
          <Route path="homepage" element={<HomepageManage />} />
          <Route path="staff" element={<StaffManage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Redirect for any unknown admin paths */}
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default App
