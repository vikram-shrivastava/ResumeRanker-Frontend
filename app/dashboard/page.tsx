'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell } from "recharts"
import {
  ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
  BarChart3,
  DownloadIcon,
  Trash2,
  Share2,
  ArrowRight
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import api from "@/utils/axiosInstance.js"

type Resume = {
  _id: string;
  originalFilename: string;
  role: string; // Added role context
  updatedAt: string;
  score: number;
  keywordMatch: number;
  tailored: boolean;
  atsScore: number;
};


const chartConfig = {
  primary: {
    label: "ATS Score",
    color: "#2563eb", // blue-600
  },
  secondary: {
    label: "ATS Score (alt)",
    color: "#93c5fd", // blue-300
  },
} satisfies ChartConfig


export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [allResumes, setAllResumes] = useState<Resume[]>([])
  const [tableResumes, setTableResumes] = useState<Resume[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth();
  useEffect(() => {
    async function fetchPaginated() {
      try {
        const res = await api.get(
          `/api/v1/resume/get-all-resume-pagination?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )

        setTableResumes(res.data.data.resumes)
        setTotalPages(res.data.data.pagination.totalPages)
      } catch {
        setTableResumes([])
        toast.error("No Resume Found")
      }
    }

    fetchPaginated()
  }, [page, limit])


  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await api.get(
          `/api/v1/resume/get-all-resume`,
          { withCredentials: true }
        )

        // ✅ FIX: response.data.data IS the array
        setAllResumes(res.data.data)
      } catch {
        toast.error("No Resume Found")
      }
    }

    fetchAll()
  }, [])


  // Derived Stats
  const username = user ? user.username : "";
  const totalResumes = allResumes.length

  const averageScore =
    totalResumes > 0
      ? Math.round(
        allResumes.reduce((sum, r) => sum + r.atsScore, 0) / totalResumes
      )
      : 0

  const tailoredResumes = allResumes.filter(r => r.tailored).length


  const filteredResumes: Resume[] = tableResumes.filter(r =>
    r.originalFilename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const chartData = tableResumes.map((resume, index) => ({
    label: `V${tableResumes.length - index}`,
    name: resume.originalFilename,
    score: resume.atsScore,
    fill:
      index % 2 === 0
        ? "var(--color-primary)"
        : "var(--color-secondary)",
  }))


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6 md:p-10">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1 ">Welcome back, {username}. Here is your resume performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="default">
            <Link href="/dashboard/tailor-resume" className="flex items-center gap-2">
              <FileText size={16} /> Tailor Resume
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/ats-score" className="flex items-center gap-2">
              <Upload size={16} /> Get ATS Score
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            title="Tailored Resumes"
            value={tailoredResumes.toString()}
            icon={<CheckCircle size={20} />}
            trend="Improves Score"
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
                {/* <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <Filter size={16} />
                </button> */}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="w-full text-left text-sm">
                <TableCaption>A list of your recent resumes.</TableCaption>
                <TableHeader className="bg-gray-50 text-gray-500 font-medium">
                  <TableRow>
                    <TableHead className="px-6 py-3">Resume Name</TableHead>
                    <TableHead className="px-6 py-3">Score</TableHead>
                    <TableHead className="px-6 py-3">Status</TableHead>
                    <TableHead className="px-6 py-3 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 relative">
                  {(filteredResumes.length > 0) ? (filteredResumes.map(resume => (
                    <TableRow key={resume._id} className="hover:bg-gray-50 transition-colors group">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText size={16} />
                          </div>
                          <div className='cursor-default'>
                            <div className="font-medium text-gray-900 " title={`${resume.originalFilename}`}>
                              {resume.originalFilename.length > 12
                                ? `${resume.originalFilename.slice(0, 12)}...`
                                : resume.originalFilename}
                            </div>
                            <div className="text-xs text-gray-500">{resume.updatedAt.split("T")[0]}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getScoreColor(resume.atsScore)}`}>{resume.atsScore}%</span>
                          {/* Mini Progress Bar */}
                          <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getScoreBg(resume.atsScore)}`}
                              style={{ width: `${resume.atsScore}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <StatusBadge tailored={resume.tailored} />
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Link href={`/dashboard/resume/${resume._id}`}>
                          <button className="text-gray-400 hover:text-black transition-colors">
                            <ArrowRight size={18} />
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))) : (
                    <TableRow>
                      <TableCell colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No resumes found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Table Footer */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 flex justify-center">
                <Pagination>
                  <PaginationContent>

                    {/* Previous */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => page > 1 && setPage(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : " cursor-pointer"}
                      />
                    </PaginationItem>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNumber = i + 1
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            className='cursor-pointer'
                            isActive={page === pageNumber}
                            onClick={() => setPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}

                    {/* Next */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => page < totalPages && setPage(page + 1)}
                        className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>
            )}

          </div>

          {/* --- Insights Chart Section (Span 1 col) --- */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Score History</h3>
              <BarChart3 size={18} className="text-gray-400" />
            </div>

            {/* Shadcn Bar Chart */}
            <ChartContainer
              config={chartConfig}
              className="h-[220px] w-full"
            >
              <BarChart
                data={chartData}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <ChartTooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value}%`}
                      labelFormatter={(_, payload) =>
                        payload?.[0]?.payload?.name ?? ""
                      }
                    />
                  }
                />

                <Bar
                  dataKey="score"
                  radius={4}
                  fillOpacity={0.9}
                  isAnimationActive
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>


            {totalResumes > 0 &&
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
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all min-h-[8rem]">
      <div className="flex justify-between items-start ">
        <div className="bg-gray-50 rounded-lg text-gray-900 px-2 py-1 ">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${highlight ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="ml-2">
        <div className="text-2xl font-bold text-gray-900 tracking-tight break-words">{value}</div>
        <div className="text-sm text-gray-500 font-medium break-words">{title}</div>
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