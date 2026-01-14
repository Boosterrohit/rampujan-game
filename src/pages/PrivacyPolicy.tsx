"use client"

import { ArrowLeft, Lock, Eye, Database, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, participate in games, or contact support. This includes your username, email address, and gaming activity data."
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: "We use your information to provide and improve our services, personalize your gaming experience, communicate with you about updates and rewards, and ensure fair play across our platform."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure."
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Last Updated: January 14, 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This Privacy Policy explains how GamePro collects, uses, and protects your personal information.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
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
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            If you have questions about this privacy policy, please contact us.
          </p>
        </div>
      </div>
    </div>
  )
}