/// <reference types="vite/client" />
import axios from "axios"
import { toast } from "react-toastify"

// Helper functions for cookie management
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

const setCookie = (name: string, value: string, options: any = {}) => {
  let cookieString = `${name}=${value}`
  for (const [key, val] of Object.entries(options)) {
    cookieString += `; ${key}=${val}`
  }
  document.cookie = cookieString
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

const API_HOST = import.meta.env.VITE_BASE_URL || "https://api.rowgaming669.com"
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1"

const normalizedHost = API_HOST.replace(/\/+$/, "")
const normalizedVersion = API_VERSION.startsWith("/")
  ? API_VERSION
  : `/${API_VERSION}`

const BASE_URL = `${normalizedHost}${normalizedVersion}`

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

export const axiosInstanceWithoutToken = axios.create({
  baseURL: BASE_URL,
})
axiosInstance.interceptors.request.use(
  (config: any) => {
    if (!window.navigator.onLine) {
      return Promise.reject("No Internet")
    } else {
      const contentType = determineContentType(config.data)

      // first try cookie (legacy), otherwise fall back to localStorage token
      let token = getCookie("access_token")
      if (!token) {
        token = localStorage.getItem("accessToken") || ""
      }

      config.headers = {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": contentType,
      }
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

function determineContentType(data: any) {
  if (typeof data === "object" && data instanceof FormData) {
    return "multipart/form-data"
  } else {
    return "application/json"
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 500 || error.response?.status > 500) {
      toast.error("Internal Server Error!")
    } else if (error.response?.status === 403) {
      toast.error("You don't have permission to access on this server")
    } else if (error.response?.status === 404) {
      toast.error("Page Not Found")
    }

    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const body = JSON.stringify({
          refresh: getCookie("refresh_token"),
        })
        deleteCookie("access_token")
        const response = await axiosInstance.post(`/token/refresh/`, body)
        if (response.status === 200) {
          setCookie("access_token", response?.data?.access, {
            secure: true,
            "max-age": 86400,
            sameSite: "Lax",
          })
          originalRequest.headers["Authorization"] = `Bearer ${response?.data?.access}`
          return axiosInstance(originalRequest)
        }
      } catch (error) {
        toast.error("Your session has expired. Please log in again.")
      }
    }
    return Promise.reject(error)
  },
)