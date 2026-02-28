
import { Bell, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback} from "../../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { dashboardUrls } from "@/config/dashboard-urls";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chatUnreadCount, setChatUnreadCount] = useState(0);
  const isAgent = user?.role === "agent";

  useEffect(() => {
    if (!isAgent) return;

    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://192.168.1.99:5000/api/v1/chat/unread-count", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (res.ok && data?.data?.unreadCount != null) {
          setChatUnreadCount(data.data.unreadCount);
        }
      } catch {
        // ignore
      }
    };

    fetchUnread();
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchUnread();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(onVisible, 30000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, [isAgent]);

  const handleNotificationClick = () => {
    if (isAgent) navigate(dashboardUrls.chatClient);
  };

  return (
    <div className="bg-[#242834] px-4 py-3 shadow flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden bg-gray-600 p-2 rounded-md transition-colors checeing"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-4">
           <Link to="/" className="border border-white p-1 rounded-md hover:bg-slate-300 hover:text-black">
           Go Back
          </Link>
        <div className="flex flex-col">
         
          <span className="font-bold text-sx sm:text-2xl text-white">RowGaming</span>
          <span className="text-gray-300 text-xs hidden sm:block">
            Manage your casino operations
          </span>
        </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isAgent && (
          <div
            onClick={handleNotificationClick}
            className="relative cursor-pointer hover:bg-gray-500 rounded-md p-2"
          >
            <Bell className="w-5 h-5 text-white" />
            {chatUnreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full px-1">
                {chatUnreadCount > 99 ? "99+" : chatUnreadCount}
              </span>
            )}
          </div>
        )}
        <div className="h-10 bg-gray-600 w-0.5 mx-2 "></div>
        <Avatar className="">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="uppercase">{user?.username?.substring(0,2)}</AvatarFallback>
        </Avatar>
        <div className="flex-col hidden md:flex">
          <span className="text-sm text-white">{user?.username}</span>
          <span className="text-xs text-gray-300">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
