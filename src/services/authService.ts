const API_BASE_URL = 'http://192.168.1.99:5000/api/v1/auth';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordEmailPayload {
  email: string;
}

export interface ResetPasswordOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordNewPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResendOtpParams {
  email: string;
}

export interface OTPVerifyPayload {
  email: string;
  otp: string;
  purpose: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    userId: string;
    username: string;
    email: string;
    role: string;
    walletBalance: number;
  };
  message: string;
  success: boolean;
}

export const authService = {
  async register(payload: RegisterPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async login(payload: LoginPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async resetPasswordWithEmail(payload: ResetPasswordEmailPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset password email');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async resetPasswordWithOtp(payload: ResetPasswordOtpPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async resetPasswordWithNewPassword(payload: ResetPasswordNewPasswordPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async resendOtp(params: ResendOtpParams) {
    try {
      // Build URL exactly as backend expects, without encoding '@'
      const response = await fetch(`${API_BASE_URL}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
         body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async verifyOTP(payload: OTPVerifyPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Helper function to check if OTP session is valid (1 minute)
  isOTPSessionValid(email: string): boolean {
    const storedEmail = localStorage.getItem('otpEmail');
    const timestamp = localStorage.getItem('otpTimestamp');

    if (storedEmail !== email || !timestamp) {
      return false;
    }

    const currentTime = Date.now();
    const storedTime = parseInt(timestamp, 10);
    const oneMinuteInMs = 60 * 1000;

    return currentTime - storedTime < oneMinuteInMs;
  },

  // Set OTP session in localStorage for 1 minute
  setOTPSession(email: string) {
    localStorage.setItem('otpEmail', email);
    localStorage.setItem('otpTimestamp', Date.now().toString());
  },

  // Clear OTP session
  clearOTPSession() {
    localStorage.removeItem('otpEmail');
    localStorage.removeItem('otpTimestamp');
  },

  // Get remaining time for OTP session in seconds
  getOTPRemainingTime(email: string): number {
    const storedEmail = localStorage.getItem('otpEmail');
    const timestamp = localStorage.getItem('otpTimestamp');

    if (storedEmail !== email || !timestamp) {
      return 0;
    }

    const currentTime = Date.now();
    const storedTime = parseInt(timestamp, 10);
    const oneMinuteInMs = 60 * 1000;
    const remaining = Math.max(0, Math.ceil((oneMinuteInMs - (currentTime - storedTime)) / 1000));

    return remaining;
  },
};
