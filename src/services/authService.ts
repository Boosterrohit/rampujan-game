const API_BASE_URL = `${import.meta.env.VITE_BASE_URL || 'https://api.rowgaming669.com'}${import.meta.env.VITE_API_VERSION || '/api/v1'}/auth`;

const SESSION_EXPIRED_EVENT = 'session-expired';

export const dispatchSessionExpired = () => {
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
};

const handleResponse = async (response: Response, errorMessage: string) => {
  const data = await response.json();
  if (response.status === 401) {
    dispatchSessionExpired();
  }
  if (!response.ok) {
    throw new Error(data.message || errorMessage);
  }
  return data;
};

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
  newPassword: string;
  confirmPassword: string;
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
    accessToken?: string;
  };
  message: string;
  success: boolean;
  expiresIn?: number; // Token expiry in seconds (optional, from backend)
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

      return handleResponse(response, 'Registration failed');
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

      // Store access token in localStorage if backend returned it.  Some
      // endpoints send it nested under `data.accessToken` while others may
      // return it at the top level.  We handle both to avoid missing the value
      // (which was causing 401s when the header was empty).
      const tokenFromNested = data?.data?.accessToken;
      const tokenFromRoot = (data as any)?.accessToken;
      const token = tokenFromNested || tokenFromRoot;
      if (token) {
        // store in both localStorage and a simple cookie so the axios interceptor
        // (which looks for `access_token` cookie for backwards compatibility)
        // can pick it up.
        localStorage.setItem('accessToken', token);
        try {
          document.cookie = `access_token=${token}; path=/;`;
        } catch {
          // ignore if cookie writing fails (e.g. server side rendering)
        }
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

      return handleResponse(response, 'Failed to send reset password email');
    } catch (error) {
      throw error;
    }
  },

  async resetPasswordWithOtp(payload: ResetPasswordOtpPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-reset-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      return handleResponse(response, 'Failed to verify OTP');
    } catch (error) {
      throw error;
    }
  },

  async resetPasswordWithNewPassword(payload: ResetPasswordNewPasswordPayload) {
    try {
      const response = await fetch(`${API_BASE_URL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      return handleResponse(response, 'Failed to reset password');
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

      return handleResponse(response, 'Failed to resend OTP');
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

      return handleResponse(response, 'OTP verification failed');
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

      return handleResponse(response, 'Logout failed');
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
