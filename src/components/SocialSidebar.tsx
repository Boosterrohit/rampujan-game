import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Facebook, Instagram, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocation } from "react-router-dom"

export default function SocialSidebar() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "agent", time: "10:30 AM" }
  ])
  const [newMessage, setNewMessage] = useState("")
  const chatRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false)
      }
    }

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isChatOpen])

  // Close chat when route changes
  useEffect(() => {
    setIsChatOpen(false)
  }, [location.pathname])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage("")

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "Thank you for your message! Our support team will get back to you shortly.",
          sender: "agent",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, agentResponse])
      }, 1000)
    }
  }

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "bg-blue-600 hover:bg-blue-700",
      hoverColor: "group-hover:bg-blue-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
      hoverColor: "group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500"
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://telegram.org",
      color: "bg-blue-500 hover:bg-blue-600",
      hoverColor: "group-hover:bg-blue-500"
    }
  ]

  return (
    <>
      {/* Social Media Sidebar */}
      <div className="fixed right-0 bottom-5 md:bottom-5 z-50 flex flex-col space-y-0.5 md:space-y-1">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <div key={social.name} className="group relative">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsChatOpen(false)}
                className={`w-10 h-10 md:w-12 md:h-12 ${social.color} text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl ${social.hoverColor} border-l-4 border-white/20`}
                title={social.name}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              {/* Tooltip */}
              <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {social.name}
                </div>
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </div>
          )
        })}

        {/* Chat Button */}
        <div className="group relative">
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl border-l-4 border-white/20"
            title="Chat with Agent"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Chat with Agent
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        </div>
      </div>

      {/* Chat Popup */}
      {isChatOpen && (
        <div ref={chatRef} className="fixed bottom-2 md:bottom-4 right-12 md:right-16 z-50 w-64 md:w-80 h-72 md:h-96">
          <Card className="w-full h-full shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-sm font-medium">Chat with Agent</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 overflow-hidden space-y-3 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 mb-14 border-t bg-white dark:bg-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}