import CourseWeekModel from "./CourseWeek";

export default interface CourseModel {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  course_duration: string;
  course_instructor_name: string;
  course_instructor_image: string;
  course_instructor_title: string;
  course_instructor_description: string;
  brochureUrl: string;
  course_preview_video: string;
  catalog_header_image: string;
  createdAt: string;
  updatedAt: string;
  skills_you_will_learn: SkillModel[];
  learning_Outcomes: LearningOutcomeModel[];
  prerequisites: PrerequisiteModel[];
  tags: TagModel[];
  catalog_header_tags: CatalogHeaderTagModel[];
  course_weeks: CourseWeekModel[];
  cohorts: CohortModel[];
}

export interface CohortModel {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  courseId: string;
  course?: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface LearningOutcomeModel {
  id: string;
  content: string;
  courseId: string;
}

interface PrerequisiteModel {
  id: string;
  content: string;
  courseId: string;
}

interface TagModel {
  id: string;
  content: string;
  courseId: string;
}

interface CatalogHeaderTagModel {
  id: string;
  title: string;
  imageUrl: string;
  courseId: string;
}

interface SkillModel {
  id: string;
  iconUrl: string;
  courseId: string;
}
