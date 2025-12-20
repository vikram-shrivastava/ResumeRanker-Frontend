'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { 
  ChevronLeft, 
  Mail, 
  Twitter, 
  MessageSquare, 
  Send,
  Copy,
  Check
} from 'lucide-react';

export default function ContactSupportPage(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  // Handle Form Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission (Mailto Trick)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link with the form data
    const emailTo = "vikrampshrivastav@gmail.com";
    const emailSubject = encodeURIComponent(`Support Request: ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\n\nMessage:\n${formData.message}`
    );

    // Open user's email client
    window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
  };

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vikrampshrivastav@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-black selection:text-white">
      
      {/* --- Navbar --- */}
      <Navbar />

      <main className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          
          {/* Breadcrumb */}
          <Link 
            href="/" 
            className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* --- Left Column: Contact Info --- */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
                  Contact Support
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Have a question, feedback, or need help optimizing your resume? Reach out to us directly.
                </p>
              </div>

              {/* Contact Card 1: Email */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4 transition-all hover:border-gray-300">
                <div className="p-3 bg-gray-100 rounded-lg text-black">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Email Us</h3>
                  <p className="text-sm text-gray-500 mb-2">For general inquiries and support.</p>
                  <div className="flex items-center gap-2">
                    <a href="mailto:vikrampshrivastav@gmail.com" className="text-black font-medium hover:underline">
                      vikrampshrivastav@gmail.com
                    </a>
                    <button 
                      onClick={handleCopyEmail}
                      className="text-gray-400 hover:text-black transition-colors"
                      title="Copy Email"
                    >
                      {copied ? <Check size={16} className="text-emerald-600"/> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Card 2: Twitter */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4 transition-all hover:border-gray-300">
                <div className="p-3 bg-gray-100 rounded-lg text-black">
                  <Twitter size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Follow on X (Twitter)</h3>
                  <p className="text-sm text-gray-500 mb-2">Get real-time updates and quick replies.</p>
                  <a 
                    href="https://twitter.com/Vikram_jsx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black font-medium hover:underline flex items-center gap-1"
                  >
                    @Vikram_jsx
                  </a>
                </div>
              </div>
            </div>

            {/* --- Right Column: Contact Form --- */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={20} className="text-gray-400" />
                <h2 className="text-xl font-bold text-gray-900">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How do I upload a PDF?"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 rounded-lg bg-black px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Email <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  This form will open your default email client.
                </p>
              </form>
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