"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignupForm from "@/components/webpage/SignupForm"
import OTPVerify from "@/components/webpage/OTPVerify"

export default function Signup() {
  const navigate = useNavigate()
  const [showOTP, setShowOTP] = useState(false)
  const [otpEmail, setOtpEmail] = useState("")

  const handleSignupSuccess = (email: string) => {
    setOtpEmail(email)
    setShowOTP(true)
  }

  const handleOTPSuccess = () => {
    setShowOTP(false)
    setOtpEmail("")
    navigate("/login", { replace: true })
  }

  const handleBackToSignup = () => {
    setShowOTP(false)
    setOtpEmail("")
  }

  return (
    <div className="imglogin min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{showOTP ? "Verify OTP" : "Create Account"}</h1>
            <p className="text-muted-foreground">
              {showOTP ? "Enter the OTP sent to your email" : "Join our gaming community today"}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            {showOTP ? (
              <OTPVerify
                email={otpEmail}
                onSuccess={handleOTPSuccess}
                onBackClick={handleBackToSignup}
              />
            ) : (
              <SignupForm onSuccess={handleSignupSuccess} />
            )}
          </div>

          {!showOTP && (
            <div className="text-center bg-card py-2 rounded-md">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="underline font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500"
                >
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
