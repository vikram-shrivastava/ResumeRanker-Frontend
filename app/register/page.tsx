'use client';

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 text-gray-900 px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-200/50">

          {/* Header & Logo */}
          <div className="mb-8 text-center flex flex-col items-center">
             <div className="mb-4 flex items-center justify-center gap-2">
               {/* Custom SVG Logo */}
               <svg 
                className="w-8 h-8 text-black" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18L13.5 16.5L16 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13C16 13 17 11 17 11C17 11 18 13 18 13C18 13 20 13 20 13C20 13 18.5 14.5 18.5 14.5C18.5 14.5 19 16.5 19 16.5C19 16.5 17.5 15.5 17.5 15.5C17.5 15.5 16 16.5 16 16.5C16 16.5 16.5 14.5 16.5 14.5C16.5 14.5 15 13 15 13C15 13 16 13 16 13Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-black">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Get started with ResumeRanker today
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">

            {/* Username */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-900">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="john_doe"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-900">Email</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-900">Password</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-black hover:underline transition-all">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}