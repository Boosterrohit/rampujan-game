"use client"

import { useNavigate } from "react-router-dom"
import LoginForm from "@/components/LoginForm"

export default function Login() {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <LoginForm onSuccess={handleSuccess} />
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
