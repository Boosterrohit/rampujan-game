"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Lock, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authService } from "@/services/authService"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "react-router-dom"

interface LoginFormProps {
  onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    setLoading(true)

    try {
      const response = await authService.login({
        email,
        password,
      })

      if (response.success && response.data) {
        const tokenExpiryTime = response.expiresIn
          ? Date.now() + response.expiresIn * 1000
          : undefined
        login(response.data, tokenExpiryTime)
        onSuccess()
      } else {
        setError(response.message || "Login failed")
      }
    } catch (err) {
      const error = err as any
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 rounded-lg bg-accent/10 border border-accent text-accent text-sm">{error}</div>}

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />
        </div>
        <div>
          <Link to="/forgot-password" className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
            Forgot password?
          </Link>
         </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full gap-2 hover:opacity-90 h-12 mt-2  bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white">
        {loading && <Loader className="w-4 h-4 animate-spin" />}
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  )
}
