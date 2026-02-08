import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Apply saved theme (matches Header logic) so Login/Signup pages show correct bg
const saved = localStorage.getItem("darkMode")
const darkMode = saved !== null ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches
if (darkMode) {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
