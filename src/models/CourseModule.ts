export default interface CourseModuleModel {
  id: string;
  title: string;
  description: string | null;
  iconUrl: string | null;
  courseWeekId: string;
  createdAt: string;
  updatedAt: string;
  projectVideos: CourseVideo[];
  quizzes: string[];
}

interface CourseVideo {
  id: string;
  title: string;
  courseId: string;
  duration: string;
  moduleId: string;
  thumbnailUrl: string;
  videoUrl: string;
  updatedAt: string;
  createdAt: string;
}
