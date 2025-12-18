"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/dashboard/table";
import { format, getMonth, getYear } from "date-fns";
import Loader from "../../components/utilities/Loader";
import Image from "next/image";

interface Cohort {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  image?: string;
  enrolledAt: string;
  videosCompleted: number;
  totalVideos: number;
  expectedVideoProgress: number;
  cohorts: {
    cohort: Cohort;
  }[];
}

const CourseAdminStudents = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableMonths] = useState<{ value: number; name: string }[]>([
    { value: 0, name: "January" },
    { value: 1, name: "February" },
    { value: 2, name: "March" },
    { value: 3, name: "April" },
    { value: 4, name: "May" },
    { value: 5, name: "June" },
    { value: 6, name: "July" },
    { value: 7, name: "August" },
    { value: 8, name: "September" },
    { value: 9, name: "October" },
    { value: 10, name: "November" },
    { value: 11, name: "December" },
  ]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/engagement/course-admin/${courseId}/students`
        );

        // Sort students by enrolledAt date (latest first)
        const sortedStudents = [...response.data].sort((a, b) => {
          return new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime();
        });

        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);

        // Extract unique years from enrollment dates
        const yearsSet = new Set<number>();
        
        response.data.forEach((student: Student) => {
          const enrollmentDate = new Date(student.enrolledAt);
          const year = getYear(enrollmentDate);
          yearsSet.add(year);
        });

        const years = Array.from(yearsSet).sort((a, b) => b - a); // Sort descending
        setAvailableYears(years);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchStudents();
    }
  }, [courseId]);

  useEffect(() => {
    // Apply filters whenever search term, selected year, or selected month changes
    let result = [...students];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term)
      );
    }

    // Apply year filter
    if (selectedYear !== "all") {
      const yearToFilter = parseInt(selectedYear);
      result = result.filter((student) => {
        const enrollmentDate = new Date(student.enrolledAt);
        return getYear(enrollmentDate) === yearToFilter;
      });
    }

    // Apply month filter
    if (selectedMonth !== "all") {
      const monthToFilter = parseInt(selectedMonth);
      result = result.filter((student) => {
        const enrollmentDate = new Date(student.enrolledAt);
        return getMonth(enrollmentDate) === monthToFilter;
      });
    }

    setFilteredStudents(result);
  }, [searchTerm, selectedYear, selectedMonth, students]);

  const handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-red-500">
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium">{error}</span>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Function to render student progress bar
  const renderProgressBar = (student: Student) => {
    const videoPercentage = Math.round(
      (student.videosCompleted / student.totalVideos) * 100
    );

    return (
      <div className="w-40">
        <div className="flex justify-between text-xs mb-1">
          <span>{videoPercentage}%</span>
          {videoPercentage < student.expectedVideoProgress && (
            <span className="text-blue-600">
              {student.expectedVideoProgress}%
            </span>
          )}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Current progress bar */}
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${videoPercentage}%` }}
          ></div>

          {/* Expected progress marker - only show if student is behind */}
          {videoPercentage < student.expectedVideoProgress && (
            <div
              className="absolute w-0.5 h-3 bg-blue-500 top-0 transform -translate-y-0.5"
              style={{
                left: `${student.expectedVideoProgress}%`,
              }}
            ></div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {student.videosCompleted}/{student.totalVideos} videos
        </div>
      </div>
    );
  };

  return (
    <div className="container min-h-screen mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Your Students</h1>
        <Link
          href="/dashboard/course-admin"
          className="text-primary hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back to Courses
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-12 gap-4">
          {/* Search by Name/Email (spans 6 columns on medium screens) */}
          <div className="col-span-12 md:col-span-6">
            <label
              htmlFor="search"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Search Students
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by name or email"
                className="w-full p-3 pl-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter by Year (spans 3 columns on medium screens) */}
          <div className="col-span-6 md:col-span-3">
            <label
              htmlFor="year"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Filter by Year
            </label>
            <select
              id="year"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white transition-all text-sm"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Month (spans 3 columns on medium screens) */}
          <div className="col-span-6 md:col-span-3">
            <label
              htmlFor="month"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Filter by Month
            </label>
            <select
              id="month"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white transition-all text-sm"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {availableMonths.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span>
          Showing <strong>{filteredStudents.length}</strong> of{" "}
          <strong>{students.length}</strong> students
        </span>
        {(searchTerm || selectedYear !== "all" || selectedMonth !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedYear("all");
              setSelectedMonth("all");
            }}
            className="text-primary hover:underline text-sm font-medium transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="px-4 py-3 font-semibold text-gray-800">
                  Student
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-gray-800">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-gray-800">
                  Video Progress
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-gray-800">
                  Enrolled
                </TableHead>
                <TableHead className="px-4 py-3 font-semibold text-gray-800">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {student.image ? (
                          <Image
                            src={student.image}
                            alt={student.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">
                          {student.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-600">
                      {student.email}
                    </TableCell>
                    {/* Video Progress Bar Cell */}
                    <TableCell className="px-4 py-3">
                      {renderProgressBar(student)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-600">
                      {format(new Date(student.enrolledAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Link
                        href={`/dashboard/course-admin/${courseId}/student/${student.id}`}
                        className="text-primary hover:underline font-medium transition-colors"
                      >
                        View Engagement
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <span className="mb-3 font-medium">
                        No students found matching your criteria
                      </span>
                      {(searchTerm || selectedYear !== "all" || selectedMonth !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedYear("all");
                            setSelectedMonth("all");
                          }}
                          className="text-primary hover:underline transition-colors"
                        >
                          Clear filters and show all students
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CourseAdminStudents;