import { useState, useEffect, useRef, CSSProperties } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  MessageCircle,
  X,
  Send,
  Facebook,
  Instagram,
  MessageSquare,
  Plus,
  Camera,
  Smile,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.rowgaming669.com";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";
const CHAT_API_BASE = `${API_BASE_URL}${API_VERSION}/chat`;

interface Message {
  _id?: string;
  senderId: string;
  senderRole: string;
  messageType: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  isRead: boolean;
}

interface LocalMessage extends Message {
  id?: number;
  sender?: string;
  text?: string;
  time?: string;
  image?: string;
}

// reusable modal for displaying and zooming an image
function ImageModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((s) => Math.min(3, Math.max(0.5, s + delta)));
  };
  const reset = () => setScale(1);
  const style: CSSProperties = {
    transform: `scale(${scale})`,
    transition: 'transform 0.1s',
    maxWidth: '90vw',
    maxHeight: '90vh',
    objectFit: 'contain',
    cursor: 'grab',
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
}

export default function SocialSidebar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // track authentication via context to immediately react to logout
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  interface Agent {
    _id: string;
    username: string;
    activeChatCount?: number;
  }
  const [availableAgents, setAvailableAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [assignedAgentName, setAssignedAgentName] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isAssigned, setIsAssigned] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const location = useLocation();

  // helper for reading user data from storage (legacy fallback)
  const refreshUser = () => {
    const userInfo = localStorage.getItem("userInfo");
    const userStr = localStorage.getItem("user");
    try {
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        setUserRole(parsed.role);
        setUserId(parsed.userId);
      } else if (userStr) {
        const parsed = JSON.parse(userStr);
        setUserRole(parsed.role);
        setUserId(parsed.userId);
      } else {
        setUserRole(null);
        setUserId(null);
      }
    } catch (e) {
      console.error("Failed to parse user info", e);
      setUserRole(null);
      setUserId(null);
    }
  };

  // keep local state in sync with auth context
  useEffect(() => {
    if (user) {
      setUserRole(user.role);
      setUserId(user.userId);
    } else {
      setUserRole(null);
      setUserId(null);
      setIsChatOpen(false);
    }
  }, [user]);

  // initial load for non-context cases
  useEffect(() => {
    refreshUser();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // listen for storage events in case another tab logs the user out
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "userInfo" || e.key === "user") {
        refreshUser();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Close chat when route changes and re-read user info (handles logout/navigation)
  useEffect(() => {
    setIsChatOpen(false);
    refreshUser();
  }, [location.pathname]);

  // When chat opens, load agents and check assignment
  useEffect(() => {
    if (!isChatOpen || userRole === "agent" || userRole === "admin") return;

    const load = async () => {
      setAgentsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        
        const res = await fetch(`${CHAT_API_BASE}/agents/available`, {
          headers,
        });
        const data = await res.json();
        if (res.ok && data?.data?.assignedAgent) {
          const assigned = data.data.assignedAgent as { _id: string; username: string };
          setSelectedAgentId(assigned._id);
          setAssignedAgentName(assigned.username);
          setIsAssigned(true);
          setChatId(data?.data?.chat?._id);
          // Fetch messages for assigned agent
          await fetchMessages(null);
        } else if (res.ok && data?.data?.agents) {
          setAvailableAgents(data.data.agents);
          setIsAssigned(false);
          setMessages([]);
        }
      } catch (err) {
        console.error("Error loading agents:", err);
      } finally {
        setAgentsLoading(false);
      }
    };
    load();
  }, [isChatOpen, userRole]);

  // Auto-refresh messages when chat is open and assigned (poll every 20s, pause when tab hidden)
  useEffect(() => {
    if (!isChatOpen || !isAssigned) return;

    const refresh = () => {
      if (document.visibilityState === "visible") fetchMessages(null);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchMessages(null);
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(refresh, 20000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, [isChatOpen, isAssigned]);

  // When agent sends message: poll unread count when assigned but chat closed; auto-open chat when unread > 0 (every 20s, pause when tab hidden)
  useEffect(() => {
    if (!isAssigned || isChatOpen || userRole !== "player") return;

    const checkUnread = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const token = localStorage.getItem("accessToken");
        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const res = await fetch(`${CHAT_API_BASE}/unread-count`, { headers });
        const data = await res.json();
        if (res.ok && data?.data?.unreadCount > 0) {
          setIsChatOpen(true);
          await fetchMessages(null);
        }
      } catch {
        // ignore
      }
    };

    checkUnread();
    const onVisible = () => {
      if (document.visibilityState === "visible") checkUnread();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(checkUnread, 20000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, [isAssigned, isChatOpen, userRole]);

  // Fetch messages from backend
  const fetchMessages = async (idParam?: string | null) => {
    const isAgent = userRole === "agent";
    const messagesChatId = idParam || chatId;
    // Agents require a chatId, players use their own chat without specifying chatId
    if (isAgent && !messagesChatId) return;

    setIsLoadingMessages(true);
    try {
      const token = localStorage.getItem("accessToken");
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const queryParam =
        isAgent && messagesChatId ? `?chatId=${messagesChatId}` : "";
      
      const res = await fetch(`${CHAT_API_BASE}/messages${queryParam}`, {
        headers,
      });
      const data = await res.json();
      
      if (res.ok && data?.data?.messages) {
        if (data?.data?.chat?._id) setChatId(data.data.chat._id);
        // Backend returns newest-first; reverse so we show oldest at top, newest at bottom
        const source = data.data.messages.slice().reverse();
        const formattedMessages = source.map((msg: Message, idx: number) => {
          const base = API_BASE_URL;
          const fullImage = msg.imageUrl ? `${base}${msg.imageUrl}` : undefined;
          return {
            _id: msg._id,
            id: idx,
            senderId: msg.senderId,
            senderRole: msg.senderRole,
            messageType: msg.messageType,
            content: msg.content,
            imageUrl: msg.imageUrl,
            createdAt: msg.createdAt,
            isRead: msg.isRead,
            sender: msg.senderRole === "player" ? "user" : "agent",
            text: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            image: fullImage,
          };
        });
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Send message to backend
  const handleSendMessage = async () => {
    if (!isAssigned || (!newMessage.trim() && !selectedImage)) return;

    setIsSending(true);
    try {
      const token = localStorage.getItem("accessToken");
      
      // If sending an image, use FormData
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        if (newMessage.trim()) {
          formData.append("content", newMessage);
        }
        if (userRole === "agent") {
          formData.append("chatId", chatId || "");
        }

        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${CHAT_API_BASE}/message/image`, {
          method: "POST",
          headers,
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data?.data?.message) {
          const newMsg = data.data.message;
          const base = API_BASE_URL;
          const formattedMsg: LocalMessage = {
            _id: newMsg._id,
            senderId: newMsg.senderId,
            senderRole: newMsg.senderRole,
            messageType: newMsg.messageType,
            content: newMsg.content,
            imageUrl: newMsg.imageUrl,
            createdAt: newMsg.createdAt,
            isRead: newMsg.isRead,
            sender: "user",
            text: newMsg.content,
            time: new Date(newMsg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            image: newMsg.imageUrl ? `${base}${newMsg.imageUrl}` : undefined,
          };
          setMessages((prev) => [...prev, formattedMsg]);
          setNewMessage("");
          handleRemoveImage();
        } else {
          console.error("Failed to send image:", data?.message);
        }
      } else {
        // Send text message
        const headers: any = { "Content-Type": "application/json; charset=utf-8" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const body: any = { content: newMessage };
        if (userRole === "agent") {
          body.chatId = chatId;
        }

        const res = await fetch(`${CHAT_API_BASE}/message`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (res.ok && data?.data?.message) {
          const newMsg = data.data.message;
          const formattedMsg: LocalMessage = {
            _id: newMsg._id,
            senderId: newMsg.senderId,
            senderRole: newMsg.senderRole,
            messageType: newMsg.messageType,
            content: newMsg.content,
            imageUrl: newMsg.imageUrl,
            createdAt: newMsg.createdAt,
            isRead: newMsg.isRead,
            sender: "user",
            text: newMsg.content,
            time: new Date(newMsg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, formattedMsg]);
          setNewMessage("");
        } else {
          console.error("Failed to send message:", data?.message);
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleAssignAgent = async () => {
    if (!selectedAgentId) return;
    setAssigning(true);
    try {
      const token = localStorage.getItem("accessToken");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${CHAT_API_BASE}/assign-agent`, {
        method: "POST",
        headers,
        body: JSON.stringify({ agentId: selectedAgentId }),
      });
      const data = await res.json();
      if (res.ok) {
        const assigned = availableAgents.find((a) => a._id === selectedAgentId);
        const name = assigned ? assigned.username : "";
        setAssignedAgentName(name);
        setChatId(data?.data?.chat?._id);
        setIsAssigned(true);
        setMessages([]);
      } else {
        console.error("Failed to assign agent:", data?.message);
      }
    } catch (err) {
      console.error("Error assigning agent:", err);
    } finally {
      setAssigning(false);
    }
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1DDrATbLTx/",
      color: "bg-blue-600 hover:bg-blue-700",
      hoverColor: "group-hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color:
        "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
      hoverColor:
        "group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500",
    },
    {
      name: "Telegram",
      icon: Send,
      url: "https://telegram.org",
      color: "bg-blue-500 hover:bg-blue-600",
      hoverColor: "group-hover:bg-blue-500",
    },
  ];

  // select image from device
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     console.log("Selected Image:", file);
  //   }
  // };

  // camer open
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

 const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const handleRemoveImage = () => {
  setSelectedImage(null);
  setImagePreview(null);
  if (fileInputRef.current) fileInputRef.current.value = "";
  if (cameraInputRef.current) cameraInputRef.current.value = "";
};

  // don't hide social icons for agents/admins; we just prevent chat UI from showing
  // the component will always render the sidebar links. Chat button/popup will
  // be gated by user role later in the JSX.

  return (
    <>
      {/* Social Media Sidebar */}
      <div className="fixed right-0 bottom-5 md:bottom-5 z-50 flex flex-col space-y-0.5 md:space-y-1">
        {socialLinks.map((social) => {
          const Icon = social.icon;
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
          );
        })}

        {/* Chat Button (only for authenticated players) */}
        {(userId && userRole !== "agent" && userRole !== "admin") && (
          <div className="group relative">
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-10 h-10 md:w-12 md:h-12 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-125 hover:shadow-xl border-l-4 border-white/20"
              title="Chat with Agent"
            >
              <MessageSquare className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            {/* Tooltip */}
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                Chat with Agent
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Popup (authenticated players only) */}
      {isChatOpen && userId && userRole !== "agent" && userRole !== "admin" && (
  <div
    ref={chatRef}
    className="fixed bottom-6 right-3 md:right-5 z-50 w-full px-8 md:w-96 h-[450px] md:h-[450px]"
  >
    <Card className="w-full h-full shadow-2xl border-2 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg flex-shrink-0">
        <CardTitle className="text-sm font-medium">
          Chat with Agent
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsChatOpen(false)}
          className="h-6 w-6 p-0 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0 flex flex-col flex-1 overflow-hidden min-h-0 ">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-900 min-h-0 overflow-x-hidden hide-scrollbar">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%]  p-2 rounded-lg text-sm ${
                  message.sender === "user"
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 text-white border"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Sent image"
                    className="rounded mb-2 max-w-full h-auto cursor-pointer"
                    onClick={() => setZoomImage(message.image!)}
                  />
                )}
                {message.text && <p>{message.text}</p>}
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-green-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Agent selector */}
        <div className="p-3 border-t bg-gray-800 flex-shrink-0">
          <div className="flex items-center space-x-2">
            {isAssigned ? (
              <p className="text-sm text-gray-500">
                Assigned to <span className="font-semibold">{assignedAgentName}</span>
              </p>
            ) : agentsLoading ? (
              <div className="text-sm text-gray-500">Loading agents...</div>
            ) : availableAgents.length > 0 ? (
              <select
                value={selectedAgentId ?? ""}
                onChange={(e) => setSelectedAgentId(e.target.value || null)}
                className="flex-1 h-9 rounded-md border border-white border-input bg-transparent px-3 py-1 text-sm"
              >
                <option value="" className="text-black">Select agent</option>
                {availableAgents.map((a) => (
                  <option key={a._id} value={a._id} className="text-black">
                    {a.username}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-gray-500">Agent not found</div>
            )}

            {!isAssigned && (
              <Button
                onClick={handleAssignAgent}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
                disabled={assigning || !selectedAgentId}
              >
                {assigning ? "Assigning..." : "Assign"}
              </Button>
            )}
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="p-1 border-t bg-gray-800 flex-shrink-0">
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t bg-gray-800 relative flex-shrink-0">
          {showEmoji && (
            <div className="absolute bottom-full left-2 mb-1 z-50">
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={(d) => {
                  setNewMessage((p) => p + d.emoji);
                  setShowEmoji(false);
                }}
                width={280}
                height={360}
              />
            </div>
          )}
          <div className="flex space-x-2 items-center">
            {/* <button
              type="button"
              onClick={() => isAssigned && setShowEmoji((p) => !p)}
              className={`p-1 flex items-center justify-center border border-gray-500 rounded-lg ${
                isAssigned ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            >
              <Smile size={15} className="text-gray-400" />
            </button> */}

            <div>
              <div
                onClick={isAssigned ? handleIconClick : undefined}
                className={`p-1 flex items-center justify-center border border-gray-500 rounded-lg ${
                  isAssigned ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <Plus size={15} className="text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={!isAssigned}
              />
            </div>

            <div className="md:hidden block">
              <div
                onClick={isAssigned ? handleCameraClick : undefined}
                className={`p-1 flex items-center justify-center border border-gray-500 rounded-lg ${
                  isAssigned ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <Camera size={15} className="text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={handleCapture}
                className="hidden"
                disabled={!isAssigned}
              />
            </div>

            <input
              type="text"
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              placeholder={
                isAssigned
                  ? "Type your message..."
                  : "Assign an agent to start chat"
              }
              disabled={!isAssigned}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSendMessage()
              }
              className="flex-1 h-9 rounded-md border border-input border-white bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-green-500 hover:bg-green-600 py-2 px-2"
              disabled={!isAssigned || (!newMessage.trim() && !selectedImage)}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}

      {/* image zoom modal */}
      {zoomImage && <ImageModal src={zoomImage} onClose={() => setZoomImage(null)} />}
    </>
  );
}
