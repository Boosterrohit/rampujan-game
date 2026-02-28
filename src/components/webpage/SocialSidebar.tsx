import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

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

export default function SocialSidebar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
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
  const location = useLocation();

  // Get user info from localStorage (userInfo for dashboard, user for web player)
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = localStorage.getItem("user");
    try {
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        setUserRole(parsed.role);
        setUserId(parsed.userId);
      } else if (user) {
        const parsed = JSON.parse(user);
        setUserRole(parsed.role);
        setUserId(parsed.userId);
      }
    } catch (e) {
      console.error("Failed to parse user info", e);
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // Close chat when route changes
  useEffect(() => {
    setIsChatOpen(false);
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
        
        const res = await fetch(`/api/v1/chat/agents/available`, {
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

  // Auto-refresh messages when chat is open and assigned
  useEffect(() => {
    if (!isChatOpen || !isAssigned) return;

    const refreshInterval = setInterval(() => {
      fetchMessages(null);
    }, 3000); // Refresh every 3 seconds

    return () => clearInterval(refreshInterval);
  }, [isChatOpen, isAssigned]);

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
      
      const res = await fetch(`/api/v1/chat/messages${queryParam}`, {
        headers,
      });
      const data = await res.json();
      
      if (res.ok && data?.data?.messages) {
        if (data?.data?.chat?._id) setChatId(data.data.chat._id);
        // Backend returns newest-first; reverse so we show oldest at top, newest at bottom
        const source = data.data.messages.slice().reverse();
        const formattedMessages = source.map((msg: Message, idx: number) => ({
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
          image: msg.imageUrl || undefined,
        }));
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

        const res = await fetch(`/api/v1/chat/message/image`, {
          method: "POST",
          headers,
          body: formData,
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
            image: newMsg.imageUrl,
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

        const res = await fetch(`/api/v1/chat/message`, {
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

      const res = await fetch(`/api/v1/chat/assign-agent`, {
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
    fileInputRef.current?.click();
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
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  // Only render for players, not agents or admins
  if (userRole === "agent" || userRole === "admin") {
    return null;
  }

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

        {/* Chat Button */}
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
      </div>

      {/* Chat Popup */}
      {isChatOpen && (
<<<<<<< HEAD
        <div
          ref={chatRef}
          className="fixed bottom-4 md:bottom-4 right-3 md:right-5 z-50 w-full px-8 md:w-96 h-96 md:h-96"
        >
        <Card className="w-full h-full shadow-2xl border-2">
=======
      <div
        ref={chatRef}
        className="fixed bottom-4 md:bottom-4 right-3  md:right-5 z-50 w-full px-8 md:w-96 h-96 md:h-96"
      >
        <Card className="w-full h-full shadow-2xl border-2 bg-orange-300">
>>>>>>> ba2f14260dd9301510b5facc73f933da68ec9001
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
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
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
<<<<<<< HEAD
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
=======
            <div className="flex-1 overflow-y-auto p-3 overflow-hidden space-y-3 bg-card dark:bg-gray-900">
              {/* {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
>>>>>>> ba2f14260dd9301510b5facc73f933da68ec9001
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-green-500 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Sent image"
                          className="rounded mb-2 max-w-full h-auto"
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
<<<<<<< HEAD
                ))}
                <div ref={messagesEndRef} />
              </div>
            <div className="p-3 border-t bg-white dark:bg-gray-800">
=======
                </div>
              ))} */}
              {messages.map((message) => (
  <div
    key={message.id}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[70%] p-2 rounded-lg text-sm ${
        message.sender === "user"
          ? "bg-green-500 text-white"
          : "bg-gray-800 text-white  border"
      }`}
    >
      {message.image && (
        <img
          src={message.image}
          alt="Sent image"
          className="rounded mb-2 max-w-full h-auto"
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
            </div>

            {/* Agent selector */}
            <div className="p-3 border-t bg-gray-800 dark:bg-gray-800">
>>>>>>> ba2f14260dd9301510b5facc73f933da68ec9001
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

              {imagePreview && (
                <div className="p-1 border-t bg-white dark:bg-gray-800">
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

<<<<<<< HEAD
              {/* Input */}
              <div className="p-3 border-t bg-white dark:bg-gray-800 relative">
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
                  <button
                    type="button"
                    onClick={() => isAssigned && setShowEmoji((p) => !p)}
                    className={`p-1 flex items-center justify-center border border-gray-500 rounded-lg ${
                      isAssigned ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Smile size={15} className="text-gray-400" />
                  </button>
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
                        isAssigned ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                    >
                      <Camera size={15} className="text-gray-400" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      ref={fileInputRef}
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
                    className="flex-1 h-9 rounded-md border border-input border-gray-500 bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
=======
            {/* Input */}
            <div className="p-3 mb-14 border-t bg-gray-800">
              <div className="flex space-x-2 items-center">
                <div>
  <div
    onClick={isAssigned ? handleIconClick : undefined}
    className={`p-1 flex items-center justify-center border border-gray-500 rounded-lg ${
      isAssigned ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
    }`}
  >
    <Plus size={15} className="text-gray-400" />
  </div>

  {/* Hidden File Input */}
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
      isAssigned ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
    }`}
  >
    <Camera size={15} className="text-gray-400" />
  </div>

  {/* Hidden Input for Camera */}
  <input
    type="file"
    accept="image/*"
    capture="environment"
    ref={fileInputRef}
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
                  className="flex-1 h-9 w-9 rounded-md border border-input border-white bg-transparent px-3 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
>>>>>>> ba2f14260dd9301510b5facc73f933da68ec9001
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
    </>
  );
}
