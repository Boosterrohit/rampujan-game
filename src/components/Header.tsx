"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, X, Moon, Sun, Gamepad2, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { authService } from "@/services/authService"
import video1 from '../asset/video1.mp4'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoggedIn, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode")
      if (saved !== null) {
        return JSON.parse(saved)
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return true
  })

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode))
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Apply initial theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const isHomePage = location.pathname === "/"

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Milestone", path: "/milestone" },
    { label: "Free Spin", path: "/free-spin" },
    { label: "Prize Chat", path: "/prize-chat" },
  ]

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      logout()
      navigate("/")
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
            <span className="text-primary-foreground font-bold text-lg">
              <Gamepad2 className="w-7 h-7 text-white" />
            </span>
          </div>
          <span className="hidden sm:inline text-lg font-bold gradient-text">GamePro</span>
        </div>

        {/* Desktop Menu */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Desktop Auth Section */}
          <div className="hidden sm:flex gap-2">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </button>
                
                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Wallet: ${user?.walletBalance || 0}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setUserMenuOpen(false)
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
                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate("/signup")}>
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
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
          {isLoggedIn && (
            <>
              <div className="px-4 py-3 rounded-lg bg-muted mb-3">
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Wallet: ${user?.walletBalance || 0}</p>
              </div>
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    setMobileOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  handleLogout()
                  setMobileOpen(false)
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors duration-200 flex items-center gap-2 text-accent"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <div className="border-t border-border pt-2 mt-2 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  navigate("/login")
                  setMobileOpen(false)
                }}
              >
                Login
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => {
                  navigate("/signup")
                  setMobileOpen(false)
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}

    </header>

    {/* Video Banner for Home Page */}
    {isHomePage && (
      <div className="relative w-full h-64 md:h-[72vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/api/placeholder/1200/400"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 video-overlay flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight video-text-shadow">
              Experience Gaming Like Never Before
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold opacity-95 video-text-shadow">
              Join thousands of players in our exciting gaming community
            </p>
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
    </>
  )
}
