"use client"

import { Heart, Github, Twitter, Mail, Gamepad2, Facebook, Instagram, Send } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                    <Gamepad2 className="w-5 h-5 text-white" />
                </span>
              </div>
              <span className="text-lg font-bold gradient-text">RowGaming</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Experience the thrill of gaming with our exciting rewards and challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/milestone" className="text-muted-foreground hover:text-primary transition-colors">
                  Milestones
                </a>
              </li>
              <li>
                <a href="/free-spin" className="text-muted-foreground hover:text-primary transition-colors">
                  Free Spins
                </a>
              </li>
              <li>
                <a href="/prize-chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Prize Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help-center" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Twitter"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Email"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} RowGaming. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for gamers
          </p>
        </div>
      </div>
    </footer>
  )
}