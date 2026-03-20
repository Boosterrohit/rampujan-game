"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Gamepad2, LogOut, User, Play, ShipWheel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { toast } from "react-toastify";
import video1 from "../../asset/video1.mp4";
import LoginRequiredDialog from "./LoginRequiredDialog";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dialogFeatureName, setDialogFeatureName] = useState("this feature");
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const isHomePage = location.pathname === "/";

  type MenuItem = {
    label: string;
    path?: string;
    url?: string;
  };

  const allMenuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    // { label: "Milestone", path: "/milestone" },
    { label: "About Us", path: "/about-us" },
    { label: "Free Spin", path: "/free-spin" },
    { label: "Prize Chat", path: "/prize-chat" },
    { label: "Dashboard", path: "/dashboard/" },
  ];

  const publicMenuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about-us" },
  ];

  const normalizedRole = user?.role?.toLowerCase();
  const isAgentOrAdmin = normalizedRole === "agent" || normalizedRole === "admin";

  // Hide dashboard for players; hide Free Spin and Prize Chat for agent/admin.
  const menuItems = isLoggedIn
    ? allMenuItems.filter(
        (item) => {
          if (item.label === "Dashboard" && normalizedRole === "player") {
            return false;
          }

          if (
            isAgentOrAdmin &&
            (item.label === "Free Spin" || item.label === "Prize Chat")
          ) {
            return false;
          }

          return true;
        }
      )
    : publicMenuItems;

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout API failed (expected if token expired):", error);
      toast.info("Logged out locally");
      // Continue with logout even if API fails (token might be expired)
    } finally {
      logout();
      navigate("/");
    }
  };
  const handleFreeSpin = () => {
    if (!isLoggedIn) {
      setDialogFeatureName("free spin");
      setShowLoginDialog(true);
    } else {
      navigate("/free-spin");
    }
  };
  return (
    <>
      <header className="sticky  top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className="w-10 h-10  bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg
            shadow-[0_0_15px_rgba(168,85,247,0.8),0_0_30px_rgba(236,72,153,0.6)] flex items-center justify-center transition-all duration-300"
            >
              <span className="text-primary-foreground font-bold text-lg">
                <Gamepad2 className="w-7 h-7 text-white" />
              </span>
            </div>
            <span
              className="hidden sm:inline text-lg font-bold gradient-text
             text-transparent bg-clip-text
             bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500
             drop-shadow-[0_0_3px_#38bdf8]
             drop-shadow-[0_0_7px_#a855f7]
             drop-shadow-[0_0_22px_#ec4899]"
            >
              RowGaming
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.path || item.label}
                onClick={() => navigate(item.path || "/")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-lg font-bold   text-transparent bg-clip-text   bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Auth Section */}
            <div className="hidden sm:flex gap-2">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {user?.username}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium">{user?.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                        {/* <p className="text-xs text-muted-foreground mt-1">
                          Wallet: ${user?.walletBalance || 0}
                        </p> */}
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Gradient border login button with real rounded corners */}
                  <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full rounded-lg bg-background text-foreground shadow-none border-none"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/signup")}
                    className="
              bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white
                "
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 rounded-lg bg-muted mb-3">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  {/* <p className="text-xs text-muted-foreground mt-1">
                    Wallet: ${user?.walletBalance || 0}
                  </p> */}
                </div>
                {menuItems.map((item) => (
                  <button
                    key={item.path || item.label}
                    onClick={() => {
                      navigate(item.path || "/");
                      setMobileOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors duration-200 flex items-center gap-2 text-accent"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {menuItems.map((item) => (
                  <button
                    key={item.path || item.label}
                    onClick={() => {
                      navigate(item.path || "/");
                      setMobileOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-border pt-2 mt-2 flex gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      navigate("/login");
                      setMobileOpen(false);
                    }}
                  >
                    Login
                  </Button> */}
                  <div className="flex-1 rounded-lg p-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full rounded-lg bg-background text-foreground shadow-none border-none"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white"
                    onClick={() => {
                      navigate("/signup");
                      setMobileOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* Video Banner for Home Page */}
      {isHomePage && (
        <div className="relative w-full h-[90vh] md:h-[90vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            // poster="/api/placeholder/1200/400"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 video-overlay flex items-center justify-center">
            <div className="text-center text-white space-y-6 px-4 max-w-4xl">
              <div className="w-fit flex justify-center mx-auto">
                <p
                  className="flex text-xs md:text-xl justify-center items-center gap-1 p-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20
backdrop-blur-lg
bg-white/10
border border-white/20
px-6 py-3
text-white
drop-shadow-[0_0_6px_#a855f7]
drop-shadow-[0_0_12px_#ec4899] font-bold"
                >
                  <Gamepad2 className="text-[#ffff00] md:h-8 md:w-8 h-6 w-6 drop-shadow-[0_0_6px_#ffff00] drop-shadow-[0_0_12px_#ffff00]" />
                  Welcome to the RowGaming
                </p>
              </div>
              <h2 className="extra_font text-5xl md:text-7xl  font-black text-white mb-6 leading-tight">
                Win Big with
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 animate-pulse">
                  MEGA JACKPOTS
                </span>
              </h2>
              <p className="text-xl md:text-2xl  font-poppins  text-white/70 mb-7 max-w-3xl mx-auto leading-relaxed">
                Join thousands of winners playing the most exciting casino
                games. Get your{" "}
                <span className="text-[#ffd700] font-bold">
                  $500 welcome bonus
                </span>{" "}
                and
                <span className="text-[#00f0ff] font-bold">
                  {" "}
                  100 free spins
                </span>{" "}
                today!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleFreeSpin}
                  className="group px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white font-bold rounded-full text-lg hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Start Playing Now
                  <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {/* {!isLoggedIn && (
              <div className="flex gap-3 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                >
                  Login
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </div>
            )} */}
            </div>
          </div>
        </div>
      )}
      <LoginRequiredDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        featureName={dialogFeatureName}
      />
    </>
  );
}
