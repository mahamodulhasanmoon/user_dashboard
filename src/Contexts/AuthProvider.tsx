import React, { createContext,  useState, ReactNode, useEffect } from "react";
import { getData, postData } from "../api/fetching";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { socketUrl } from "../constant/environment";
import { showPushNotification } from "../utils/pushMsg";


export interface User {
  // Define your user object properties here
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
 
}

export interface AuthContextProps {
  logOut?: (e: React.SyntheticEvent) => void;
  user?: User | null | undefined;
  loading?: boolean;
  showModal?: any;
  token?: string | null;
  role?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  setShowModal?:React.Dispatch<React.SetStateAction<any>>;
  handleLogin?: (data: any) => Promise<User>; // You might want to replace 'any' with the actual type of your login data
}

export const AuthContext = createContext<AuthContextProps | any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const socket = io(socketUrl);
  const [showModal, setShowModal] = useState<Boolean>(false);
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



  // socket Connections
  useEffect(() => {

    const userId = user?.id

    socket.emit('joinRoom', userId);

    socket.on('infoUpdate', () => {
     
      const audio = new Audio('notification.mp3');
      audio.load()
      audio.play()
      .then(() =>   {
              setTimeout(() => {
        const messageAudio = new Audio('message.mp3');
        messageAudio.load();
        messageAudio.play()
          .then(() => {
            console.log('Message sound played');
            showPushNotification();
          })
          .catch(error => {
            console.error('Error playing message sound:', error);
          });
      }, 2000);
      })
      .catch(error => {
        console.error('Autoplay prevented:', error);
      });
      showPushNotification()
   
    }); 

    return () => {
      socket.disconnect();
    };
  }, [socket]);


    useEffect(() => {
      const requestNotificationPermission = async () => {
        try {
          await Notification.requestPermission();
          
          const permission = Notification.permission;
          if (permission !== 'granted') {
            new Notification('Permission Required', {
              body: 'Please Acess Notification',
            });
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      };
  
      requestNotificationPermission();
    }, []);
  
  const authInfo: AuthContextProps = {
    user,
    loading,
    token,
    setToken,
    setLoading,
    setUser,
    handleLogin,
    logOut,
    role,
    showModal,
    setShowModal
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
