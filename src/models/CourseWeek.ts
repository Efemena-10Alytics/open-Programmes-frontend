import CourseModuleModel from "./CourseModule";

export default interface CourseWeekModel {
  id: string;
  title: string;
  iconUrl: string | null;
  courseId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  courseModules: CourseModuleModel[];
}

interface Attachment {
  id: string;
  courseWeekId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  url: string;
}
