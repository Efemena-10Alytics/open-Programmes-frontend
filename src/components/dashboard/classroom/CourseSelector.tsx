import React from 'react';

interface Course {
  id: string;
  course?: {
    id: string;
    title: string;
    imageUrl?: string;
  };
}

interface CourseSelectorProps {
  courses: Course[];
  selectedIndex: number;
  onCourseChange: (index: number) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedIndex,
  onCourseChange,
}) => {
  if (courses.length <= 1) {
    return null; // Don't show selector if only one course
  }

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="course-select" className="text-sm font-medium text-gray-700">
        Select Course:
      </label>
      <select
        id="course-select"
        value={selectedIndex}
        onChange={(e) => onCourseChange(parseInt(e.target.value))}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {courses.map((course, index) => (
          <option key={course.id} value={index}>
            {course.course?.title || `Course ${index + 1}`}
          </option>
        ))}
      </select>
      
      {/* Course Preview */}
      {courses[selectedIndex]?.course && (
        <div className="flex items-center space-x-3 mt-2 p-3 bg-gray-50 rounded-md">
          <img
            src={courses[selectedIndex].course?.imageUrl || "/default-course.png"}
            alt={courses[selectedIndex].course?.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {courses[selectedIndex].course?.title}
            </p>
            <p className="text-xs text-gray-500">
              {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSelector;