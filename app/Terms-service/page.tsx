'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { ChevronLeft, FileText } from 'lucide-react';

export default function TermsServicePage(): React.ReactElement {
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
                <FileText size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-500">
                Last updated: December 20, 2025
              </p>
            </div>

            {/* Legal Content */}
            <div className="space-y-10 text-gray-600 leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">1</span>
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using <span className="font-semibold text-black">ResumeRanker</span>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">2</span>
                  Use of Service
                </h2>
                <p>
                  You agree to use ResumeRanker only for lawful purposes and in accordance with these Terms. You shall not use the service in any way that could damage, disable, overburden, or impair our servers or networks.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">3</span>
                  User Content
                </h2>
                <p>
                  You retain ownership of any content you submit to ResumeRanker (e.g., your resume PDF). However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content for the sole purpose of providing and improving our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">4</span>
                  Privacy
                </h2>
                <p>
                  Your use of ResumeRanker is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding data collection and security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">5</span>
                  Modifications to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of ResumeRanker after such changes constitutes your acceptance of the new terms.
                </p>
              </section>

            </div>

            {/* Bottom Note */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500 text-center">
              Questions about our terms? <a href="/contact-support" className="text-black font-medium underline hover:no-underline">Contact Support</a>
            </div>

          </div>
        </div>
      </main>

      {/* --- Simple Footer --- */}
      <footer className="bg-white border-t border-gray-200 py-12">
         <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
            <p>&copy; 2025 ResumeRanker. All rights reserved.</p>
         </div>
      </footer>

    </div>
  );
}