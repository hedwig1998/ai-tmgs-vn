"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, LogOut, Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function ChatInterface({ user }: { user: any }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-semibold text-lg">AI Chat TMGS</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Future feature: Chat History could go here */}
          <div className="text-sm text-muted-foreground">
            Lịch sử trò chuyện sẽ được cập nhật trong tương lai.
          </div>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-xs font-medium shrink-0">
              {user?.name?.charAt(0) || <User className="h-4 w-4" />}
            </div>
            <span className="text-sm font-medium truncate">{user?.name || "Người dùng"}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-semibold">AI Chat TMGS</span>
          </div>
          <button onClick={() => signOut()} className="text-muted-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Xin chào, {user?.name?.split(' ')[0] || "bạn"}!</h3>
              <p className="text-muted-foreground max-w-md">
                Tôi là trợ lý AI nội bộ của TMGS. Hãy đặt câu hỏi và tôi sẽ giúp bạn giải quyết công việc hiệu quả hơn.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 max-w-3xl mx-auto ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div
                  className={`flex-1 space-y-2 overflow-hidden px-4 py-3 rounded-2xl ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary text-secondary-foreground rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
            <div className="flex gap-4 max-w-3xl mx-auto">
              <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-secondary text-secondary-foreground rounded-tl-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Đang suy nghĩ...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-2 bg-card border border-border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow"
            >
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Nhập tin nhắn..."
                className="w-full max-h-32 min-h-[56px] py-4 pl-4 pr-12 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      const form = e.currentTarget.form;
                      if (form) form.requestSubmit();
                    }
                  }
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-colors hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground">
                AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
