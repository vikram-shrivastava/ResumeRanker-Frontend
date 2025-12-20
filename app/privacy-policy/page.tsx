'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Server, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';

export default function PrivacyPolicyPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-black selection:text-white">
      
      {/* --- Navbar --- */}
      <Navbar />

      <main className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          
          {/* Breadcrumb / Back Link */}
          <Link 
            href="/" 
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>

          {/* --- Content Card --- */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
            
            {/* Header */}
            <div className="text-center mb-12 border-b border-gray-100 pb-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-black">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-500">
                Last updated: December 20, 2025
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10 text-gray-600 leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">1</span>
                  Information We Collect
                </h2>
                <div className="pl-9">
                    <p>
                    We collect personal information that you provide to us when you register for an account, use our services, or communicate with us. This may include your name, email address, and any other information you choose to provide.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">2</span>
                  How We Use Your Information
                </h2>
                <div className="pl-9">
                    <p>
                    We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience. We <span className="font-semibold text-black">do not sell or rent</span> your personal information to third parties.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">3</span>
                  Data Security
                </h2>
                <div className="pl-9">
                    <p>
                    We implement appropriate security measures (such as encryption and secure servers) to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">4</span>
                  Your Rights
                </h2>
                <div className="pl-9">
                    <p>
                    You have the right to access, correct, or delete your personal information stored on our servers. You may also opt-out of receiving promotional communications from us at any time via your account settings.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">5</span>
                  Changes to This Policy
                </h2>
                <div className="pl-9">
                    <p>
                    We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after such changes constitutes your acceptance of the new policy.
                    </p>
                </div>
              </section>

            </div>

            {/* Bottom Note */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500 text-center">
              Concerns about your data? <a href="#" className="text-black font-medium underline hover:no-underline">Contact our Data Officer</a>
            </div>

          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-200 py-12">
         <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 ResumeRanker. All rights reserved.</p>
         </div>
      </footer>

    </div>
  );
}