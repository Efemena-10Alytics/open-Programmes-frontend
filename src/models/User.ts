import CourseModel from "./Course";

export default interface UserModel {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  password: string;
  role: "USER" | "ADMIN" | "COURSE_ADMIN";
  access_token: string;
  ongoing_courses: [];
  cohorts?: Cohort[];
  completed_courses: [];
  completed_videos: CompletedVideos[];
  course_purchased: CoursePurchased[];
  createdAt: string;
  updatedAt: string;
  inactive?: boolean; 
}

interface Cohort {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date | null;
  cohortId: string;
  courseId: string;
  course: {
    id: string;
    title: string;
    // Other course properties if needed
  };
  users: {
    userId: string;
    user: {
      id: string;
      name: string;
      // Other minimal user properties
    };
    isPaymentActive: boolean;
  }[];
   cohort: {
    id: string;
    title: string;
    description: string | null;
    price: string | null;
    imageUrl: string | null;
    // Other cohort course properties
  };
  cohortCourses: {
    id: string;
    title: string;
    description: string | null;
    price: string | null;
    imageUrl: string | null;
    // Other cohort course properties
  }[];
  isPaymentActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CoursePurchased {
  id: string;
  courseId: string;
  userId: string;
  course: CourseModel;
}

export interface CompletedVideos {
  id: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
  userId: string;
  videoId: string;
}
