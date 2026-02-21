import { Suspense, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/components/dashboard/Layout"
import { Dashboard } from "@/pages/dashboard/dashboard"
import { AdminManagement } from "@/pages/dashboard/admin-management"
import { PlayerManagement } from "@/pages/dashboard/palyer-management"
import { RouletteGifts } from "@/pages/dashboard/roulette/roulette-gifts"
import { RouletteCampaigns } from "@/pages/dashboard/roulette/roulette-campaigns"
import { RedeemRequests } from "@/pages/dashboard/redeem/redeem-requests"
import { RedeemHistory } from "@/pages/dashboard/redeem/redeem-history"
import { LoadWallet } from "@/pages/dashboard/wallet/load-wallet"
import { TransactionRecords } from "@/pages/dashboard/wallet/transaction-records"
import MessagePage from "@/components/dashboard/element/MessagePage"

const DashboardRoutes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Layout 
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      closeSidebar={closeSidebar}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/admin-management" element={<AdminManagement />} />
          <Route path="/dashboard/players-management" element={<PlayerManagement />} />
          <Route path="/dashboard/roulette-gifts" element={<RouletteGifts/>} />
          <Route path="/dashboard/roulette-campaigns" element={<RouletteCampaigns />} />
          <Route path="/dashboard/redeem-requests" element={<RedeemRequests/>} />
          <Route path="/dashboard/redeem-request-history" element={<RedeemHistory />} />
          <Route path="/dashboard/load-wallet" element={<LoadWallet/>} />
          <Route path="/dashboard/transaction-records" element={<TransactionRecords/>} />
          <Route path="/dashboard/chat" element={<MessagePage/>} />
          <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default DashboardRoutes
