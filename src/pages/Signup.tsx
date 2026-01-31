"use client"

import { useNavigate } from "react-router-dom"
import SignupForm from "@/components/SignupForm"

export default function Signup() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">
              Join our gaming community today
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <SignupForm onSuccess={handleSuccess} />
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
