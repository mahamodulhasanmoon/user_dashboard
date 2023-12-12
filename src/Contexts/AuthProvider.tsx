import React, { createContext,  useState, ReactNode, useEffect } from "react";
import { getData, postData } from "../api/fetching";
import { toast } from "react-toastify";


interface User {
  // Define your user object properties here
  id: string;
  name: string;
  // ...
}

interface AuthContextProps {
  logOut?: (e: React.SyntheticEvent) => void;
  user?: User | null;
  loading?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin?: (data: any) => Promise<any>; // You might want to replace 'any' with the actual type of your login data
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:any = await getData(`auth/me`);
        if (data.status === 'success') {
          setToken(data?.data?.token);
          setUser(data?.data);
          setLoading(false);
        } else {
          toast.error("something went wrong");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (data: any) => {
    const response:any = await postData("/auth/login", data);
    localStorage.setItem("access_token", JSON.stringify(response?.data?.token));
    setToken(response?.data?.token);
    setUser(response?.data?.user);
    if (response?.status === 200) {
      toast.success("Successfully logged in");
      // reset(); // Assuming 'reset' is a function to reset the form or any other state
      return response.data;
    }
  };

  const logOut = (e: React.SyntheticEvent) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    setUser(null);
    setToken(null);
    // Navigate('/login'); // Use the appropriate method to navigate to the login page
  };

  const authInfo: AuthContextProps = {
    user,
    loading,
    token,
    setToken,
    setLoading,
    setUser,
    handleLogin,
    logOut
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
