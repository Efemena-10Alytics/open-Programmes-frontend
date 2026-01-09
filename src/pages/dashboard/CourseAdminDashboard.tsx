"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";
import Loader from "../../components/utilities/Loader";

interface Course {
  id: string;
  title: string;
  studentCount: number;
  imageUrl?: string;
}

const CourseAdminDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/api/engagement/course-admin/dashboard"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container min-h-screen mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            {course.imageUrl && (
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">
                {course.studentCount} students enrolled
              </p>
              <Link
                href={`/dashboard/course-admin/${course.id}/students`}
                className="text-primary hover:underline"
              >
                View Students →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAdminDashboard;
