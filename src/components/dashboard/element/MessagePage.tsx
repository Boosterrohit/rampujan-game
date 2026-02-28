import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Send, Image, Smile, ArrowLeft, Menu } from "lucide-react";

interface Message {
  text?: string;
  image?: string;
  sender: "me" | "other";
}

interface User {
  id: string;          // chatId
  name: string;        // player name
  avatar: string;
  lastMessage?: string;
  online: boolean;
  unreadCount?: number;
}

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [loadingChats, setLoadingChats] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load current user (agent) from localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserRole(parsed.role);
        setAgentId(parsed.userId);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Load agent chats (assigned players)
  useEffect(() => {
    if (userRole !== "agent") return;

    const loadChats = async () => {
      setLoadingChats(true);
      try {
        const token = localStorage.getItem("accessToken");
        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/v1/chat/agent/chats", { headers });
        const data = await res.json();

        if (res.ok && data?.data?.chats) {
          const mapped: User[] = data.data.chats.map((chat: any) => {
            const name: string = chat.playerName || "Player";
            const initials =
              name &&
              name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase();
            return {
              id: chat.chatId,
              name,
              avatar: initials || "P",
              lastMessage: chat.lastMessage || "",
              online: true,
              unreadCount: chat.unreadCount || 0,
            };
          });
          setUsers(mapped);
        }
      } catch (err) {
        console.error("Failed to load agent chats", err);
      } finally {
        setLoadingChats(false);
      }
    };

    loadChats();
  }, [userRole]);

  // Auto scroll messages only when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages for a given chat
  const fetchMessages = async (chatId: string) => {
    if (!chatId || !agentId) return;

    try {
      const token = localStorage.getItem("accessToken");
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`/api/v1/chat/messages?chatId=${chatId}`, {
        headers,
      });
      const data = await res.json();

      if (res.ok && data?.data?.messages) {
        const formatted = data.data.messages.map((msg: any) => ({
          text: msg.content,
          image: msg.imageUrl || undefined,
          sender: msg.senderId === agentId ? "me" : "other",
        })) as Message[];
        setMessages(formatted);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  // Send message via backend
  const handleSend = async () => {
    if (!input.trim() || !selectedChatId || userRole !== "agent") return;

    try {
      const token = localStorage.getItem("accessToken");
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/v1/chat/message", {
        method: "POST",
        headers,
        body: JSON.stringify({ content: input, chatId: selectedChatId }),
      });
      const data = await res.json();

      if (res.ok && data?.data?.message) {
        const m = data.data.message;
        const next: Message = {
          text: m.content,
          sender: "me",
        };
        setMessages((prev) => [...prev, next]);
        setInput("");
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setMessages([
        ...messages,
        { image: reader.result as string, sender: "me" },
      ]);
    };
    reader.readAsDataURL(file);
  };

  // Handle user selection - NO scrolling triggered
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedChatId(user.id);
    setMessages([]);
    setShowUserList(false); // Hide user list on mobile
    fetchMessages(user.id);
  };

  // Handle back to user list on mobile
  const handleBackToList = () => {
    setShowUserList(true);
    setSelectedUser(null);
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiData: any) => {
    setInput((prev) => prev + emojiData.emoji);
    if (isMobile) {
      setShowEmoji(false); // Auto close on mobile after selection
    }
  };

  // Mobile emoji picker (using native keyboard)
  const handleMobileEmojiInput = () => {
    if (isMobile) {
      // On mobile, focus input and rely on native emoji keyboard
      const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
        // Try to trigger emoji keyboard (works on some mobile browsers)
        inputElement.setAttribute('inputmode', 'text');
      }
    } else {
      setShowEmoji(!showEmoji);
    }
  };

  // Only agents can use this screen
  if (userRole !== "agent") {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-slate-900 text-slate-300 rounded-md">
        Chat dashboard is available for agent accounts only.
      </div>
    );
  }

  return (
    <div className="flex h-[80vh] bg-slate-900 text-white overflow-hidden rounded-md overflow-hidden">
      {/* User List Sidebar */}
      <div
        className={`${
          showUserList ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-80 bg-slate-800 border-r border-slate-700`}
      >
        {/* User List Header */}
        <div className="p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold">Messages</h2>
          <p className="text-sm text-slate-400">Chat with other players</p>
        </div>

        {/* Users - Only this section scrolls */}
        <div 
          ref={userListRef}
          className="flex-1 overflow-y-auto"
        >
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`flex items-center gap-3 p-4 hover:bg-slate-700 cursor-pointer transition-colors ${
                selectedUser?.id === user.id ? "bg-slate-700" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                  {user.avatar}
                </div>
                {/* Online Status */}
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{user.name}</h3>
                </div>
                {user.lastMessage && (
                  <p className="text-sm text-slate-400 truncate">
                    {user.lastMessage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`${
          showUserList ? "hidden" : "flex"
        } md:flex flex-col flex-1 overflow-hidden relative`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700 flex items-center gap-3 flex-shrink-0">
              {/* Back Button (Mobile Only) */}
              <button
                onClick={handleBackToList}
                className="md:hidden  rounded-lg bg-slate-800! hover:bg-slate-700! checeing"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Selected User Info */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                  {selectedUser.avatar}
                </div>
                {selectedUser.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold">{selectedUser.name}</h2>
                <p className="text-xs text-slate-400">
                  {selectedUser.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages - Only this section scrolls */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === "me"
                        ? "bg-blue-600"
                        : "bg-slate-700"
                    }`}
                  >
                    {msg.text && <p className="break-words">{msg.text}</p>}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="uploaded"
                        className="rounded-lg max-w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700 flex-shrink-0 relative">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex gap-2">
                  {/* Emoji Button */}
                <button
                  ref={emojiButtonRef}
                  onClick={handleMobileEmojiInput}
                  className="p-2 rounded-lg bg-slate-700! hover:bg-slate-600! flex-shrink-0"
                >
                  <Smile size={20} />
                </button>

                {/* Image Upload */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-lg bg-slate-700! hover:bg-slate-600! flex-shrink-0"
                >
                  <Image size={20} />
                </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

               <div className="flex gap-2 w-full">
                 {/* Text Input */}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-800 border w-full border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />

                {/* Send */}
                <button
                  onClick={handleSend}
                  className="p-2 rounded-lg bg-blue-600! hover:bg-blue-700! flex-shrink-0"
                >
                  <Send size={20} />
                </button>
               </div>
              </div>

              {/* Emoji Picker - Desktop Only */}
              {showEmoji && !isMobile && (
                <div className="absolute bottom-full left-4 mb-2 z-50">
                  <EmojiPicker
                    theme={Theme.DARK}
                    onEmojiClick={handleEmojiClick}
                    width={320}
                    height={400}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          // No User Selected State
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Menu size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a user to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
