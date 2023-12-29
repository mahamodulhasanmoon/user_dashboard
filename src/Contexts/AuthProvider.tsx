import React, { createContext,  useState, ReactNode, useEffect } from "react";
import { getData, postData } from "../api/fetching";
import { toast } from "react-toastify";


export interface User {
  // Define your user object properties here
  _id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
 
}

export interface AuthContextProps {
  logOut?: (e: React.SyntheticEvent) => void;
  user?: User | null | undefined;
  loading?: boolean;
  token?: string | null;
  role?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin?: (data: any) => Promise<User>; // You might want to replace 'any' with the actual type of your login data
}

export const AuthContext = createContext<AuthContextProps | any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const[role,setRole]= useState<string | null >(null)
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
     
    
      try {
        if(localStorage.getItem('access_token')){
          const data:any = await getData(`auth/me`);
          if (data.status === 'success') {
            setToken(data?.data?.token);
            setRole(data?.data?.role);
            setUser(data?.data);
            setLoading(false);
          } else {
            setLoading(false)
            toast.error("something went wrong");
          }
        }
        setLoading(false)

      } catch (error) {
        setLoading(false)
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
      // reset(); 
      return response;
    }
  };

  const logOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
     
        const data:any = await getData(`auth/logout`);
        if (data.status === 'success') {
          localStorage.removeItem("access_token");
          setUser(null);
          setToken(null);
          window.location.href = '/signin';
        } 
      }
     

     catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  
  console.log(user);
  const authInfo: AuthContextProps = {
    user,
    loading,
    token,
    setToken,
    setLoading,
    setUser,
    handleLogin,
    logOut,
    role
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
