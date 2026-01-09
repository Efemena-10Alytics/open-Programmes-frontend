"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../../lib/api";
import { VideoEngagement } from "../../dashboard/VideoEngagement";
import Loader from "../../utilities/Loader";

interface ProgressData {
  courseTitle: string;
  videosCompleted: number;
  totalVideos: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  lastActivity?: string;
  expectedVideoProgress?: number;
  expectedQuizProgress?: number;
}

const CourseAdminStudentProgress = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const studentId = params?.studentId as string;
  
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/engagement/course-admin/${courseId}/student/${studentId}`
        );

        const data: ProgressData = {
          ...response.data,
          expectedVideoProgress: 75,
          expectedQuizProgress: 60,
        };

        setProgress(data);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setError("Failed to load student progress");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && studentId) {
      fetchProgress();
    }
  }, [courseId, studentId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-gray-700">No progress data found</p>
      </div>
    );
  }

  const videoPercentage = Math.round(
    (progress.videosCompleted / progress.totalVideos) * 100
  );
  const quizPercentage = Math.round(
    (progress.quizzesCompleted / progress.totalQuizzes) * 100
  );
  const expectedVideoProgress = progress.expectedVideoProgress || 0;
  const expectedQuizProgress = progress.expectedQuizProgress || 0;

  return (
    <div className="max-w-4xl min-h-screen mx-auto bg-white p-6 rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Student Progress</h1>
        <Link
          href={`/dashboard/course-admin/${courseId}/students`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Students
        </Link>
      </header>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{progress.courseTitle}</h2>
        {progress.lastActivity && (
          <p className="text-gray-600 text-sm">
            Last active: {new Date(progress.lastActivity).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Video Progress */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Video Progress</span>
          <span className="font-medium">{videoPercentage}%</span>
        </div>

        <div className="relative h-6 bg-gray-200 rounded-full mb-8">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${videoPercentage}%` }}
          ></div>

          <div
            className="absolute w-1 h-8 bg-red-500 top-0 transform -translate-y-1"
            style={{ left: `${expectedVideoProgress}%` }}
          >
            <div className="absolute top-8 text-xs text-red-600 whitespace-nowrap transform -translate-x-1/2">
              Expected ({expectedVideoProgress}%)
            </div>
          </div>

          <div
            className="absolute w-1 h-6 bg-blue-600 top-0"
            style={{ left: `${videoPercentage}%` }}
          >
            <div className="absolute -bottom-6 text-xs text-blue-600 whitespace-nowrap transform -translate-x-1/2">
              ({videoPercentage}%)
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {progress.videosCompleted} of {progress.totalVideos} videos completed
        </p>
      </div>

      {/* Quiz Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Quiz Progress</span>
          <span className="font-medium">{quizPercentage}%</span>
        </div>

        <div className="relative h-6 bg-gray-200 rounded-full mb-8">
          <div
            className="absolute h-full bg-green-500 rounded-full"
            style={{ width: `${quizPercentage}%` }}
          ></div>

          <div
            className="absolute w-1 h-8 bg-red-500 top-0 transform -translate-y-1"
            style={{ left: `${expectedQuizProgress}%` }}
          >
            <div className="absolute top-8 text-xs text-red-600 whitespace-nowrap transform -translate-x-1/2">
              Expected ({expectedQuizProgress}%)
            </div>
          </div>

          <div
            className="absolute w-1 h-6 bg-green-600 top-0"
            style={{ left: `${quizPercentage}%` }}
          >
            <div className="absolute -bottom-6 text-xs text-green-600 whitespace-nowrap transform -translate-x-1/2">
              ({quizPercentage}%)
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          {progress.quizzesCompleted} of {progress.totalQuizzes} quizzes
          completed
        </p>
      </div>

      {/* Add the VideoEngagement component here */}
      {courseId && studentId && (
        <VideoEngagement courseId={courseId} studentId={studentId} />
      )}
    </div>
  );
};

export default CourseAdminStudentProgress;