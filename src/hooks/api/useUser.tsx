import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api"; // Adjust the import path as needed

function useUser(userID: string | null) {
  const fetchUser = async () => {
    if (!userID) return null;
    const response = await api.get(`/api/users/${userID}`);
    return response.data;
  };

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", userID],
    queryFn: fetchUser,
    enabled: !!userID,
  });

  return { userData, error, isLoading };
}

export default useUser;
