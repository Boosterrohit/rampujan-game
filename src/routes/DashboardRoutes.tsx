import { Suspense, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import Layout from "@/components/dashboard/Layout"
import { Dashboard } from "@/pages/dashboard/dashboard"
import { AdminManagement } from "@/pages/dashboard/admin-management/admin-management"
import { PlayerManagement } from "@/pages/dashboard/player-management/palyer-management"
import { RouletteGifts } from "@/pages/dashboard/roulette/roulette-gifts"
import { RouletteCampaigns } from "@/pages/dashboard/roulette/roulette-campaigns"
import { RedeemRequests } from "@/pages/dashboard/redeem/redeem-requests"
import { RedeemHistory } from "@/pages/dashboard/redeem/redeem-history"
import { LoadWallet } from "@/pages/dashboard/wallet/load-wallet"
import { TransactionRecords } from "@/pages/dashboard/wallet/transaction-records"
import MessagePage from "@/components/dashboard/element/MessagePage"
import { dashboardUrls } from "@/config/dashboard-urls"

const DashboardRoutes = () => {
  const { user, isLoggedIn } = useAuth();

  // protect all dashboard paths: redirect home when not authorized or role is "player"
  if (!isLoggedIn || user?.role === "player") {
    return <Navigate to="/" replace />;
  }

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
          <Route path={dashboardUrls.dashboard} element={<Dashboard />} />
          <Route path={dashboardUrls.adminManagement} element={<AdminManagement />} />
          <Route path={dashboardUrls.playerManagement} element={<PlayerManagement />} />
          <Route path={dashboardUrls.rouletteGift} element={<RouletteGifts/>} />
          <Route path={dashboardUrls.rouletteChampaigns} element={<RouletteCampaigns />} />
          <Route path={dashboardUrls.redeemRequest} element={<RedeemRequests/>} />
          <Route path={dashboardUrls.redeemHistory} element={<RedeemHistory />} />
          <Route path={dashboardUrls.loadWallet} element={<LoadWallet/>} />
          <Route path={dashboardUrls.transactionRecord} element={<TransactionRecords/>} />
          <Route
            path={dashboardUrls.chatClient}
            element={user?.role === "admin" ? <Navigate to={dashboardUrls.dashboard} replace /> : <MessagePage/>}
          />
          <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default DashboardRoutes
