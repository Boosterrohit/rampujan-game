"use client"

import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function TermsOfService() {
  const navigate = useNavigate()

  const sections = [
    {
      icon: Users,
      title: "User Agreement",
      content: "By accessing and using RowGaming, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
    },
    {
      icon: Shield,
      title: "Account Responsibility",
      content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: "You may not use our service for any illegal purposes, attempt to hack or disrupt our systems, or engage in any fraudulent activities. Violation of these terms may result in account suspension."
    },
    {
      icon: FileText,
      title: "Content and Intellectual Property",
      content: "All content on RowGaming, including games, graphics, and text, is owned by us or our licensors. You may not reproduce, distribute, or create derivative works without permission."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
        
            <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full rounded-lg bg-background text-foreground shadow-none border-none flex items-center gap-2 hover:bg-background/80 transition-colors"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">Terms of Service</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Last Updated: January 14, 2018</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms of Service govern your use of RowGaming and its services. Please read them carefully.
            </p>
          </CardContent>
        </Card>

        {/* <div className="grid gap-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}
        <div className="grid gap-6">
  {sections.map((section, index) => {
    const Icon = section.icon;
    
    // Define color scheme for each card
    const colorSchemes = [
      {
        bg: "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-orange-500/30 hover:border-orange-500/60",
        iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
        iconShadow: "shadow-orange-500/50",
        glow: "from-orange-500/10"
      },
      {
        bg: "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-purple-500/30 hover:border-purple-500/60",
        iconBg: "bg-gradient-to-br from-pink-400 to-purple-500",
        iconShadow: "shadow-purple-500/50",
        glow: "from-purple-500/10"
      },
      {
        bg: "bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-900/40",
        border: "border-cyan-500/30 hover:border-cyan-500/60",
        iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500",
        iconShadow: "shadow-cyan-500/50",
        glow: "from-cyan-500/10"
      },
      {
        bg: "bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-purple-900/40",
        border: "border-green-500/30 hover:border-green-500/60",
        iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
        iconShadow: "shadow-green-500/50",
        glow: "from-green-500/10"
      }
    ];
    
    const scheme = colorSchemes[index];
    
    return (
      <div 
        key={index} 
        className={`relative group cursor-pointer rounded-2xl overflow-hidden ${scheme.bg} backdrop-blur-sm border ${scheme.border} transition-all duration-300 p-6 md:p-8`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${scheme.iconBg} flex items-center justify-center shadow-lg ${scheme.iconShadow}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1">
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              {section.title.toUpperCase()}
            </h3>

            {/* Content */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {section.content}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            For questions about these terms, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}