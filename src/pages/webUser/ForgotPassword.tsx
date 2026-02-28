import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound, Lock, Loader, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";

type Step = "email" | "otp" | "password" | "done";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPasswordWithEmail({ email });
      setMessage(response.message || "OTP sent to your email");
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPasswordWithOtp({ email, otp });
      setMessage(response.message || "OTP verified successfully");
      setStep("password");
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email.trim()) {
      setError("Email is missing. Please go back and enter your email again.");
      return;
    }

    setError("");
    setMessage("");
    setResendLoading(true);

    try {
      const response = await authService.resendOtp({ email });
      setMessage(response.message || "OTP resent to your email");
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword) {
      setError("New password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPasswordWithNewPassword({
        email,
        newPassword,
        confirmPassword,
      });
      setMessage(response.message || "Password reset successfully");
      setStep("done");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 imglogin">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground">
              {step === "email" && "Enter your email to receive an OTP"}
              {step === "otp" && "Enter the OTP sent to your email"}
              {step === "password" && "Set your new password"}
              {step === "done" &&
                "Password reset successful. Redirecting to login..."}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-accent/10 border border-accent text-accent text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-300 text-sm">
                {message}
              </div>
            )}

            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-9"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2 h-11 bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="pl-9"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 gap-2 h-11 bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white"
                  >
                    {loading && <Loader className="w-4 h-4 animate-spin" />}
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={resendLoading}
                    onClick={handleResendOtp}
                    className="flex-1 gap-2 h-11"
                  >
                    {resendLoading && (
                      <Loader className="w-4 h-4 animate-spin" />
                    )}
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </Button>
                </div>
              </form>
            )}

            {step === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      // type="password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9"
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input
                      // type="password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9"
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-muted-foreground"
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gap-2 h-11 bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white"
                >
                  {loading && <Loader className="w-4 h-4 animate-spin" />}
                  {loading ? "Updating..." : "Reset Password"}
                </Button>
              </form>
            )}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
