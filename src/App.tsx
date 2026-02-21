import { useEffect } from "react"
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
import ForgotPassword from "@/pages/ForgotPassword"
import DashboardRoutes from "@/routes/DashboardRoutes"

// Listen for 401 session-expired from backend and logout
function SessionExpiryListener() {
  const { logout } = useAuth()
  useEffect(() => {
    const handleSessionExpired = () => logout()
    window.addEventListener("session-expired", handleSessionExpired)
    return () => window.removeEventListener("session-expired", handleSessionExpired)
  }, [logout])
  return null
}

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logout, isTokenValid } = useAuth()
  
  // Session expired: logout and redirect to home
  if (isLoggedIn && !isTokenValid()) {
    logout()
    return <Navigate to="/" replace />
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password"
  const isDashboardPage = location.pathname.startsWith("/dashboard/")

  return (
    <>
      <ScrollToTop />
      {isDashboardPage ? (
        // Dashboard routes with its own Layout (no gaming Header/Footer)
        <DashboardRoutes />
      ) : (
        // Regular gaming app routes with Header/Footer
        <div className="min-h-screen bg-background flex flex-col">
          {!isAuthPage && <Header />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
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
                  <ProtectedRoute>
                    <FreeSpin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prize-chat"
                element={
                  <ProtectedRoute>
                    <PrizeChat />
                  </ProtectedRoute>
                }
              />
              {/* Alias: free-chat redirects to prize-chat */}
              <Route
                path="/free-chat"
                element={
                  <ProtectedRoute>
                    <PrizeChat />
                  </ProtectedRoute>
                }
              />
              
              {/* Public Routes */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              {/* Catch-all route: redirect unknown routes to home if not logged in */}
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </main>
          {!isAuthPage && <SocialSidebar />}
          {!isAuthPage && <Footer />}
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionExpiryListener />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
