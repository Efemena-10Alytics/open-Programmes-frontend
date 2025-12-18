import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccessToken, removeTokens } from "../lib/tokenStorage";
import UserModel from "../models/User";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { useQuery, QueryClient } from "@tanstack/react-query";
import Loader from "../components/utilities/Loader";
import { config } from "../config";

interface AuthContextType {
  user: UserModel | null;
  login: (userData: UserModel) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userID: string | null;
  isLoading: boolean;
  refetchUser: () => Promise<UserModel | null>;
}

interface JWTPayload {
  email: string;
  id: string;
  role: string;
  iat: string;
  exp: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);
  const baseURL = config.url.API_URL;

  // Add refetchUser function to the context
  const refetchUser = async (): Promise<UserModel | null> => {
    if (!userID) return null;
    
    try {
      setIsLoading(true);
      const response = await api.get(`/api/users/${userID}`);
      const userData = response.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error refetching user data:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDirectly = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/users/${id}`);
      const userData = response.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const { data: userData } = useQuery({
    queryKey: ["user", userID],
    queryFn: () => fetchUserDirectly(userID!),
    enabled: !!userID,
    retry: 3,
  });

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = getAccessToken();
      if (token) {
        console.log("Access token is available");
        setIsAuthenticated(true);

        const { id } = jwtDecode<JWTPayload>(token);
        setUserID(id);
        
        try {
          const response = await api.get(`/api/users/${id}`);
          setUser(response.data.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setUserID(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) return <Loader />;

  const login = async (userData: UserModel) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    if (userData.id) {
      try {
        const fullUserData = await fetchUserDirectly(userData.id);
        setUser(fullUserData);
      } catch (error) {
        console.error("Failed to fetch complete user data after login:", error);
      }
    }
  };

  const logout = () => {
    console.log("Logging out");
    removeTokens();
    setUser(null);
    setIsAuthenticated(false);
    setUserID(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated, 
        userID, 
        isLoading,
        refetchUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}