import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import CourseModel from "../../models/Course";

function useCourses() {
  const fetchCourses = async (): Promise<CourseModel[]> => {
    const response = await api.get("/api/courses");
    console.log(response);
    return response.data.data;
  };

  const { data, error, isLoading } = useQuery<CourseModel[], Error>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  return {
    courses: data,
    isLoading,
    isError: error,
  };
}

export default useCourses;
