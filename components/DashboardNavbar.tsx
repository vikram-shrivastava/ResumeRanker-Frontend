'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
export default function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname(); 

  // Simulated auth state
  const [username, setUsername] = useState<string>('');
  const [isuser, setIsuser] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user'); 
    const username=user?JSON.parse(user).username:"";
    if (user) {
      setIsuser(true);
      setUsername(username);
    } else {
      setIsuser(false);
      setUsername('User');
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response=await axios.post("http://localhost:8000/api/v1/users/logout",{},{withCredentials:true});
      if(response.data.success){
        console.log("logged out successfully")
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsuser(false);
    router.push('/login');
  };

  // Helper to get current page name for breadcrumbs
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean).pop();
    if (!path) return 'Overview';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 w-full bg-transparent">
      
      {/* Left: Breadcrumbs (Replaces Logo) */}
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/">
            <span className="hover:text-black hover:underline cursor-pointer transition-colors">App</span>
        </Link>
        <ChevronRight size={14} className="mx-2 text-gray-300" />
        <span className="font-medium text-black bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
          {getPageTitle()}
        </span>
      </div>

      {/* Right: Actions & Auth */}
      <div className="flex items-center gap-3">

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {!isuser ? (
          <>
            <button
              onClick={() => router.push('/login')}
              className="text-sm font-medium text-gray-600 hover:text-black px-4 py-2 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => router.push('/register')}
              className="text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-md shadow-gray-200"
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 pl-2">
            {/* Welcome Text */}
            <span className="hidden md:block text-sm text-gray-600">
              Hello, <span className="font-semibold text-gray-900">{username}</span>
            </span>
            
            <button
              onClick={handleLogout}
              className="text-sm font-medium border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}