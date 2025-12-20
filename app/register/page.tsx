'use client';
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Get started with ResumeRanker
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <div className="flex items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-indigo-500">
              <User className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="john_doe"
                className="w-full border-none p-2 text-sm outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <div className="flex items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-indigo-500">
              <Mail className="h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border-none p-2 text-sm outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <div className="flex items-center rounded-lg border px-3 focus-within:ring-2 focus-within:ring-indigo-500">
              <Lock className="h-4 w-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border-none p-2 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
            className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login">
          <span className="cursor-pointer font-medium text-indigo-600 hover:underline">
            Sign in
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
