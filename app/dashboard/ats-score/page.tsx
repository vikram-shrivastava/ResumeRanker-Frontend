'use client';

import React, { useState, useCallback } from 'react';
import {
  UploadCloud,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCcw,
  ChevronRight,
  Target
} from 'lucide-react';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'sonner';
import api from '@/utils/axiosInstance';
/* --- Interfaces --- */
interface AnalysisResult {
  score: number;
  fileName: string;
  roleDetected: string;
  summary: string;
  keywordsFound: string[];
  keywordsMissing: string[];
  improvements: string[];
}

/* --- Main Page --- */
export default function GetATSPage() {
  const [atsMode, setAtsMode] = useState<'jd' | 'role'>('jd');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  /* ---------------- Upload Success ---------------- */
  const handleUploadSuccess = useCallback((result: any) => {
    if (result?.event !== 'success') return;
    console.log('Upload Success:', result);
    const url = result.info.secure_url;
    const fileName = `${result.info.original_filename}.${result.info.format}`;

    setCloudinaryUrl(url);
    setUploadedFileName(fileName);
    document.body.style.overflow = "auto";
    toast.success('Resume uploaded successfully');
  }, []);

  /* ---------------- Generate ATS ---------------- */
  const handleGenerateATS = async () => {
    if (!cloudinaryUrl || !uploadedFileName) {
      toast.error('Please upload a resume first');
      return;
    }

    try {
      const response = await api.post('/api/v1/resume/save-resume', { resumelink: cloudinaryUrl, originalFilename: uploadedFileName }, { withCredentials: true });
      console.log('Resume Save Response:', response);
      const resumeId = response.data.data._id;
      if (atsMode === 'jd' && !jobDescription.trim()) {
        toast.error('Please provide job description');
        return;
      }
  
      if (atsMode === 'role' && !jobRole.trim()) {
        toast.error('Please provide target job role');
        return;
      }
  
      setIsAnalyzing(true);
      console.log('Generating ATS Score with:', { resumeId, atsMode, jobDescription, jobRole });
      const response2 = await api.post('/api/v1/ats/create-ats-score', {
        resumeId: resumeId,
        atsMode,
        jobDescription,
        jobRole
      }, { withCredentials: true });

      setAnalysis({
        score: response2.data.data.totalATSScore,
        fileName: uploadedFileName,
        roleDetected: response2.data.data.roleDetected,
        summary: response2.data.data.summary,
        keywordsFound: response2.data.data.keywordsFound,
        keywordsMissing: response2.data.data.keywordsMissing,
        improvements: response2.data.data.improvements
      });

      toast.success('ATS Analysis Complete');
    } catch (error) {
      if(error instanceof axios.AxiosError){
        if(error.response?.status===429){
          toast.error("You have reached the generation limit. Please try again later.");
          return;
        }
      }
      toast.error('Failed to generate ATS score. Please try again.');
      console.error('ATS Generation Error:', error);
    }finally{
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setAnalysis(null);
    setCloudinaryUrl(null);
    setUploadedFileName(null);
    setJobDescription('');
    setJobRole('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return { text: 'text-emerald-600', border: 'border-emerald-600', lightBg: 'bg-emerald-50' };
    if (score >= 50)
      return { text: 'text-amber-600', border: 'border-amber-600', lightBg: 'bg-amber-50' };
    return { text: 'text-red-600', border: 'border-red-600', lightBg: 'bg-red-50' };
  };

  return (
    <div className="min-h-full p-6 md:p-10 bg-gray-50">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-black">ATS Resume Checker</h1>
        <p className="text-gray-500 text-sm mt-1">
          Analyze your resume using ATS logic with JD or role targeting
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {!analysis && (
          <div className="space-y-6">

            {/* ATS Mode */}
            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm font-semibold mb-3">Choose ATS Analysis Type</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setAtsMode('jd')}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium ${atsMode === 'jd'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-200'
                    }`}
                >
                  Resume + Job Description
                </button>

                <button
                  onClick={() => setAtsMode('role')}
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium ${atsMode === 'role'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-200'
                    }`}
                >
                  Resume + Target Job Role
                </button>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Upload Box */}
              <div className="flex items-center justify-center h-80 border-2 border-dashed rounded-xl bg-white text-black">
                {isAnalyzing ? (
                  <div className="text-center text-black">
                    <Loader2 size={40} className="animate-spin mx-auto mb-3" />
                    <p className="font-semibold">Analyzing resume…</p>
                  </div>
                ) : uploadedFileName ? (
                  <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-lg text-black">
                    <FileText size={22} />
                    <span className="text-sm font-medium">{uploadedFileName}</span>
                  </div>
                ) : (
                  <CldUploadWidget uploadPreset="Projects" onSuccess={handleUploadSuccess}>
                    {({ open }) => (
                      <div onClick={() => open()} className="text-center cursor-pointer">
                        <UploadCloud size={36} className="mx-auto mb-3" />
                        <p className="font-semibold">Upload Resume</p>
                        <p className="text-xs text-gray-500">PDF only · Max 10MB</p>
                      </div>
                    )}
                  </CldUploadWidget>
                )}
              </div>

              {/* Context Input */}
              {atsMode === 'jd' ? (
                <div className='flex flex-col h-full mt-1'>
                  <div className='text-xl font-bold text-black'>Job Description:</div>
                  <textarea
                    className="w-full h-40 p-3 rounded-lg border text-black"
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              ) : (
                <div className='flex flex-col h-full mt-1'>
                  <div className='text-xl font-bold text-black'>Job Role:</div>
                  <input
                    className="w-full p-3 rounded-lg border text-black"
                    placeholder="Target job role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerateATS}
                disabled={isAnalyzing}
                className={`px-6 py-2 bg-black text-white rounded-lg ${isAnalyzing ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
              >
                Generate ATS Score
              </button>
            </div>
          </div>
        )}

        {/* ================= RESULT ================= */}
        {/* ================= RESULT ================= */}
        {analysis && (
          <div className="space-y-6 text-black max-w-5xl mx-auto">

            {/* Score & Role */}
            <div className="bg-white p-6 rounded-xl border flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className={`w-24 h-24 flex items-center justify-center rounded-full border-8 ${getScoreColor(analysis.score).border} ${getScoreColor(analysis.score).lightBg}`}>
                  <span className={`text-3xl font-bold ${getScoreColor(analysis.score).text}`}>
                    {analysis.score}
                  </span>
                </div>

                <div className='text-black'>
                  <p className="font-bold text-lg">{analysis.fileName}</p>
                  <p className="text-sm text-gray-500">Detected Role: {analysis.roleDetected}</p>
                </div>
              </div>

              <button
                onClick={resetUpload}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <RefreshCcw size={16} /> Upload Another
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-2">Summary</h2>
              <p className="text-gray-700">{analysis.summary || 'No summary available.'}</p>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white p-6 rounded-xl border">
                <h2 className="font-semibold text-lg mb-2">Keywords Found</h2>
                {analysis.keywordsFound.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {analysis.keywordsFound.map((kw, idx) => (
                      <li key={idx}>{kw}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No keywords found.</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-xl border">
                <h2 className="font-semibold text-lg mb-2">Keywords Missing</h2>
                {analysis.keywordsMissing.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {analysis.keywordsMissing.map((kw, idx) => (
                      <li key={idx}>{kw}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No keywords missing.</p>
                )}
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="font-semibold text-lg mb-2">Suggested Improvements</h2>
              {analysis.improvements.length > 0 ? (
                <ul className="list-decimal list-inside text-gray-700">
                  {analysis.improvements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No improvements suggested.</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
