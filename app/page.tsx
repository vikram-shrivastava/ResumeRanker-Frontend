'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Brain,
  FileText,
  BarChart,
  CheckCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

/* ================= TYPES ================= */

type FAQ = {
  q: string;
  a: string;
};

type WorkflowCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type FeatureProps = {
  text: string;
};

/* ================= PAGE ================= */

export default function Home(): React.ReactElement {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default false, updates in useEffect

  const router = useRouter();

  const faqs: FAQ[] = [
    {
      q: "What is ResumeRanker?",
      a: "ResumeRanker is an AI-powered platform that analyzes, scores, and optimizes resumes based on job roles and descriptions.",
    },
    {
      q: "How does the AI ranking work?",
      a: "Our AI evaluates skills, keywords, experience relevance, and structure to generate an ATS-friendly score.",
    },
    {
      q: "Is ResumeRanker free to use?",
      a: "We offer a free plan with basic features and premium plans for advanced analysis and exports.",
    },
    {
      q: "Is my resume data safe?",
      a: "Yes. Your data is securely stored and never shared with third parties. We use industry-standard encryption.",
    },
  ];

  useEffect(() => {
    // Check auth state
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleCtaClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white font-sans">
      
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 text-center md:pt-32">
        
        {/* Decorative Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 cursor-default">
          <Sparkles size={12} className="text-black" />
          <span>New: AI Cover Letter Generation</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-black sm:text-6xl mb-6">
          Rank, Optimize & Improve <br className="hidden md:block" />
          <span className="text-gray-500">Your Resume with AI.</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 leading-relaxed">
          ResumeRanker helps job seekers build ATS-friendly resumes using
          intelligent analysis, real-time feedback, and keyword optimization.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleCtaClick}
            className="group h-12 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-8 text-white shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all hover:-translate-y-0.5"
          >
            Start Ranking Free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <Link href="#features">
             <button className="h-12 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-gray-700 hover:bg-gray-50 hover:text-black transition-all">
                Learn how it works
             </button>
          </Link>
        </div>

        {/* Social Proof / Trusted By (Optional Placeholder) */}
        <p className="mt-12 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Trusted by candidates from top companies
        </p>
      </section>

      {/* ================= WORKFLOW SECTION ================= */}
      <section className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
             <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              How ResumeRanker Works
            </h2>
            <p className="mt-4 text-gray-500">Three simple steps to land your dream job.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WorkflowCard
              icon={<FileText size={24} />}
              title="1. Upload Resume"
              desc="Upload your existing resume in PDF or DOC format. We support all standard layouts."
            />
            <WorkflowCard
              icon={<Brain size={24} />}
              title="2. AI Analysis"
              desc="Our engine parses your resume against thousands of job descriptions to find gaps."
            />
            <WorkflowCard
              icon={<BarChart size={24} />}
              title="3. Get Ranked"
              desc="Receive a detailed score and actionable insights to improve your ATS ranking immediately."
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Everything you need to get hired
            </h2>
            <p className="mt-4 text-gray-500">Powerful tools designed to beat the Applicant Tracking Systems.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature text="AI-powered resume scoring" />
          <Feature text="Job-role based optimization" />
          <Feature text="ATS compatibility checks" />
          <Feature text="Keyword & skill gap detection" />
          <Feature text="Instant PDF Export" />
          <Feature text="Bank-grade Data Security" />
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="bg-white py-24 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-black mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          
          <div className="flex items-center gap-2">
            {/* Small Logo Icon */}
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white font-bold text-xs">R</div>
            <p>© 2025 ResumeRanker. All rights reserved.</p>
          </div>

          <div className="flex gap-8">
            <a href="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="/Terms-service" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="/contact-support" className="hover:text-black transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function WorkflowCard({ icon, title, desc }: WorkflowCardProps): React.ReactElement {
  return (
    <div className="relative group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Feature({ text }: FeatureProps): React.ReactElement {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50">
      <div className="flex-shrink-0">
        <CheckCircle className="text-black" size={20} />
      </div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}