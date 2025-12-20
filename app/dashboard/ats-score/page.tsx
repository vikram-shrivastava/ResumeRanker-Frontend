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

/* --- Mock Data Interfaces --- */
interface AnalysisResult {
  score: number;
  fileName: string;
  roleDetected: string;
  summary: string;
  keywordsFound: string[];
  keywordsMissing: string[];
  improvements: string[];
}

/* --- Main Page Component --- */
export default function GetATSPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // --- Event Handlers ---

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFileUpload(droppedFile);
    } else {
      alert('Please upload a PDF file.');
    }
  }, []);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
       handleFileUpload(selectedFile);
    }
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);

    // Simulate backend analysis delay (3 seconds)
    setTimeout(() => {
      setAnalysis({
        score: 82,
        fileName: uploadedFile.name,
        roleDetected: "Senior Frontend Engineer",
        summary: "Strong resume with good experience formatting. The structure is ATS-friendly.",
        keywordsFound: ["React", "TypeScript", "Next.js", "Tailwind CSS", "System Design"],
        keywordsMissing: ["GraphQL", "AWS", "CI/CD Pipelines", "Unit Testing (Jest)"],
        improvements: [
          "Add a 'Skills' section summary at the top for better parsing.",
          "Quantify your achievements in the 'Experience' section (e.g., 'improved performance by 20%').",
          "Ensure dates are formatted consistently (MM/YYYY)."
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetUpload = () => {
    setFile(null);
    setAnalysis(null);
  };

  // --- Color Helpers based on score ---
  const getScoreColor = (score: number) => {
    if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-500', border: 'border-emerald-500', lightBg: 'bg-emerald-50' };
    if (score >= 60) return { text: 'text-amber-600', bg: 'bg-amber-500', border: 'border-amber-500', lightBg: 'bg-amber-50' };
    return { text: 'text-red-600', bg: 'bg-red-500', border: 'border-red-500', lightBg: 'bg-red-50' };
  };

  return (
    <div className="min-h-full p-6 md:p-10">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black">ATS Resume Checker</h1>
        <p className="text-gray-500 text-sm mt-1">Upload your resume to see how well it parses against standard Applicant Tracking Systems.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* State 1 & 2: Upload Area OR Loading State */}
        {!analysis && (
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative flex flex-col items-center justify-center p-12 h-96 border-2 border-dashed rounded-xl transition-all bg-white
              ${isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'}
              ${isAnalyzing ? 'pointer-events-none opacity-90' : ''}
            `}
          >
            {isAnalyzing ? (
              /* Loading State */
              <div className="flex flex-col items-center animate-in fade-in duration-500">
                <Loader2 size={48} className="text-black animate-spin mb-4" />
                <p className="text-lg font-semibold text-gray-900">Analyzing your Resume...</p>
                <p className="text-sm text-gray-500 mt-2">Extracting keywords, formatting, and experience data.</p>
                <div className="mt-6 flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                    <FileText size={16} className="text-gray-500"/>
                    <span className="text-sm font-medium">{file?.name}</span>
                </div>
              </div>
            ) : (
              /* Upload State */
              <>
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={onFileSelect}
                />
                
                <div className="p-4 rounded-full bg-gray-100 mb-4">
                  <UploadCloud size={40} className="text-gray-600" />
                </div>
                <label htmlFor="file-upload" className="text-xl font-bold text-gray-900 cursor-pointer hover:underline">
                    Click to upload
                </label>
                <p className="text-gray-500 text-base mt-2">or drag and drop your PDF file here.</p>
                <p className="text-xs text-gray-400 mt-6">PDF only. Max file size 10MB.</p>
              </>
            )}
          </div>
        )}

        {/* State 3: Analysis Results Dashboard */}
        {analysis && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Summary Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                
                {/* Left: Score & File Info */}
                <div className="flex items-center gap-6 flex-1">
                   {/* Score Circle (CSS based) */}
                  <div className={`relative w-28 h-28 flex items-center justify-center rounded-full border-8 ${getScoreColor(analysis.score).lightBg} ${getScoreColor(analysis.score).border}`}>
                    <div className="text-center">
                      <span className={`text-3xl font-extrabold ${getScoreColor(analysis.score).text}`}>{analysis.score}</span>
                      <span className="block text-xs text-gray-500 font-medium uppercase">ATS Score</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Analysis Complete</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FileText size={14} />
                        <span>{analysis.fileName}</span>
                        <ChevronRight size={14} className="text-gray-300"/>
                        <Target size={14} />
                        <span>Detected Role: {analysis.roleDetected}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed max-w-lg">
                        <span className="font-semibold">Summary: </span>{analysis.summary}
                    </p>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div>
                    <button 
                        onClick={resetUpload}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors shadow-sm"
                    >
                        <RefreshCcw size={16} /> Upload Another
                    </button>
                </div>
              </div>
            </div>

            {/* Detailed Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Keywords Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-gray-500" /> Keyword Analysis
                </h3>
                
                <div className="space-y-6 flex-1">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500"/> Found Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keywordsFound.map(kw => (
                                <span key={kw} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-100">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <XCircle size={16} className="text-red-500"/> Missing Important Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keywordsMissing.map(kw => (
                                <span key={kw} className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md border border-red-100">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                 <div className="mt-6 pt-4 border-t border-gray-100">
                     <p className="text-xs text-gray-500">Tip: Add missing keywords naturally into your work experience.</p>
                 </div>
              </div>

              {/* Improvements Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-amber-500" /> Actionable Improvements
                </h3>
                 <ul className="space-y-3">
                    {analysis.improvements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}