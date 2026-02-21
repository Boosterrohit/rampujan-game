import {
  Gamepad2,
  LayoutDashboard,
  MessageCircle,
  Receipt,
  RefreshCw,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

export const MENU = [
  {
    id: 1,
    name: "Dashboard",
    SUBMENU: [
      { id: 1, title: "Dashboard", slug: "/", icons: LayoutDashboard },
    ],
  },
  {
    id: 2,
    name: "ADMIN MANAGEMENT",
    SUBMENU: [
      {
        id: 2,
        title: "Admin Management",
        slug: "/admin-management",
        icons: Settings,
      },
    ],
  },
  {
    id: 3,
    name: "PLAYER MANAGEMENT",
    SUBMENU: [
      {
        id: 3,
        title: "Players Management",
        slug: "/players-management",
        icons: Users,
      },
    ],
  },
  {
    id: 4,
    name: "ROULETTE MANAGEMENT",
    SUBMENU: [
      { id: 4, title: "Gifts Type", slug: "/roulette-gifts", icons: Gamepad2 },
      {
        id: 5,
        title: "Roulette Campaigns",
        slug: "/roulette-campaigns",
        icons: RefreshCw,
      },
    ],
  },
  {
    id: 5,
    name: "REDEEM MANAGEMENT",
    SUBMENU: [
      {
        id: 6,
        title: "Redeem Requests",
        slug: "/redeem-requests",
        icons: RefreshCw,
      },
      {
        id: 7,
        title: "Redeem Request History",
        slug: "/redeem-request-history",
        icons: RefreshCw,
      },
    ],
  },
  {
    id: 6,
    name: "WALLET MANAGEMENT",
    SUBMENU: [
      { id: 8, title: "Load Wallet", slug: "/load-wallet", icons: Wallet },
      {
        id: 9,
        title: "Transaction Records",
        slug: "/transaction-records",
        icons: Receipt,
      },
    
    ],
  },

  {
    id: 7,
    name: "Message",
    SUBMENU: [
      { id: 10, title: "Chat With Client", slug: "/chat", icons: MessageCircle },
      
    ],
  },
];
