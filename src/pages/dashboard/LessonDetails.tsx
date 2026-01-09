"use client"; // Add this because we're using hooks

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Card from "../../components/dashboard/Cards";
import ModulePanel from "../../components/dashboard/ModulePanel";
import ProgressBar from "../../components/utilities/ProgressBar";
import WeekQuizzes from "../../components/dashboard/WeekQuizzes";
import api from "../../lib/api";
import CourseModel from "../../models/Course";
import { ProtectedRoute } from "../../components/utilities/ProtectedRoute";
import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { config } from "../../config";
import CustomVimeoPlayer from "../../components/dashboard/CustomVimeoPlayer";
import Loader from "../../components/utilities/Loader";
import { Check, ChevronUp, ChevronDown, Menu, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EnrolledCourseData {
  courseId: string;
}

interface CurrentContentState {
  id: string;
  url: string;
  title: string;
  type: "video" | "quiz";
  position?: number;
}

const STORAGE_KEY = "course_player_state";

const LessonDetails = () => {
  const baseURL = config.url.API_URL;
  const router = useRouter();
  const params = useParams();
  const courseID = params?.courseID as string;
  
  const { user, userID } = useAuth();
  const queryClient = useQueryClient();

  // Initializing current content from localStorage if available
  const [currentContent, setCurrentContent] = useState<CurrentContentState>(
    () => {
      if (typeof window === "undefined") {
        return {
          id: "",
          url: "",
          title: "",
          type: "video",
          position: 0,
        };
      }
      
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Using only the saved state if it's for the same course
        if (parsedState.courseId === courseID) {
          return parsedState.content;
        }
      }

      return {
        id: "",
        url: "",
        title: "",
        type: "video",
        position: 0,
      };
    }
  );

  const [courseProgress, setCourseProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<any[]>([]);
  const [expandedQuizzes, setExpandedQuizzes] = useState<{
    [weekId: string]: boolean;
  }>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [hasInitialContentSet, setHasInitialContentSet] = useState(false);

  // Check if user account is active - SIMPLIFIED VERSION
  const canAccessContent = !user?.inactive;

  // Saving current content to localStorage whenever it changes
  useEffect(() => {
    if (currentContent.id && courseID && typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          courseId: courseID,
          content: currentContent,
        })
      );
    }
  }, [currentContent, courseID]);

  // Auto-hide sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Set initial state
    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetching course data
  const { data: course } = useQuery<CourseModel, Error>(
    {
      queryKey: ["course", courseID],
      queryFn: async () => {
        const response = await api.get(`/api/courses/${courseID}`);
        return response.data.data;
      },
      enabled: canAccessContent && !!courseID, // Only fetch course data if user has access and courseID exists
      staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    }
  );

  // Extracting watched videos from user data
  useEffect(() => {
    if (user?.completed_videos && course) {
      setWatchedVideos(user.completed_videos);
    }
  }, [user, course]);

  // Calculating progress
  useEffect(() => {
    if (user?.completed_videos && course) {
      const totalVideos = course.course_weeks.reduce(
        (total, week) =>
          total +
          week.courseModules.reduce(
            (modTotal, mod) => modTotal + mod.projectVideos.length,
            0
          ),
        0
      );
      const progress = (user.completed_videos.length / totalVideos) * 100;
      setCourseProgress(Math.ceil(progress));
    }
  }, [user, course]);

  // Starting course if not already started
  const { mutate: startCourse } = useMutation({
    mutationFn: (data: EnrolledCourseData) =>
      api.patch(`${baseURL}/api/update-ongoing-course`, data),
  });

  useEffect(() => {
    if (courseID && user && user.ongoing_courses?.length <= 0 && canAccessContent) {
      startCourse({ courseId: courseID });
    }
  }, [courseID, user, canAccessContent]);

  // Setting the initial content if we don't have saved state
  useEffect(() => {
    if (course && course.course_weeks.length > 0 && !currentContent.id && canAccessContent && !hasInitialContentSet) {
      const firstModule = course.course_weeks[0].courseModules[0];
      if (firstModule?.projectVideos?.length > 0) {
        const firstVideo = firstModule.projectVideos[0];
        setCurrentContent({
          id: firstVideo.id,
          url: firstVideo.videoUrl,
          title: firstVideo.title,
          type: "video",
          position: 0,
        });
        setHasInitialContentSet(true);
      }
    }
  }, [course, currentContent.id, canAccessContent, hasInitialContentSet]);

  const handleVideoSelect = useCallback((
    videoId: string,
    videoUrl: string,
    videoTitle: string,
    weekIndex: number
  ) => {
    // All videos are accessible - removed week locking check
    setCurrentContent({
      id: videoId,
      url: videoUrl,
      title: videoTitle,
      type: "video",
      position: 0, // Resetting position when a new video is selected
    });

    // Auto-hide sidebar on mobile after selecting a video
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowSidebar(false);
    }
  }, []); // Removed unlockedWeeks dependency

  const handleVideoWatched = useCallback(async (videoId: string, videoUrl: string) => {
    // Updating local state immediately to reflect the change
    if (!watchedVideos.some((video: any) => video.videoId === videoId)) {
      setWatchedVideos((prev) => [...prev, { videoId }]);
    }
    
    // Silently update the user data in the background without causing a UI refresh
    if (userID) {
      // Invalidate queries but don't force an immediate refetch
      queryClient.invalidateQueries({ 
        queryKey: ["user", userID],
        refetchType: 'none' // This prevents immediate refetch
      });
    }
  }, [watchedVideos, userID, queryClient]);

  // Tracking video position updates
  const handleVideoTimeUpdate = useCallback((position: number) => {
    setCurrentContent((prev) => ({
      ...prev,
      position,
    }));
  }, []);

  // Toggling quiz visibility for a specific week
  const toggleQuizzes = useCallback((weekId: string) => {
    setExpandedQuizzes((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  }, []);

  // Toggle sidebar visibility (for mobile)
  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  // Show blocked content if user is inactive
  if (!canAccessContent) {
    return (
      <main className="bg-gray-100 min-h-screen w-full px-3 sm:px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Account Inactive
          </h2>
          <p className="text-gray-600 mb-6">
            Your account is currently inactive. Please contact support to restore access to your course content.
          </p>
          <Link
            href="/dashboard"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen w-full px-3 sm:px-4 md:px-6 py-4">
      {/* Mobile toggle button for sidebar */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Toggle course content"
      >
        <Menu className="w-5 h-5" />
      </button>

      <section className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto">
        {/* Main Video Player Area - Made Sticky */}
        <div
          className={`w-full lg:w-3/5 order-1 ${
            showSidebar ? "lg:order-1" : "order-1"
          }`}
        >
          <div className="lg:sticky lg:top-4 bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <div className="text-gray-600 text-xs sm:text-sm mb-2 truncate">
              {`Lesson Videos > ${course?.title || "Loading..."} ${
                currentContent.id ? `> ${currentContent.title}` : ""
              }`}
            </div>

            <div className="aspect-video w-full">
              {currentContent.id &&
              courseID &&
              currentContent.type === "video" ? (
                <CustomVimeoPlayer
                  videoUrl={currentContent.url}
                  videoId={currentContent.id}
                  onVideoWatched={handleVideoWatched}
                  courseId={courseID}
                  watchedVideos={watchedVideos}
                  initialPosition={currentContent.position || 0}
                  onTimeUpdate={handleVideoTimeUpdate}
                  key={currentContent.id} // Add key to force re-render when video changes
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Content Sidebar - Scrollable */}
        <div
          className={`
          w-full lg:w-2/5 order-2 
          ${showSidebar ? "block" : "hidden"} 
          lg:block
          transition-all duration-300 ease-in-out
          lg:max-h-screen lg:overflow-y-auto
        `}
        >
          <div className="flex flex-col gap-3 sm:gap-4 lg:pb-4">
            {/* Progress Card */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-50 p-3 sm:p-4">
                <h2 className="text-gray-700 font-semibold text-sm sm:text-base mb-2 sm:mb-3">
                  {course?.title || "Loading..."} Course
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <ProgressBar progress={courseProgress} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {courseProgress}%
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {course?.course_weeks.length || 0} weeks of content
                </div>
              </div>
            </div>

            {/* Course Weeks */}
            {course?.course_weeks.map((week, i) => (
              <div
                key={week.id || i}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="bg-gray-50 p-3 sm:p-4 font-medium text-sm sm:text-base text-gray-800">
                  {week.title}
                </div>

                <div className="bg-white text-gray-800 py-2 px-3">
                  {week.courseModules.map((module, j) => (
                    <ModulePanel
                      module={module}
                      key={module.id || j}
                      onVideoSelect={(videoId, videoUrl, videoTitle) => 
                        handleVideoSelect(videoId, videoUrl, videoTitle, i)
                      }
                      watchedVideos={watchedVideos}
                      weekIndex={i}
                      isWeekUnlocked={true} // Always unlocked now
                    />
                  ))}
                </div>

                {/* Quiz section dropdown header */}
                <div
                  className="px-3 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleQuizzes(week.id)}
                >
                  <h3 className="font-medium text-xs sm:text-sm text-gray-800 flex items-center">
                    <Check className="w-4 h-4 mr-2 text-primary" />
                    Week Quizzes
                  </h3>
                  <div className="text-gray-500">
                    {expandedQuizzes[week.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Quiz content - only shown when expanded */}
                {expandedQuizzes[week.id] && (
                  <div className="px-3 py-3 bg-white border-t border-gray-100">
                    <WeekQuizzes
                      isCourseAdmin={user?.role === "COURSE_ADMIN"}
                      weekId={week.id}
                    />
                  </div>
                )}

                {/* Attachments section */}
                {week.attachments && week.attachments.length > 0 && (
                  <div className="bg-white border-t border-gray-100 px-3 py-3">
                    <h6 className="text-xs sm:text-sm text-gray-800 font-medium mb-2 flex items-center">
                      <Image
                        src="/svg/list.svg"
                        alt="List icon"
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                      />
                      Attachments
                    </h6>
                    <div className="px-2 space-y-2">
                      {week.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center">
                          <Image
                            src="/svg/document.svg"
                            alt="Document icon"
                            width={12}
                            height={12}
                            className="w-3 h-3 mr-2"
                          />
                          <a
                            href={attachment.url}
                            download
                            className="text-xs text-blue-500 hover:underline flex items-center truncate"
                          >
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LessonDetails;