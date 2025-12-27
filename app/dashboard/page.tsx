'use client';

import React, { useEffect, useState } from 'react';
import { 
  Upload, 
  FileText, 
  TrendingUp, 
  Search, 
  MoreHorizontal, 
  Download, 
  Filter,
  CheckCircle,
  XCircle,
  BarChart3
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

/* --- Types & Mock Data --- */
type Resume = {
  id: number;
  name: string;
  role: string; // Added role context
  uploadedAt: string;
  score: number;
  keywordMatch: number;
  tailored: boolean;
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const {user}=useAuth();
  
  useEffect(()=>{
    async function fetchData(){
      try {
        const response=await axios.get("http://localhost:8000/api/v1/resume/get-all-resume",{withCredentials:true});
        console.log("resumes data",response.data);
        setResumes(response.data.data.resumes);
        toast.success("Resumes fetched successfully");
      } catch (error: any) {
        setResumes([]);
        toast.error("No Resume Found");
      }
    }
    fetchData();
  }, [])
  // Derived Stats
  const username=user?user.username:"";
  const totalResumes =(resumes)? resumes?.length:(0);
  const averageScore = ((totalResumes>0)?(Math.round(resumes?.reduce((a, b) => a + b.score, 0) / totalResumes)):0);
  const tailoredCount = (totalResumes>0)?(resumes?.filter(r => r.tailored).length):(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 md:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {username}. Here is your resume performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <FileText size={16} /> Tailor Existing
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
            <Upload size={16} /> Upload Resume
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Resumes" 
            value={totalResumes.toString()} 
            icon={<FileText size={20} />} 
            trend="+1 this week"
          />
          <StatCard 
            title="Average ATS Score" 
            value={`${averageScore}%`} 
            icon={<TrendingUp size={20} />} 
            trend={averageScore > 75 ? "Excellent" : "Needs Work"}
            highlight={averageScore > 75}
          />
          <StatCard 
            title="Tailored Versions" 
            value={tailoredCount.toString()} 
            icon={<CheckCircle size={20} />} 
            trend="Optimization active"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Main Table Section (Span 2 cols) --- */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {/* Table Toolbar */}
            <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-semibold text-gray-900">Recent Uploads</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search resumes..." 
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">Resume Name</th>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3">Keywords</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(totalResumes>0)?(resumes.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((resume) => (
                    <tr key={resume.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{resume.name}</div>
                            <div className="text-xs text-gray-500">{resume.role} • {resume.uploadedAt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getScoreColor(resume.score)}`}>{resume.score}%</span>
                          {/* Mini Progress Bar */}
                          <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${getScoreBg(resume.score)}`} 
                              style={{ width: `${resume.score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {resume.keywordMatch}% Match
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge tailored={resume.tailored} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-black transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))):(
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No resumes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Table Footer */}
            {(totalResumes>0) &&
            <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center cursor-pointer hover:bg-gray-100 transition-colors">
              View all documents
            </div>
            }
          </div>

          {/* --- Insights Chart Section (Span 1 col) --- */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Score History</h3>
              <BarChart3 size={18} className="text-gray-400" />
            </div>
            
            {/* CSS-Only Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 h-48 pt-4 pb-2 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300 pointer-events-none">
                <div className="border-b border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0"></div>
              </div>

              {totalResumes>0 && resumes.map((resume, index) => (
                <div key={resume.id} className="relative group flex flex-col items-center flex-1 h-full justify-end z-10">
                   {/* Tooltip */}
                   <div className="absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {resume.score}%
                  </div>
                  {/* Bar */}
                  <div 
                    className={`w-full max-w-[30px] rounded-t-sm transition-all duration-500 hover:opacity-80 ${resume.score > 80 ? 'bg-emerald-500' : 'bg-gray-800'}`} 
                    style={{ height: `${resume.score}%` }} 
                  />
                  {/* Label */}
                  <span className="text-[10px] text-gray-400 mt-2">V{resumes.length - index}</span>
                </div>
            ))}
            </div>
            {totalResumes>0 &&
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={14} className="text-emerald-600" />
                    <span className="text-sm font-medium text-gray-900">Performance is Good</span>
                </div>
                <p className="text-xs text-gray-500">Your latest resume scored 95%, which is in the top 10% of users.</p>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== Helper Components & Functions =================== */

function StatCard({ title, value, icon, trend, highlight }: { title: string, value: string, icon: React.ReactNode, trend?: string, highlight?: boolean }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-32 hover:border-gray-300 transition-all">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-900">
          {icon}
        </div>
        {trend && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${highlight ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {trend}
            </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
        <div className="text-sm text-gray-500 font-medium">{title}</div>
      </div>
    </div>
  );
}

function StatusBadge({ tailored }: { tailored: boolean }) {
  if (tailored) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900 text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Tailored
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
      Original
    </span>
  );
}

// Helper for dynamic colors based on score
function getScoreColor(score: number) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
}

function getScoreBg(score: number) {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}