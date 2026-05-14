"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Check, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-gray-900 transition-colors duration-300 font-sans flex flex-col relative">
      
      {/* Simple Top Left Back Button */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-[var(--brand-ink-soft)] hover:text-[var(--brand-primary)] transition-colors font-bold text-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Brand Logo */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/brand/careleo-main.png" 
                alt="Care Leo" 
                width={180} 
                height={60} 
                className="h-auto w-auto object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-2">
              Welcome Back!
            </h1>
            <p className="text-[var(--brand-ink-soft)] dark:text-gray-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl p-6 sm:p-8 border border-[var(--brand-line)] dark:border-gray-800 shadow-sm">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                  <input 
                    type="email" 
                    placeholder="hello@careleo.com" 
                    className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Password</label>
                  <Link href="/forgot-password" className="text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-10 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3 cursor-pointer w-fit mt-1" onClick={() => setRememberMe(!rememberMe)}>
                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${rememberMe ? 'bg-[var(--brand-primary)] border-none' : 'border border-[var(--brand-line)] dark:border-gray-600 bg-[var(--brand-surface)] dark:bg-gray-900'}`}>
                  {rememberMe && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-sm font-medium text-[var(--brand-ink-soft)] dark:text-gray-300">Remember me</span>
              </div>

              {/* Sign In Button */}
              <button 
                type="submit"
                className="w-full py-3.5 mt-2 bg-[var(--brand-primary)] hover:opacity-90 text-white rounded-xl font-bold text-base transition-all shadow-sm active:scale-[0.98]"
              >
                Sign In
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-[var(--brand-line)] dark:bg-gray-800 flex-1"></div>
              <span className="text-xs font-medium text-[var(--brand-ink-soft)] uppercase">Or continue with</span>
              <div className="h-px bg-[var(--brand-line)] dark:bg-gray-800 flex-1"></div>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 flex items-center justify-center gap-3 border border-[var(--brand-line)] dark:border-gray-700 rounded-xl hover:bg-[var(--background)] dark:hover:bg-gray-800 transition-colors font-semibold text-[var(--foreground)] dark:text-gray-200 text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="w-full py-3 flex items-center justify-center gap-3 border border-[var(--brand-line)] dark:border-gray-700 rounded-xl hover:bg-[var(--background)] dark:hover:bg-gray-800 transition-colors font-semibold text-[var(--foreground)] dark:text-gray-200 text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM7.5 4.5C6.1 4.5 5 5.6 5 7C5 8.4 6.1 9.5 7.5 9.5C8.9 9.5 10 8.4 10 7C10 5.6 8.9 4.5 7.5 4.5ZM16.5 4.5C15.1 4.5 14 5.6 14 7C14 8.4 15.1 9.5 16.5 9.5C17.9 9.5 19 8.4 19 7C19 5.6 17.9 4.5 16.5 4.5ZM12 8C9.2 8 7 10.2 7 13C7 15.8 9.2 18 12 18C14.8 18 17 15.8 17 13C17 10.2 14.8 8 12 8ZM4.5 10.5C3.1 10.5 2 11.6 2 13C2 14.4 3.1 15.5 4.5 15.5C5.9 15.5 7 14.4 7 13C7 11.6 5.9 10.5 4.5 10.5ZM19.5 10.5C18.1 10.5 17 11.6 17 13C17 14.4 18.1 15.5 19.5 15.5C20.9 15.5 22 14.4 22 13C22 11.6 20.9 10.5 19.5 10.5Z"/>
                </svg>
                Care Leo SSO
              </button>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center mt-8 text-sm text-[var(--brand-ink-soft)] dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
