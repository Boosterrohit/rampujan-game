import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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
import HelpCenter from "@/pages/HelpCenter"
import TermsOfService from "@/pages/TermsOfService"
import PrivacyPolicy from "@/pages/PrivacyPolicy"

function AppContent() {
  const location = useLocation()
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
            <Route path="/milestone" element={<Milestone />} />
            <Route path="/free-spin" element={<FreeSpin />} />
            <Route path="/prize-chat" element={<PrizeChat />} />
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
      <AppContent />
    </BrowserRouter>
  )
}

export default App
