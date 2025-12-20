'use client';

import React, { useState } from "react";
import {
  ArrowRight,
  Brain,
  FileText,
  BarChart,
  CheckCircle,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

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
      a: "Yes. Your data is securely stored and never shared with third parties.",
    },
  ];

  return (
    <div className="text-gray-900">
      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between border-b bg-white px-8 py-4">
        <h1 className="text-xl font-bold text-indigo-600">ResumeRanker</h1>
        <div className="flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#faq" className="hover:text-indigo-600">FAQs</a>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-6xl px-8 py-20 text-center">
        <h2 className="text-4xl font-bold leading-tight">
          Rank, Optimize & Improve Your Resume with AI
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          ResumeRanker helps job seekers build ATS-friendly resumes using
          intelligent analysis and real-time feedback.
        </p>
        <button className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
          Try ResumeRanker <ArrowRight size={18} />
        </button>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section className="bg-gray-50 py-16">
        <h3 className="text-center text-2xl font-semibold">
          How ResumeRanker Works
        </h3>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-6">
          <WorkflowCard
            icon={<FileText />}
            title="Upload Resume"
            desc="Upload your existing resume in PDF or DOC format."
          />
          <WorkflowCard
            icon={<Brain />}
            title="AI Analysis"
            desc="AI parses, analyzes, and scores your resume."
          />
          <WorkflowCard
            icon={<BarChart />}
            title="Get Insights"
            desc="Receive improvement suggestions and ranking."
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="mx-auto max-w-6xl px-8 py-20">
        <h3 className="text-center text-2xl font-semibold">
          Key Features
        </h3>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Feature text="AI-powered resume scoring" />
          <Feature text="Job-role based optimization" />
          <Feature text="ATS compatibility checks" />
          <Feature text="Keyword & skill gap detection" />
          <Feature text="Resume export & insights" />
          <Feature text="Secure data handling" />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="bg-gray-50 py-16">
        <h3 className="text-center text-2xl font-semibold">
          Frequently Asked Questions
        </h3>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 px-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white p-4"
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? null : index)
                }
                className="flex w-full items-center justify-between font-medium"
              >
                {faq.q}
                <ChevronDown
                  className={`transition ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === index && (
                <p className="mt-2 text-sm text-gray-600">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-white px-8 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 text-sm text-gray-600">
          <p>© 2025 ResumeRanker. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function WorkflowCard({ icon, title, desc }: WorkflowCardProps): React.ReactElement {
  return (
    <div className="w-72 rounded-xl border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Feature({ text }: FeatureProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <CheckCircle className="text-indigo-600" size={20} />
      <span className="text-sm">{text}</span>
    </div>
  );
}
