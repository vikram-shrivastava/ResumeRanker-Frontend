'use client';

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { 
  User, 
  Home, 
  Activity, 
  FileText, 
  LogOut, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  MessageSquare
} from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar"; 
import { useAuth } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  
  // Hooks for routing logic
  const pathname = usePathname();
  const router = useRouter();
  const {user}=useAuth()
  const username=user?user.username:"";
  const email=user?user.email:"";
  // Navigation Data
  const mainNavItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Get ATS Score", path: "/dashboard/ats-score", icon: <Activity size={20} /> }, // Note: matches the folder name created earlier
    { name: "Tailor Resume", path: "/dashboard/tailor-resume", icon: <FileText size={20} /> },
  ];

  const comingSoonItems = [
    { name: "AI Cover Letter", icon: <Sparkles size={20} /> },
    { name: "Mock Interview", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen flex overflow-hidden bg-gray-50`}
    >
      {/* --- Sidebar --- */}
      <aside className="flex w-64 flex-col justify-between bg-white border-r border-gray-200 transition-all duration-300">
        
        {/* Top Section */}
        <div className="p-6">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 mb-8 cursor-pointer" 
            onClick={() => router.push('/')}
          >
            <svg 
              className="w-7 h-7 text-black" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13C16 13 17 11 17 11C17 11 18 13 18 13C18 13 20 13 20 13C20 13 18.5 14.5 18.5 14.5C18.5 14.5 19 16.5 19 16.5C19 16.5 17.5 15.5 17.5 15.5C17.5 15.5 16 16.5 16 16.5C16 16.5 16.5 14.5 16.5 14.5C16.5 14.5 15 13 15 13C15 13 16 13 16 13Z" fill="currentColor"/>
            </svg>
            <span className="font-bold text-xl tracking-tight text-black">
              ResumeRanker
            </span>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-1 mb-6">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>
            {mainNavItems.map((item) => (
              <SidebarButton 
                key={item.name}
                icon={item.icon} 
                text={item.name} 
                active={pathname === item.path}
                onClick={() => router.push(`${item.path}`)
            }
              />
            ))}
          </nav>

          {/* AI Features (Coming Soon) */}
          <nav className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Tools</p>
            {comingSoonItems.map((item) => (
              <SidebarButton 
                key={item.name}
                icon={item.icon} 
                text={item.name} 
                badge="Coming Soon"
              />
            ))}
          </nav>
        </div>

        {/* Bottom Section: User Profile */}
        <div className="p-4 border-t border-gray-100 relative">
           {/* Popover Menu */}
           {showUserDetails && (
            <div className="absolute bottom-full left-4 right-4 mb-2 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 border-b border-gray-100">
                 <p className="text-sm font-semibold text-gray-900">{username}</p>
                 <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
              <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}

          {/* User Toggle Button */}
          <button
            onClick={() => setShowUserDetails(!showUserDetails)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-all ${
              showUserDetails ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center">
               <User size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 leading-none">{username}</p>
              <p className="text-xs text-gray-500 mt-1">Free Plan</p>
            </div>
            {showUserDetails ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/50">
           <DashboardNavbar />
        </div>

        {/* Dynamic Children */}
        <main className="flex-1 overflow-auto p-0 scroll-smooth">
            {children}
        </main>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENT ================= */

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
}

function SidebarButton({ icon, text, active = false, onClick, badge }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!!badge} // Disable click if it's a "Coming Soon" item
      className={`group flex w-full items-center gap-3 m-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-black text-white shadow-md shadow-gray-200"
          : badge 
            ? "text-gray-400 cursor-default" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {/* Icon Wrapper */}
      <span className={active ? "text-white" : badge ? "text-gray-400" : "text-gray-500 group-hover:text-gray-900"}>
        {icon}
      </span>
      
      <span className="flex-1 text-left">{text}</span>

      {/* Badge Logic */}
      {badge && (
        <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
          {badge}
        </span>
      )}
    </button>
  );
}