'use client';

import React, { useEffect, useState } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Eye,
  ChevronRight,
  Plus
} from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'sonner';
import axios from 'axios';

interface Resume {
  _id: string;
  originalFilename: string;
  updatedAt: string;
}

export default function TailorResumePage() {
  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<Resume>({ _id: '', originalFilename: '', updatedAt: '' });
  const [jobDescription, setJobDescription] = useState('');
  const [additionalSkills, setAdditionalSkills] = useState('');
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [recentResumes,setRecentResumes]=useState<Resume[]>([]);
  // Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // --- Handlers ---

  useEffect(()=>{
    async function fetchRecentResumes (){
      try {
        const response = await axios.get('http://localhost:8000/api/v1/resume/get-all-resume',{withCredentials:true});
        console.log("Recent Resumes Response:",response);
        const resume = response.data.data;
        setRecentResumes(resume);
        console.log("Recent Resumes Fetched:",resume);
        toast.success("Recent resumes fetched successfully.");
      } catch (error) {
        toast.error("Failed to fetch recent resumes.");
      }
    }
    fetchRecentResumes();
  },[])
  const handleSelectResume = (resume: typeof recentResumes[0]) => {
    setSelectedResume(resume);
    setIsModalOpen(false);
  };
  const totalResumes=recentResumes.length;
  const handleGenerate = async() => {
    if (!selectedResume || !jobDescription) return;
    
    setIsGenerating(true);
    setShowResult(false);

    try {
      const response=await axios.post("http://localhost:8000/api/v1/ats/tailor-resume-for-job",{resumeId:selectedResume._id,jobDescription:jobDescription,dataforresume:additionalSkills},{responseType: "blob",withCredentials:true});
      console.log("Tailor Resume Response:",response);
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl); // opens PDF in new tab
    } catch (error) {
      console.error("Error tailoring resume:",error);
      toast.error("Failed to tailor resume. Please try again.");
    } finally {
      setIsGenerating(false);
      setShowResult(true);
    }

  };

    const handleUploadSuccess = (result:any) => {
    if (result.event === "success") {
      const info = result.info;

      setCloudinaryUrl(info.secure_url);
      setSelectedResume({ _id: info.asset_id, originalFilename: info.original_filename + '.' + info.format, updatedAt: 'Just now' });
      
      setRecentResumes(prev => [{ _id: info.asset_id, originalFilename: info.original_filename + '.' + info.format, updatedAt: 'Just now' }, ...prev]);
      setIsModalOpen(false);

      toast.success("Resume uploaded successfully!");
    }
  };

  return (
    <div className="min-h-full p-6 md:p-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black">Tailor Resume with AI</h1>
        <p className="text-gray-500 text-sm mt-1">
          Customize your resume for specific job descriptions to pass ATS filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        
        {/* --- LEFT COLUMN: Inputs --- */}
        <div className="space-y-6">
          
          {/* 1. Resume Selector */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-bold text-gray-900 mb-4">
              1. Select Base Resume
            </label>
            
            {selectedResume ? (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded border border-gray-200 text-red-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{selectedResume.originalFilename}</p>
                    <p className="text-xs text-gray-500">Uploaded: {selectedResume.updatedAt.split("T")[0]}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-medium text-gray-600 hover:text-black underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all group"
              >  
                <div className="p-3 bg-gray-100 rounded-full mb-3 group-hover:bg-white group-hover:shadow-sm">
                  <Upload size={24} className="text-gray-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Choose or Upload Resume</p>
              </button>
                )}
          </div>

          {/* 2. Job Description */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              2. Paste Job Description (JD)
            </label>
            <textarea 
              className="w-full h-48 p-4 text-sm text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50 resize-none"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* 3. Additional Skills (Optional) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-900">
                3. Additional Context <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
            </div>
            <input 
              type="text" 
              className="w-full text-black p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-gray-50"
              placeholder="e.g. Include my certification in AWS, emphasize leadership..."
              value={additionalSkills}
              onChange={(e) => setAdditionalSkills(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedResume || !jobDescription || isGenerating}
            className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-white transition-all shadow-md
              ${(!selectedResume || !jobDescription || isGenerating) 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-black hover:bg-gray-800 shadow-gray-200'}
            `}
          >
            {isGenerating ? (
              <>
                <Sparkles className="animate-spin" size={20} /> Tailoring Resume...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate Tailored Resume
              </>
            )}
          </button>
        </div>

        {/* --- RIGHT COLUMN: Preview / Result --- */}
        <div className="bg-gray-100 rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center min-h-[500px] lg:h-auto relative overflow-hidden">
          
          {/* State 1: Empty Placeholder */}
          {!isGenerating && !showResult && (
            <div className="text-center text-gray-400">
              <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded mx-auto mb-4 bg-gray-50"></div>
              <p className="text-sm">Your tailored resume preview <br/>will appear here.</p>
            </div>
          )}

          {/* State 2: Generating Animation */}
          {isGenerating && (
            <div className="text-center animate-pulse">
               <div className="w-[300px] h-[400px] bg-white shadow-lg rounded mb-4 p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 rounded w-full mt-8"></div>
               </div>
               <p className="text-gray-600 font-medium text-sm">AI is rewriting your bullet points...</p>
            </div>
          )}

          {/* State 3: Result (PDF Preview) */}
          {showResult && (
            <div className="w-full h-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Success Badge */}
              <div className="mb-6 flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 size={16} /> Resume Tailored Successfully!
              </div>

              {/* Mock PDF Viewer */}
              <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 flex-1 relative overflow-hidden group">
                 {/* This represents the PDF content */}
                 <div className="p-8 space-y-4 opacity-50 blur-[0.5px] select-none scale-[0.8] origin-top">
                    <div className="h-8 bg-gray-900 rounded w-2/3 mb-6"></div>
                    <div className="flex gap-4 mb-6">
                        <div className="h-4 bg-gray-300 w-1/4"></div>
                        <div className="h-4 bg-gray-300 w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 w-full"></div>
                    <div className="h-4 bg-gray-200 w-5/6"></div>
                    <div className="h-4 bg-gray-200 w-full"></div>
                    
                    <div className="mt-8 h-6 bg-gray-400 w-1/3"></div>
                    <div className="h-4 bg-gray-200 w-full"></div>
                    <div className="h-4 bg-gray-200 w-full"></div>
                 </div>

                 {/* Overlay Actions */}
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="bg-white text-black px-4 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50">
                        <Eye size={16} /> Preview
                    </button>
                 </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 flex gap-4 w-full max-w-md">
                 <button className="flex-1 bg-black text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-gray-800 transition-all">
                    <Download size={18} /> Download PDF
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL COMPONENT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">Select Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Uploads</p>
              
              <div className="space-y-2 mb-6">
                {totalResumes>0 && recentResumes.map((resume) => (
                  <button
                    key={resume._id}
                    onClick={() => handleSelectResume(resume)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-black hover:bg-gray-50 transition-all group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded text-gray-500 group-hover:text-black transition-colors">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{resume.originalFilename}</p>
                        <p className="text-xs text-gray-500">{resume.updatedAt.split("T")[0]}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-black" />
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-xs text-gray-400">OR</span>
                </div>
              </div>
                 <CldUploadWidget uploadPreset="Projects" onSuccess={handleUploadSuccess}>
                {({ open }) => (
              <div className="mt-6" onClick={()=>open()}>
                <button 
                  onClick={handleUploadSuccess}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium text-sm flex items-center justify-center gap-2 hover:border-black hover:text-black transition-all"
                >
                  <Plus size={18} /> Upload New Resume
                </button>
              </div>
              )}
              </CldUploadWidget>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}