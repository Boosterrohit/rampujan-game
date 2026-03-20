import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import Header from "@/components/webpage/Header"
import Footer from "@/components/webpage/Footer"
import ScrollToTop from "@/components/webpage/ScrollToTop"
import SocialSidebar from "@/components/webpage/SocialSidebar"
import Home from "@/pages/webUser/Home"
import Login from "@/pages/webUser/Login"
import Signup from "@/pages/webUser/Signup"
import Milestone from "@/pages/webUser/Milestone"
// import FreeSpin from "@/pages/FreeSpin"
import PrizeChat from "@/pages/webUser/PrizeChat"
import AboutUs from "@/pages/webUser/AboutUs"
import HelpCenter from "@/pages/webUser/HelpCenter"
import TermsOfService from "@/pages/webUser/TermsOfService"
import PrivacyPolicy from "@/pages/webUser/PrivacyPolicy"
import ForgotPassword from "@/pages/webUser/ForgotPassword"
import DashboardRoutes from "@/routes/DashboardRoutes"
import FreeSpin from "./pages/webUser/FreeSpin"

const SESSION_EXPIRED_EVENT = "session-expired"

const getDefaultRouteByRole = (role?: string) => {
  const normalizedRole = role?.toLowerCase()
  return normalizedRole === "player" ? "/" : "/dashboard"
}

// Listen for 401 session-expired from backend and logout
function SessionExpiryListener() {
  const { logout } = useAuth()
  useEffect(() => {
    const handleSessionExpired = () => {
      logout()
      window.location.replace("/login")
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)

    // Fallback watchdog for idle dashboard/forms: force logout when token time passes.
    const intervalId = window.setInterval(() => {
      const storedUser = localStorage.getItem("user")
      const storedExpiry = localStorage.getItem("tokenExpiry")

      if (!storedUser || !storedExpiry) return

      const expiry = parseInt(storedExpiry, 10)
      if (!Number.isNaN(expiry) && Date.now() > expiry) {
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT))
      }
    }, 5000)

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
      window.clearInterval(intervalId)
    }
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

function PlayerOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const normalizedRole = user?.role?.toLowerCase()
  if (normalizedRole === "admin" || normalizedRole === "agent") {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuth()

  if (isLoggedIn) {
    return <Navigate to={getDefaultRouteByRole(user?.role)} replace />
  }

  return <>{children}</>
}

function AppContent() {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password"
  const isDashboardPage = location.pathname.startsWith("/dashboard")

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
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicOnlyRoute>
                    <ForgotPassword />
                  </PublicOnlyRoute>
                }
              />
              
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
                    <PlayerOnlyRoute>
                      <FreeSpin />
                    </PlayerOnlyRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prize-chat"
                element={
                  <ProtectedRoute>
                    <PlayerOnlyRoute>
                      <PrizeChat />
                    </PlayerOnlyRoute>
                  </ProtectedRoute>
                }
              />
              {/* Alias: free-chat redirects to prize-chat */}
              <Route
                path="/free-chat"
                element={
                  <ProtectedRoute>
                    <PlayerOnlyRoute>
                      <PrizeChat />
                    </PlayerOnlyRoute>
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
