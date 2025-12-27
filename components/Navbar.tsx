'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

function Navbar() {
  // Toggle this to test different states
  const {user}=useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* --- Logo Section --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg 
            className="w-6 h-6 text-black transition-transform group-hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13C16 13 17 11 17 11C17 11 18 13 18 13C18 13 20 13 20 13C20 13 18.5 14.5 18.5 14.5C18.5 14.5 19 16.5 19 16.5C19 16.5 17.5 15.5 17.5 15.5C17.5 15.5 16 16.5 16 16.5C16 16.5 16.5 14.5 16.5 14.5C16.5 14.5 15 13 15 13C15 13 16 13 16 13Z" fill="currentColor"/>
          </svg>
          <span className="text-lg font-bold tracking-tight text-black">ResumeRanker</span>
        </Link>

        {/* --- Navigation Links & Buttons --- */}
        <div className="flex items-center gap-8">
          
          {/* Menu Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQs</a>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-4 w-px bg-gray-200"></div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4 text-sm font-medium">
            {user ? (
              <Link href="/dashboard">
                <button className="rounded-lg bg-black px-5 py-2.5 text-white shadow-md shadow-gray-200 hover:bg-gray-800 transition-all hover:-translate-y-0.5">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-gray-600 hover:text-black transition-colors px-2">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="rounded-lg bg-black px-5 py-2.5 text-white shadow-md shadow-gray-200 hover:bg-gray-800 transition-all hover:-translate-y-0.5">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar