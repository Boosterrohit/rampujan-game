import { MENU } from "@/data/dashboard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, LogOut} from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    MENU.forEach((section) => {
      const hasActiveItem = section.SUBMENU.some(
        (item) => location.pathname === `/dashboard${item.slug}`
      );
      if (hasActiveItem) {
        setOpenSection(section.name);
      }
    });
  }, [location.pathname]);

  const toggleSection = (sectionName: string) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleMenuClick = () => {
    // Close sidebar on mobile when a menu item is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleLogout = async () => {
      try {
        await authService.logout();
      } catch (error) {
        console.error("Logout API failed (expected if token expired):", error);
        // Continue with logout even if API fails (token might be expired)
      } finally {
        logout();
        navigate("/");
      }
    };

  return (
    <>
      {/* Backdrop/Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/0 bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 w-60 bg-sidebar text-white flex flex-col h-screen z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-sidebar-border bg-black flex items-center justify-center md:h-24 h-20 ">
          <span className="text-2xl font-semibold">ADMIN PANEL</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide bg-black">
          {MENU.map((section) => {
            const visibleItems = section.SUBMENU.filter((item) => {
              if (user?.role === "admin" && item.slug === "/chat") return false;
              return true;
            });
            if (visibleItems.length === 0) return null;

            const isOpenSection = openSection === section.name;

            return (
              <div key={section.name} className="mb-5">
                <h3
                  onClick={() => toggleSection(section.name)}
                  className="px-4 flex items-center justify-between py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-200 transition-colors"
                >
                  {section.name}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpenSection ? "rotate-90" : ""
                    }`}
                  />
                </h3>
                <div
                  className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenSection ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === `/dashboard${item.slug}`;

                    return (
                      <Link
                        key={item.id}
                        to={`/dashboard${item.slug}`}
                        onClick={handleMenuClick}
                        className={`w-full flex items-center gap-3 px-6 py-3 font-medium text-xs transition-colors duration-200 ${
                          isActive
                            ? "bg-[#615ed6] text-white"
                            : "text-gray-300 hover:bg-[#5B2C3D] hover:text-white"
                        }`}
                      >
                        <p className="flex items-center gap-1 text-white">
                          {item.icons && <item.icons className="w-4 h-4" />}
                          <span>{item.title}</span>
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t bg-black border-sidebar-border flex items-center gap-2 text-sm cursor-pointer hover:bg-[#5B2C3D]" onClick={() => {
                          handleLogout();
                          // setUserMenuOpen(false);
                        }}>
          <LogOut className="w-4 h-4" />
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
