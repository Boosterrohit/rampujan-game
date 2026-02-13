"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mail, Lock, Loader, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authService } from "@/services/authService"

interface OTPVerifyProps {
  email: string
  onSuccess: (userData: any) => void
  onBackClick: () => void
}

export default function OTPVerify({ email, onSuccess, onBackClick }: OTPVerifyProps) {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [resendLoading, setResendLoading] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = authService.getOTPRemainingTime(email)
      setTimeRemaining(remaining)
      
      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [email])

  const handleResendOtp = async () => {
    if (!email) return

    setError("")
    setResendLoading(true)

    try {
      // reset OTP session timer to 60s
      authService.setOTPSession(email)
      setTimeRemaining(60)

      await authService.resendOtp({ email })
    } catch (err) {
      const error = err as any
      setError(error.message || "Failed to resend OTP. Please try again.")
    } finally {
      setResendLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp.trim()) {
      setError("OTP is required")
      return
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits")
      return
    }

    setLoading(true)

    try {
      const response = await authService.verifyOTP({
        email,
        otp,
        purpose: "verification",
      })

      if (response.data) {
        authService.clearOTPSession()
        onSuccess(response.data)
      }
    } catch (err) {
      const error = err as any
      setError(error.message || "OTP verification failed")
    } finally {
      setLoading(false)
    }
  }

  const isSessionExpired = timeRemaining <= 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onBackClick}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          type="button"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-lg font-semibold">Verify Email</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-accent/10 border border-accent text-accent text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Enter OTP</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
              required
              disabled={isSessionExpired}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              {timeRemaining > 0 ? (
                <>
                  OTP expires in{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                    {timeRemaining}s
                  </span>
                </>
              ) : (
                <span className="text-accent">OTP session expired</span>
              )}
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={timeRemaining > 0 || resendLoading}
              className={`font-medium underline-offset-4 ${
                timeRemaining > 0 || resendLoading
                  ? "text-muted-foreground cursor-not-allowed"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 hover:underline"
              }`}
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white"
          disabled={loading || isSessionExpired}
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onBackClick}
          disabled={loading}
        >
          Back to Sign Up
        </Button>
      </form>
    </div>
  )
}
