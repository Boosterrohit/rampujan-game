import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import SocialSidebar from "@/components/SocialSidebar"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import Milestone from "@/pages/Milestone"
import FreeSpin from "@/pages/FreeSpin"
import PrizeChat from "@/pages/PrizeChat"
import AboutUs from "@/pages/AboutUs"
import HelpCenter from "@/pages/HelpCenter"
import TermsOfService from "@/pages/TermsOfService"
import PrivacyPolicy from "@/pages/PrivacyPolicy"

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup"

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background flex flex-col">
        {!isAuthPage && <Header />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes - Only accessible if logged in */}
            <Route
              path="/milestone"
              element={
                <ProtectedRoute>
                  <Milestone />
                </ProtectedRoute>
              }
            />
            <Route
              path="/free-spin"
              element={
                // <ProtectedRoute>
                  <FreeSpin />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/prize-chat"
              element={
                // <ProtectedRoute>
                  <PrizeChat />
                // </ProtectedRoute>
              }
            />
            
            {/* Public Routes */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        {!isAuthPage && <SocialSidebar />}
        {!isAuthPage && <Footer />}
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
