import { useQuery } from "@tanstack/react-query";
import TimelineCalendar from "../../components/dashboard/TimelineCalendar";
import ProgressBar from "../../components/utilities/ProgressBar";
import Card from "../../components/dashboard/Cards";
import ModulePanel from "../../components/dashboard/ModulePanel";
import WeekQuizzes from "../../components/dashboard/WeekQuizzes";
import api from "../../lib/api";
import CourseModel from "../../models/Course";
import { ProtectedRoute } from "../../components/utilities/ProtectedRoute";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Check, ChevronUp, ChevronDown, Lock } from "lucide-react";
import Loader from "../../components/utilities/Loader";

const Timetable = () => {
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseProgress, setCourseProgress] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState<any[]>([]);
  const [expandedQuizzes, setExpandedQuizzes] = useState<{
    [weekId: string]: boolean;
  }>({});
  const [unlockedWeeks, setUnlockedWeeks] = useState<number>(1);
  const [isNewStudent, setIsNewStudent] = useState(false);

  // Determine if user is a new student based on createdAt date
  useEffect(() => {
    if (user?.createdAt) {
      const userCreatedAt = new Date(user.createdAt);
      const cutoffDate = new Date('2025-09-05');
      const today = new Date();
      
      // User is considered "new" if:
      // 1. Their account was created on or after September 5th, 2025
      // 2. AND it's currently September 5th, 2025 or later
      const isNew = userCreatedAt >= cutoffDate && today >= cutoffDate;
      setIsNewStudent(isNew);
    }
  }, [user?.createdAt]);

  // Extract courses from user's course_purchased
  const userCourses = useMemo(() => {
    if (!user?.course_purchased?.length) return [];
    
    return user.course_purchased.map(purchase => purchase.course);
  }, [user?.course_purchased]);

  // Set initial selected course
  useEffect(() => {
    if (userCourses.length) {
      // Set to latest course (assuming last in array is most recent)
      const latestCourse = userCourses[userCourses.length - 1];
      setSelectedCourseId(latestCourse.id);
    }
  }, [userCourses]);

  // Fetch selected course data
  const { data: course, isLoading } = useQuery<CourseModel>({
    queryKey: ["course", selectedCourseId],
    queryFn: async () => {
      const response = await api.get(`/api/courses/${selectedCourseId}`);
      return response.data.data;
    },
    enabled: !!selectedCourseId,
  });

  // Track watched videos
  useEffect(() => {
    if (user?.completed_videos) {
      setWatchedVideos(user.completed_videos);
    }
  }, [user]);

  // Calculate course progress and unlocked weeks
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
      const progress =
        totalVideos > 0
          ? (user.completed_videos.length / totalVideos) * 100
          : 0;
      setCourseProgress(Math.ceil(progress));
      
      // Calculate unlocked weeks based on student type
      let unlocked = 1;
      const videoIds = user.completed_videos.map((video: any) => video.videoId);
      
      if (isNewStudent) {
        // NEW STUDENTS: Must complete all videos in a week to unlock the next
        for (let i = 0; i < course.course_weeks.length; i++) {
          const week = course.course_weeks[i];
          const weekVideos = week.courseModules.flatMap(module => module.projectVideos);
          const watchedWeekVideos = weekVideos.filter(video => videoIds.includes(video.id));
          
          // If all videos in this week are watched, unlock the next week
          if (watchedWeekVideos.length === weekVideos.length) {
            unlocked = i + 2;
          } else {
            break;
          }
        }
      } else {
        // EXISTING STUDENTS: Old behavior - all weeks are unlocked
        unlocked = course.course_weeks.length;
      }
      
      setUnlockedWeeks(Math.min(unlocked, course.course_weeks.length));
    }
  }, [user, course, isNewStudent]);

  const toggleQuizzes = (weekId: string) => {
    setExpandedQuizzes((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  };

  // Empty function for video selection (since this is just a preview)
  const handleVideoSelect = () => {
    // This is just a preview, so no action needed
  };

  return (
    <main className="bg-[#F4F4F4] min-h-screen">
      <section className="p-4 max-w-7xl mx-auto">
        {/* Course Selection Header */}
        <div className="mb-6">
          <label className="block text-sm text-[#6D6D6D] mb-2 font-medium">
            Select Course:
          </label>
          <div className="relative">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-2.5 border border-[#EFEFEF] rounded-[8px] appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
              disabled={!userCourses.length}
            >
              {userCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
              {!userCourses.length && (
                <option value="">No courses available</option>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Calendar Section */}
          <div className="lg:flex-1 bg-white p-4 rounded-xl shadow-sm">
            <TimelineCalendar courseId={selectedCourseId} />
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:w-[400px] flex flex-col gap-4">
            {!selectedCourseId ? (
              <div className="bg-white p-4 rounded-xl text-[#6D6D6D] text-center">
                {userCourses.length
                  ? "Select a course to view details"
                  : "You are not enrolled in any courses yet"}
              </div>
            ) : isLoading ? (
              <Loader />
            ) : (
              <>
                {/* Progress Card */}
                <div className="bg-white border border-[#EFEFEF] rounded-xl overflow-hidden">
                  <div className="bg-[#F7F8FA] p-4">
                    <h2 className="text-[#6D6D6D] font-semibold mb-3 text-sm">
                      {course?.title} Progress
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex-grow">
                        <ProgressBar progress={courseProgress} />
                      </div>
                      <span className="text-xs text-[#BCBCBC]">
                        {courseProgress}%
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-[#BCBCBC]">
                      Unlocked: {unlockedWeeks} of {course?.course_weeks.length || 0} weeks
                      {isNewStudent && " (New student rules apply)"}
                      {!isNewStudent && " (All content unlocked)"}
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                {course?.course_weeks.map((week, i) => {
                  const isWeekUnlocked = i < unlockedWeeks;
                  
                  return (
                    <div
                      key={i}
                      className={`bg-white border border-[#EFEFEF] rounded-xl overflow-hidden ${
                        !isWeekUnlocked ? "opacity-60" : ""
                      }`}
                    >
                      <div className="bg-[#F7F8FA] p-4 font-medium text-sm text-[#6D6D6D] flex justify-between items-center">
                        <span>
                          {week.title}
                          {!isWeekUnlocked && (
                            <Lock className="w-4 h-4 inline-block ml-2 text-red-500" />
                          )}
                        </span>
                        {!isWeekUnlocked && (
                          <span className="text-xs text-red-500">
                            {isNewStudent 
                              ? `Complete Week ${i} to unlock`
                              : "Content temporarily locked"
                            }
                          </span>
                        )}
                      </div>

                      {isWeekUnlocked ? (
                        <>
                          <div className="p-3">
                            {week.courseModules.map((module, j) => (
                              <ModulePanel
                                key={j}
                                module={module}
                                onVideoSelect={handleVideoSelect}
                                watchedVideos={watchedVideos}
                                weekIndex={i}
                                isWeekUnlocked={isWeekUnlocked}
                              />
                            ))}
                          </div>

                          {/* Quizzes Section */}
                          <div
                            className="px-4 py-3 bg-[#F7F8FA] border-t border-[#EFEFEF] flex items-center justify-between cursor-pointer"
                            onClick={() => toggleQuizzes(week.id)}
                          >
                            <h3 className="font-medium text-sm text-[#6D6D6D] flex items-center">
                              <Check className="w-4 h-4 mr-2 text-primary" />
                              Week Quizzes
                            </h3>
                            <div className="text-[#BCBCBC]">
                              {expandedQuizzes[week.id] ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>

                          {expandedQuizzes[week.id] && (
                            <div className="p-4 bg-white border-t border-[#EFEFEF]">
                              <WeekQuizzes
                                isCourseAdmin={user?.role === "COURSE_ADMIN"}
                                weekId={week.id}
                              />
                            </div>
                          )}

                          {/* Attachments */}
                          {week.attachments?.length > 0 && (
                            <div className="p-4 border-t border-[#EFEFEF]">
                              <h6 className="text-sm text-[#6D6D6D] font-medium mb-2 flex items-center">
                                <img
                                  src="/svg/list.svg"
                                  alt=""
                                  className="w-4 h-4 mr-2"
                                />
                                Attachments
                              </h6>
                              <div className="space-y-2">
                                {week.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className="flex items-center"
                                  >
                                    <img
                                      src="/svg/document.svg"
                                      alt=""
                                      className="w-4 h-4 mr-2"
                                    />
                                    <a
                                      href={attachment.url}
                                      download
                                      className="text-sm text-primary hover:underline truncate"
                                    >
                                      {attachment.name}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          <Lock className="w-8 h-8 mx-auto mb-2 text-red-400" />
                          {isNewStudent 
                            ? "Complete previous weeks to unlock this content"
                            : "Content review in progress - check back soon"
                          }
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Training Advisor Card */}
                <Card heading="Chat with a Training Advisor">
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="/img/dp1.png"
                        alt="Advisor"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-semibold text-[#6D6D6D]">
                          Elijah Ebulue
                        </div>
                        <div className="text-xs text-[#BCBCBC]">
                          Training Advisor
                        </div>
                      </div>
                    </div>
                    <div className="sm:ml-auto flex flex-col sm:flex-row items-center gap-3">
                      <div className="text-xs text-[#BCBCBC] text-center sm:text-right">
                        <div>Available - 24/7</div>
                        <div>Mon - Sat</div>
                      </div>
                      <button className="bg-[#FFB5B436] text-primary text-xs py-2 px-4 border border-primary rounded-lg hover:bg-[#ffb5b44d] transition-colors">
                        Chat Now
                      </button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProtectedRoute(Timetable);