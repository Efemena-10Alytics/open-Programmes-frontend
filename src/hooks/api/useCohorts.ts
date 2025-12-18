import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { CohortModel } from "../../models/Course";

function useCohorts() {
  const fetchCohorts = async (): Promise<CohortModel[]> => {
    const response = await api.get("/api/cohorts/change-requests");
    return response.data.data || [];
  };

  const { data, error, isLoading } = useQuery<CohortModel[], Error>({
    queryKey: ["cohorts-change-requests"],
    queryFn: fetchCohorts,
  });

  return {
    cohorts: data,
    isLoading,
    isError: error,
  };
}

export default useCohorts;