"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import StreamTab from "../../components/dashboard/classroom/StreamTab";
import ClassTab from "../../components/dashboard/classroom/ClassTab";
import ManageTab from "../../components/dashboard/classroom/ManageTab";
import CourseSelector from "../../components/dashboard/classroom/CourseSelector";

const ClassroomPage = () => {
  const { user } = useAuth();
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"stream" | "class" | "manage">("stream");
  
  const courses = user?.course_purchased || [];
  const selectedCourse = courses[selectedCourseIndex]?.course;
  const courseId = selectedCourse?.id;
  const cohortId = user?.cohorts?.[selectedCourseIndex]?.cohortId;
  
  const isAdmin = user?.role === "ADMIN" || user?.role === "COURSE_ADMIN";
  const hasMultipleCourses = courses.length > 1;

  // Fetch classroom data
  const { data: classroomData, isLoading } = useQuery({
    queryKey: ["classroom", cohortId, courseId],
    queryFn: async () => {
      if (!cohortId || !courseId) return null;
      const response = await api.get(`/api/classroom/${cohortId}`);
      return response.data;
    },
    enabled: !!cohortId && !!courseId,
  });

  const renderActiveTab = () => {
    if (!classroomData || isLoading) return <div>Loading...</div>;

    switch (activeTab) {
      case "stream":
        return <StreamTab classroomData={classroomData} />;
      case "class":
        return <ClassTab classroomData={classroomData} />;
      case "manage":
        return isAdmin ? <ManageTab classroomData={classroomData} /> : null;
      default:
        return <StreamTab classroomData={classroomData} />;
    }
  };

  // Auto-select the first course if only one exists
  useEffect(() => {
    if (courses.length === 1) {
      setSelectedCourseIndex(0);
    }
  }, [courses.length]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Course Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Classroom</h1>
              <p className="text-gray-600 mt-1">
                {selectedCourse?.title || "Select a course"}
              </p>
            </div>
            
            {hasMultipleCourses && (
              <div className="mt-4 lg:mt-0">
                <CourseSelector
                  courses={courses}
                  selectedIndex={selectedCourseIndex}
                  onCourseChange={setSelectedCourseIndex}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("stream")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "stream"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Announcement
              </button>
              <button
                onClick={() => setActiveTab("class")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "class"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Class
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("manage")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "manage"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Manage
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default ClassroomPage;