'use client';

import api from "@/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
} from "lucide-react";

export default function ResumePage() {
  const params = useParams();
  const resumeId = params.resumeId as string;

  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    async function fetchResumeData() {
      try {
        const res = await api.get(
          `/api/v1/ats/get-atsscore-resume/${resumeId}`,
          { withCredentials: true }
        );
        setResumeData(res.data.data);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    }

    if (resumeId) fetchResumeData();
  }, [resumeId]);

  if (!resumeData) {
    return <div className="p-6 text-gray-500">Loading resume insights...</div>;
  }

  const score = resumeData.totalATSScore;

  const scoreLabel =
    score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Improvement";

  const scoreColor =
    score >= 85
      ? "text-emerald-600"
      : score >= 70
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Resume Insights
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Role Detected:{" "}
              <span className="font-medium text-gray-800">
                {resumeData.roleDetected}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`text-3xl font-bold ${scoreColor}`}>
                {score}%
              </div>
              <div className="text-sm text-gray-500">{scoreLabel}</div>
            </div>
            <TrendingUp className={`${scoreColor}`} />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={18} />
          <h2 className="text-lg font-semibold text-gray-900">
            Resume Summary
          </h2>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {resumeData.summary}
        </p>
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Found */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-emerald-600" size={18} />
            <h3 className="font-semibold text-gray-900">
              Keywords Found
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.keywordsFound.map((kw: string) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="text-red-500" size={18} />
            <h3 className="font-semibold text-gray-900">
              Missing Keywords
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.keywordsMissing.map((kw: string) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Improvements */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          Suggested Improvements
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          {resumeData.improvements.map((imp: string, idx: number) => (
            <li key={idx}>{imp}</li>
          ))}
        </ul>
      </div>

      {/* Footer Meta */}
      <div className="text-xs text-gray-500 text-center">
        Generated on{" "}
        {new Date(resumeData.createdAt).toLocaleDateString()} • ATS Mode:{" "}
        {resumeData.atsMode}
      </div>
    </div>
  );
}
