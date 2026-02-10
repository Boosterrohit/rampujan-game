"use client";

import {
  Heart,
  Github,
  Twitter,
  Mail,
  Gamepad2,
  Facebook,
  Instagram,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  // const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg
            shadow-[0_0_4px_rgba(168,85,247,0.8),0_0_10px_rgba(236,72,153,0.6)] flex items-center justify-center transition-all duration-300"
              >
                <span className="text-primary-foreground font-bold text-sm">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </span>
              </div>
              <span
                className="text-lg font-bold gradient-text
             text-transparent bg-clip-text
             bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500
             drop-shadow-[0_0_2px_#38bdf8]
             drop-shadow-[0_0_4px_#a855f7]
             drop-shadow-[0_0_22x_#ec4899]"
              >
                RowGaming
              </span>
            </div>
            <p className="text-muted-foreground text-sm ">
              Experience the thrill of gaming with our exciting rewards and
              challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about-us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/free-spin"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Free Spins
                </a>
              </li>
              <li>
                <a
                  href="/prize-chat"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
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
                <Link
                  to="/help-center"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              {/* Facebook Button */}
              <a
                href="https://www.facebook.com/share/1DDrATbLTx/"
                className="p-2 rounded-lg bg-[#1877f2] hover:bg-[#1877f2]/80 transition-colors"
                aria-label="Facebook"
                target="_blank"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>

              {/* Instagram Button with Gradient */}
              <a
                href="#"
                className="p-2 rounded-lg bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>

              {/* Email Button */}
              <a
                href="#"
                className="p-2 rounded-lg bg-[#34a853] hover:bg-[#34a853]/80 transition-colors"
                aria-label="Email"
              >
                <Send className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2018 RowGaming. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            for gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
