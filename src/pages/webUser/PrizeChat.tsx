
"use client"

import { useState, useEffect, useRef, CSSProperties } from "react"
import { Gift, MessageCircle, Clock, Bot, User, Image, Smile, X, ZoomIn, ZoomOut, Panda, Zap } from "lucide-react"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import panda from "../../asset/panda.jpg";
import fire from "../../asset/firekirin.jpg";
import gameroom from "../../asset/gameroom.jpg";
import vblink from "../../asset/vblink.jpg";
import yolo from "../../asset/yolo.jpg";
import valut from "../../asset/vault.jpg";
import juwa from "../../asset/juwa.jpg";
import a777 from "../../asset/777.jpg";
import vegas from "../../asset/vegas.jpg";
import milky from "../../asset/milkyway.jpg";
import orion from "../../asset/orion.jpg";
import juwa2 from "../../asset/juwa2.jpg";
import vegasSweeps from "../../asset/vegassweeps.jpg";
import fb1 from "../../asset/fb1.jpg";
import fb2 from "../../asset/fb2.png";
import cashFrenzy from "../../asset/CashFrenzy.png";
import fortuneNexus from "../../asset/FortuneNexus.png";
import funStation from "../../asset/FunStation1.png";
import goldenTreasure from "../../asset/GoldenTreasure.png";
import hofoo from "../../asset/Hofoo.png";
import kingOfPop from "../../asset/KingOfPop.png";
import luckyStars from "../../asset/LuckyStars.png";
import mafia from "../../asset/Mafia.png";
import maio from "../../asset/MAIO.png";
import pandaMaster from "../../asset/PandaMaster.png";
import winnerClub from "../../asset/WinnerClub.png";
import winstar from "../../asset/winstar.png";

interface ChatMessage {
  id: number
  sender: "user" | "system"
  message: string
  imageUrl?: string
  prize?: string
  timestamp: string
}

interface AvailablePrize {
  id: number
  name: string
  coins: number
  points: string
  time: string
}

interface MessageOption {
  id: number
  text: string
  response: string
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.rowgaming669.com"
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1"
const CHAT_API_BASE = `${API_BASE_URL}${API_VERSION}/chat`

export default function PrizeChat() {
  interface Agent {
    _id: string
    username: string
    email?: string
    phone?: string
    activeChatCount?: number
  }

  const { user } = useAuth()

  const [availableAgents, setAvailableAgents] = useState<Agent[]>([])
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [assignedAgentName, setAssignedAgentName] = useState<string | null>(null)
  const [isAssigned, setIsAssigned] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)

  const [userPoints] = useState(2450)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ✅ THIS REF CONTROLS MESSAGE SCROLL ONLY
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // ✅ AUTO-SCROLL TO LATEST MESSAGE (CHAT ONLY)
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    container.scrollTop = container.scrollHeight
  }, [messages])

  // Auto-refresh messages when assigned (poll every 20s when tab visible)
  useEffect(() => {
    if (!isAssigned || !user) return;
    const refresh = () => {
      if (document.visibilityState === "visible") loadMessages();
    };
    const interval = setInterval(refresh, 20000);
    return () => clearInterval(interval);
  }, [isAssigned, user]);

  // when user/logged-in player changes, figure out whether they already have an assigned agent
  useEffect(() => {
    // no logged-in player, reset UI
    if (!user) {
      setIsAssigned(false)
      setAssignedAgentName(null)
      setSelectedAgentId(null)
      setAvailableAgents([])
      return
    }

    // Fetch current assignment/available agents from backend
    const loadAgents = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const headers: any = {}
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`${CHAT_API_BASE}/agents/available`, {
          method: 'GET',
          credentials: 'include',
          headers,
        })
        const data = await res.json()

        // If backend says this player already has an assigned agent, respect that
        if (res.ok && data?.data?.assignedAgent) {
          const assigned = data.data.assignedAgent as { _id: string; username: string }
          setIsAssigned(true)
          setAssignedAgentName(assigned.username)
          setSelectedAgentId(assigned._id)
          // load existing chat/messages for this player
          await loadMessages()
          return
        }

        // Otherwise show the list of available agents (if any)
        if (res.ok && data?.data?.agents) {
          setAvailableAgents(data.data.agents as Agent[])
        }
      } catch {
        // ignore silently for now
      }
    }

    loadAgents()
  }, [user])

  const availablePrizes: AvailablePrize[] = [
    { id: 1, name: "Premium Badge", coins: 500, points: "500 pts", time: "Instant" },
    { id: 2, name: "Bonus Coins x2", coins: 1000, points: "1000 pts", time: "Instant" },
    { id: 3, name: "Mystery Box", coins: 1500, points: "1500 pts", time: "2 hours" },
    { id: 4, name: "VIP Membership", coins: 2000, points: "2000 pts", time: "1 day" },
    { id: 5, name: "Jackpot Ticket", coins: 2500, points: "2500 pts", time: "Instant" },
    { id: 6, name: "Legendary Badge", coins: 3000, points: "3000 pts", time: "3 days" },
  ]

  const prizeColorSchemes = [
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
    },
    {
      bg: "bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-purple-900/40",
      border: "border-pink-500/30 hover:border-pink-500/60",
      iconBg: "bg-gradient-to-br from-pink-400 to-rose-500",
      iconShadow: "shadow-pink-500/50",
      glow: "from-pink-500/10"
    },
    {
      bg: "bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-purple-900/40",
      border: "border-yellow-500/30 hover:border-yellow-500/60",
      iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      iconShadow: "shadow-yellow-500/50",
      glow: "from-yellow-500/10"
    }
  ]

  // No quick message options — users must select an agent and type messages

  const [newMessage, setNewMessage] = useState("")

  // simple image modal component
  const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => {
    const [scale, setScale] = useState(1);
    const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setScale((s) => Math.min(3, Math.max(0.5, s + delta)));
    };
    const reset = () => setScale(1);
    const style: CSSProperties = {
      transform: `scale(${scale})`,
      transition: "transform 0.1s",
      maxWidth: "90vw",
      maxHeight: "90vh",
      objectFit: "contain",
      cursor: "grab",
    };
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg flex items-center justify-center z-[9999]"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <img
            src={src}
            alt="Preview"
            style={style}
            onWheel={handleWheel}
            className="rounded-md shadow-lg"
          />
          {/* top-right buttons */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => setScale((s) => Math.min(3, s + 0.2))}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-1"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-1"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={reset}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-1"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const headers: any = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${CHAT_API_BASE}/messages`, {
        method: 'GET',
        credentials: 'include',
        headers,
      })
      const data = await res.json()

      if (res.ok && data?.data?.messages) {
        setChatId(data.data.chat?._id || null)
        // Backend returns newest-first; reverse so we show oldest at top, newest at bottom
        const source = data.data.messages.slice().reverse()
        const base = API_BASE_URL;
        const mapped: ChatMessage[] = source.map((m: any, idx: number) => ({
          id: idx,
          sender: m.senderRole === 'player' ? 'user' : 'system',
          message: m.content,
          imageUrl: m.imageUrl ? `${base}${m.imageUrl}` : undefined,
          timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        }))
        setMessages(mapped)
      }
    } catch {
      // ignore for now
    }
  }

  const handleSendMessage = async () => {
    if (!isAssigned) return
    if (!newMessage.trim() && !selectedImage) return

    try {
      const token = localStorage.getItem('accessToken')
      const headers: any = {}
      if (token) headers['Authorization'] = `Bearer ${token}`

      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)
        if (newMessage.trim()) formData.append('content', newMessage)

        const res = await fetch(`${CHAT_API_BASE}/message/image`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: formData,
        })
        const data = await res.json()

        if (res.ok && data?.data?.message) {
          const m = data.data.message
          setChatId(data.data.chatId || chatId || null)
          const base = API_BASE_URL;
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: 'user',
              message: m.content,
              imageUrl: m.imageUrl ? `${base}${m.imageUrl}` : undefined,
              timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            },
          ])
          setNewMessage("")
          setSelectedImage(null)
          if (fileInputRef.current) fileInputRef.current.value = ""
        }
      } else {
        headers['Content-Type'] = 'application/json; charset=utf-8'
        const res = await fetch(`${CHAT_API_BASE}/message`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({ content: newMessage }),
        })
        const data = await res.json()

        if (res.ok && data?.data?.message) {
          const m = data.data.message
          setChatId(data.data.chatId || chatId || null)
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: 'user',
              message: m.content,
              timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            },
          ])
          setNewMessage("")
        }
      }
    } catch {
      // ignore for now
    }
  }

  const handleClaimPrize = (prize: AvailablePrize) => {
    if (userPoints < prize.coins) return

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "system",
        message: `You claimed "${prize.name}"! ${prize.coins} coins deducted.`,
        prize: prize.name,
        timestamp: time,
      },
    ])
  }

  const handleAssignAgent = async () => {
    if (!selectedAgentId) return
    setAssigning(true)
    try {
      const token = localStorage.getItem('accessToken')
      const headers: any = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${CHAT_API_BASE}/assign-agent`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ agentId: selectedAgentId }),
      })

      const data = await res.json()
      if (res.ok) {
        // lookup agent username for display/storage
        const assigned = availableAgents.find((a) => a._id === selectedAgentId)
        const name = assigned ? assigned.username : ''

        // mark as assigned
        setIsAssigned(true)
        setAssignedAgentName(name)

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'system',
            message: `Agent assigned successfully. You can now chat with the agent.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'system',
            message: data?.message || 'Failed to assign agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'system',
          message: 'Network error while assigning agent',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setAssigning(false)
    }
  }


  const availableGames = [
    {
      id: 1,
      name: "Ultra Panda",
      category: "Slots",
      icon: Panda,
      players: "1.2K",
      prize: "$10K",
      color: "from-red-500 to-pink-500",
      bgImage: panda,
      slug: "https://www.ultrapanda.mobi/",
      borderColor: "border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 2,
      name: "Fire Kirin",
      category: "Wheel",
      icon: fire,
      players: "856",
      prize: "$5K",
      color: "from-blue-500 to-cyan-500",
      bgImage: fire,
      slug: "https://www.firekirin.mobi/",
      borderColor: "border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 3,
      name: "Game Room Online",
      category: "Adventure",
      icon: gameroom,
      players: "2.1K",
      prize: "$15K",
      color: "from-yellow-500 to-orange-500",
      bgImage: gameroom,
      slug: "https://www.gameroom777.com/",
      borderColor: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 4,
      name: "Vblink",
      category: "Cards",
      icon: vblink,
      players: "743",
      prize: "$3K",
      color: "from-purple-500 to-indigo-500",
      bgImage: vblink,
      slug: "https://www.vblink777.club/",
      borderColor: "border-blue-400 shadow-[0_0_15px_rgba(52,152,219,0.5)]",
      type: ["all","new"],
    },
    {
      id: 5,
      name: "YOLO 777",
      category: "Dice",
      icon: yolo,
      players: "1.8K",
      prize: "$8K",
      color: "from-green-500 to-teal-500",
      bgImage: yolo,
      slug: "https://h5.yolo777.top/YOLO/",
      borderColor: "border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]",
      type: ["all","hot"],
    },
    {
      id: 6,
      name: "Game Vault",
      category: "Casino",
      icon: valut,
      players: "956",
      prize: "$12K",
      color: "from-red-600 to-red-800",
      bgImage: valut,
      slug: "https://gamevault.download/",
      borderColor: "border-red-600 shadow-[0_0_15px_rgba(185,28,28,0.5)]",
      type: ["all", "hot"],
    },
    {
      id: 7,
      name: "Juwa",
      category: "Cards",
      icon: juwa,
      players: "1.3K",
      prize: "$6K",
      color: "from-gray-700 to-gray-900",
      bgImage: juwa,
      slug: "https://dl.juwa777.com/?fbclid=IwY2xjawFtFvZleHRuA2FlbQIxMAABHWaygnEZ03842WW0UPnpbLBvrrDeM0VGWCXmkQMvpm6jioyCs1jJB70ZqA_aem_2jIRv6mHNu0HMx5wefr0Kw",
      borderColor: "border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 8,
      name: "Juwa - 2.0",
      category: "Bingo",
      icon: juwa2,
      players: "2.5K",
      prize: "$4K",
      color: "from-pink-500 to-rose-500",
      bgImage: juwa2,
      slug: "https://m.juwa2.com/",
      borderColor: "border-blue-800 shadow-[0_0_15px_rgba(52,152,219,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 9,
      name: "777 River Sweeps",
      category: "Slots",
      icon: a777,
      players: "3.1K",
      prize: "$25K",
      color: "from-yellow-400 to-orange-500",
      bgImage: a777,
      slug: "https://river777.net/",
      borderColor: "border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 10,
      name: "Vegas X",
      category: "Casino",
      icon: vegas,
      players: "1.9K",
      prize: "$18K",
      color: "from-purple-600 to-pink-600",
      bgImage: vegas,
      slug: "https://www.vegas-x.org/",
      borderColor: "border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 11,
      name: "Milky Way",
      category: "Slots",
      icon: milky,
      players: "2.2K",
      prize: "$14K",
      color: "from-blue-600 to-indigo-600",
      hot: true,
      bgImage: milky,
      slug: "https://milkywayapp.xyz/",
      borderColor: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
      type: ["all", "hot"],
    },
    {
      id: 12,
      name: "Orion Stars",
      category: "Adventure",
      icon: orion,
      players: "1.7K",
      prize: "$9K",
      color: "from-cyan-500 to-blue-500",
      bgImage: orion,
      slug: "https://start.orionstars.vip:8888/index.html",
      borderColor: "border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)]",
      type: ["all", "popular"],
    },
    // New Games
    {
      id: 13,
      name: "Cash Frenzy",
      category: "Slots",
      icon: cashFrenzy,
      players: "2.8K",
      prize: "$22K",
      color: "from-emerald-500 to-teal-500",
      bgImage: cashFrenzy,
      slug: "https://www.cashfrenzy777.com/",
      borderColor: "border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 14,
      name: "Fortune Nexus",
      category: "Casino",
      icon: fortuneNexus,
      players: "1.5K",
      prize: "$16K",
      color: "from-indigo-500 to-purple-500",
      bgImage: fortuneNexus,
      slug: "https://www.fortunenexus.vip/",
      borderColor: "border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 15,
      name: "Fun Station",
      category: "Arcade",
      icon: funStation,
      players: "3.2K",
      prize: "$28K",
      color: "from-rose-500 to-red-500",
      bgImage: funStation,
      slug: "https://www.funstation.site/",
      borderColor: "border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]",
      type: ["all", "hot"],
    },
    {
      id: 16,
      name: "Golden Treasure",
      category: "Slots",
      icon: goldenTreasure,
      players: "2.0K",
      prize: "$20K",
      color: "from-yellow-500 to-amber-500",
      bgImage: goldenTreasure,
      slug: "https://www.goldentreasure.mobi/",
      borderColor: "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
      type: ["all", "hot"],
    },
    {
      id: 17,
      name: "Hofoo",
      category: "Cards",
      icon: hofoo,
      players: "1.1K",
      prize: "$7K",
      color: "from-blue-500 to-purple-500",
      bgImage: hofoo,
      slug: "https://game.hofoo.top/web-mobile/",
      borderColor: "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 18,
      name: "King Of Pop",
      category: "Slots",
      icon: kingOfPop,
      players: "2.7K",
      prize: "$19K",
      color: "from-pink-500 to-purple-500",
      bgImage: kingOfPop,
      slug: "https://www.slots88888.com/",
      borderColor: "border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 19,
      name: "Lucky Stars",
      category: "Casino",
      icon: luckyStars,
      players: "2.4K",
      prize: "$17K",
      color: "from-violet-500 to-purple-500",
      bgImage: luckyStars,
      slug: "https://luckystars.mobi/",
      borderColor: "border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      type: ["all", "hot"],
    },
    {
      id: 20,
      name: "Mafia",
      category: "Adventure",
      icon: mafia,
      players: "1.6K",
      prize: "$11K",
      color: "from-gray-600 to-black",
      bgImage: mafia,
      slug: "https://www.mafia77777.com/",
      borderColor: "border-gray-600 shadow-[0_0_15px_rgba(75,85,99,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 21,
      name: "MAIO",
      category: "Dice",
      icon: maio,
      players: "1.9K",
      prize: "$13K",
      color: "from-orange-500 to-red-500",
      bgImage: maio,
      slug: "https://www.mrallinone777.com/",
      borderColor: "border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]",
      type: ["all", "new"],
    },
    {
      id: 22,
      name: "Panda Master",
      category: "Slots",
      icon: pandaMaster,
      players: "3.0K",
      prize: "$26K",
      color: "from-black to-gray-700",
      bgImage: pandaMaster,
      slug: "https://pandamaster.vip:8888/index.html",
      borderColor: "border-black shadow-[0_0_15px_rgba(31,41,55,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 23,
      name: "Winner Club",
      category: "Casino",
      icon: winnerClub,
      players: "2.6K",
      prize: "$21K",
      color: "from-amber-500 to-yellow-500",
      bgImage: winnerClub,
      slug: "https://www.winnersclub777.com/",
      borderColor: "border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.5)]",
      type: ["all", "popular"],
    },
    {
      id: 24,
      name: "Winstar",
      category: "Slots",
      icon: winstar,
      players: "2.9K",
      prize: "$24K",
      color: "from-cyan-500 to-blue-500",
      bgImage: winstar,
      slug: "http://server.winstar99999.com:8009/",
      borderColor: "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
      type: ["all", "hot"],
    },
    // Facebook Tab Games
    {
      id: 25,
      name: "Sophie Cliffton",
      category: "Facebook",
      icon: fb1,
      players: "5.2K",
      prize: "$35K",
      color: "from-blue-600 to-blue-800",
      bgImage: fb1,
      slug: "https://www.facebook.com/sophie.cliffton?rdid=bQPsNmXcPPpEV35z&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DDrATbLTx%2F#",
      borderColor: "border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]",
      type: ["facebook"],
    },
    {
      id: 26,
      name: "Jackpot Zone",
      category: "Facebook",
      icon: fb2,
      players: "4.8K",
      prize: "$32K",
      color: "from-blue-700 to-indigo-600",
      bgImage: fb2,
      slug: "https://www.facebook.com/people/Jackpot-Zone/61581237008726/?rdid=YFSQXc0UL3ChZuoM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CAsMQKRys%2F",
      borderColor: "border-green-700 shadow-[0_0_15px_rgba(74,222,128,0.5)]",
      type: ["facebook"],
    },
  ];

  return (
    <main className=" overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
              Agent Chat
            </span>
          </h1>
          <p className="text-muted-foreground">Chat, claim, and track your prizes</p>
        </div>

        {/* Points */}
        <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 p-6 mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-sm text-gray-300 mb-1">Available Game</p>
              <p className="text-3xl font-bold text-white">26+</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Gift className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 h-screen grid lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Chat */}
          <div className="h-[100vh] lg:col-span-2 flex flex-col border-2 border-primary/20 rounded-2xl overflow-hidden bg-card/50">
            {/* Agent selector */}
            <div className="flex items-center justify-between gap-3 p-4 border-b border-primary/10">
              <div className="flex items-center gap-3">
              {isAssigned ? (
                <p className="text-sm text-gray-300">
                  Assigned to <span className="font-semibold">{assignedAgentName}</span>
                </p>
              ) : (
                <>
                  <label className="text-sm text-gray-300">Select Agent</label>
                  <select
                    className="bg-card/40 text-sm text-white px-3 py-1 rounded-md"
                    value={selectedAgentId ?? ''}
                    onChange={(e) => setSelectedAgentId(e.target.value || null)}
                  >
                    <option value="">-- Choose an agent --</option>
                    {availableAgents.map((a) => (
                      <option key={a._id} value={a._id}>{a.username} {a.activeChatCount ? `(${a.activeChatCount})` : ''}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
            {!isAssigned && (
              <div>
                <Button size="sm" onClick={handleAssignAgent} disabled={!selectedAgentId || assigning}>
                  {assigning ? 'Assigning...' : 'Assign Agent'}
                </Button>
              </div>
            )}
            </div>
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {/* Agent Avatar */}
                  {msg.sender === "system" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="max-w-[70%]">
                    {msg.sender === "system" ? (
                      // Agent Message - Dark style
                      <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-600/30 p-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          {msg.imageUrl && (
                            <img
  src={msg.imageUrl?.startsWith('http') ? msg.imageUrl : `${API_BASE_URL}${msg.imageUrl ?? ''}`}
  alt=""
  className="rounded-lg max-w-full max-h-48 object-contain mb-2 cursor-pointer"
  onClick={() =>
    setZoomImage(
      msg.imageUrl?.startsWith('http')
        ? msg.imageUrl
        : `${API_BASE_URL}${msg.imageUrl ?? ''}`
    )
  }
/>
                          )}
                          <p className="text-sm text-white leading-relaxed">{msg.message}</p>
                          {msg.prize && (
                            <div className="mt-3 pt-3 border-t border-gray-600/50 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <Gift className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs font-semibold text-yellow-400">{msg.prize}</span>
                            </div>
                          )}
                          <p className="text-xs text-gray-400 mt-2">{msg.timestamp}</p>
                        </div>
                      </div>
                    ) : (
                      // User Message - Gradient style
                      <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/80 via-yellow-500/80 to-orange-600/80 backdrop-blur-sm p-4 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          {msg.imageUrl && (
                                              <img
  src={msg.imageUrl?.startsWith('http') ? msg.imageUrl : `${API_BASE_URL}${msg.imageUrl ?? ''}`}
  alt=""
  className="rounded-lg max-w-full max-h-48 object-contain mb-2 cursor-pointer"
  onClick={() =>
    setZoomImage(
      msg.imageUrl?.startsWith('http')
        ? msg.imageUrl
        : `${API_BASE_URL}${msg.imageUrl ?? ''}`
    )
  }
/>
                          )}
                          <p className="text-sm text-white font-medium leading-relaxed">{msg.message}</p>
                          <p className="text-xs text-white/80 mt-2 text-right">{msg.timestamp}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message input - disabled until an agent is selected */}
            <div className="border-t border-primary/20 p-4 bg-card/30 relative">
              {selectedImage && (
                <div className="mb-2 flex items-center gap-2">
                  <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="h-14 w-14 rounded object-cover border border-primary/30" />
                  <button type="button" onClick={() => { setSelectedImage(null); fileInputRef.current && (fileInputRef.current.value = ""); }} className="text-sm text-muted-foreground hover:text-foreground">Remove</button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setShowEmoji((prev) => !prev)} className="p-2 rounded-md hover:bg-primary/10" disabled={!isAssigned}>
                  <Smile className="w-5 h-5" />
                </button>
                <input type="file" ref={fileInputRef} accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f && /^image\/(jpeg|png|gif|webp)$/i.test(f.type)) setSelectedImage(f); }} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded-md hover:bg-primary/10" disabled={!isAssigned}>
                  <Image className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isAssigned ? "Type your message..." : "Assign an agent to start chat"}
                  disabled={!isAssigned}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button onClick={handleSendMessage} disabled={!isAssigned || (!newMessage.trim() && !selectedImage)}>
                  Send
                </Button>
              </div>
              {showEmoji && (
                <div className="absolute bottom-full left-4 mb-2 z-50">
                  <EmojiPicker theme={Theme.DARK} onEmojiClick={(d) => { setNewMessage((p) => p + d.emoji); setShowEmoji(false); }} width={320} height={400} />
                </div>
              )}
            </div>
          </div>

          {/* Prizes */}
          <div className="overflow-y-auto pr-2 h-[100vh] hide-scrollbar">
            <h3 className="font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
              Available Game
            </h3>
            <div className="grid grid-cols-2 gap-1">
             {availableGames.map((game) => {
              return(
                <Card
                  key={game.id}
                  className={`group border-2 overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col ${game.borderColor}`}
                >
                  {/* Image / cover */}
                  <div className="relative w-full h-36 md:h-48">
                    <img
                      src={game.bgImage}
                      alt={game.name}
                      className="w-full h-full object-cover block"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                    {game.type.includes("hot") && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        🔥 HOT
                      </div>
                    )}
                    {game.type.includes("new") && !game.type.includes("hot") && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        ⭐ NEW
                      </div>
                    )}
                    {game.type.includes("popular") && !game.type.includes("hot") && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        🌟 POPULAR
                      </div>
                    )}
                  </div>

                  {/* Info bar */}
                  <div className="bg-black px-4 md:px-6 py-2 flex flex-col items-center gap-3">
                    <h3 className="text-white text-center text-xs font-bold w-full">
                      {game.name}
                    </h3>

                    <div className="w-full md:w-3/4">
                      <div className="p-[2px] rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500">
                        <button
                          onClick={() => {
                            window.open(game.slug, "_blank");
                          }}
                          className="w-full rounded-lg py-2 text-xs bg-[#0b0b0b] text-white font-semibold flex items-center justify-center gap-2"
                        >
                          {/* <Zap className="w-4 h-4" /> */}
                          PLAY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
             })}
            </div>
          </div>
        </div>
      </div>
      {zoomImage && <ImageModal src={zoomImage} onClose={() => setZoomImage(null)} />}
    </main>
  )
}