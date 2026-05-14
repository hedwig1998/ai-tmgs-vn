"use client";

import { signIn } from "next-auth/react";
import { Bot, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-2xl shadow-xl border border-border">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AI Chat TMGS</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Hệ thống AI Chat nội bộ dành riêng cho nhân viên TMGS.
          </p>
        </div>

        <button
          onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-xl font-medium transition-colors"
        >
          <LogIn className="w-5 h-5" />
          Đăng nhập bằng Office 365
        </button>

        <p className="text-xs text-center text-muted-foreground">
          * Chỉ chấp nhận email có đuôi @tmgs.vn
        </p>
      </div>
    </div>
  );
}
