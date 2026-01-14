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
      content: "By accessing and using GamePro, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
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
      content: "All content on GamePro, including games, graphics, and text, is owned by us or our licensors. You may not reproduce, distribute, or create derivative works without permission."
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
          <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Last Updated: January 14, 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms of Service govern your use of GamePro and its services. Please read them carefully.
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
            For questions about these terms, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}