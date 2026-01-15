'use client'

import React, { useState } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardNavbar from "@/components/DashboardNavbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width":"16rem",
        "--sidebar-width-icon":"4rem"
      } as React.CSSProperties
    }>
      <div
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen w-full bg-gray-50`}
      >
        {/* ✅ SHADCN SIDEBAR */}
        <AppSidebar />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navbar */}
          <div className="sticky top-0 z-10 border-b bg-gray-50/80 backdrop-blur">
            <div className="flex h-14 items-center px-4 ">
              <SidebarTrigger />
              <DashboardNavbar />
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
