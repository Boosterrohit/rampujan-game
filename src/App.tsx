import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import SocialSidebar from "@/components/SocialSidebar"
import Home from "@/pages/Home"
import Milestone from "@/pages/Milestone"
import FreeSpin from "@/pages/FreeSpin"
import PrizeChat from "@/pages/PrizeChat"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/milestone" element={<Milestone />} />
            <Route path="/free-spin" element={<FreeSpin />} />
            <Route path="/prize-chat" element={<PrizeChat />} />
          </Routes>
        </main>
        <SocialSidebar />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
