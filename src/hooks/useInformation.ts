import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';
import { getData } from '../api/fetching';
import { GoGraph } from 'react-icons/go';
import { manageCount } from '../utils/manageInfo';
import { useLocation } from 'react-router-dom';
import useSocket from './useSocket';

export default function useInformation(acceptedRoutes?: any) {
  const { pathname } = useLocation();

  const [clickData, setClickData] = useState([
    {
      title: 'Total Hits',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 100,
    },
    {
      title: 'Today Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
    {
      title: 'Yesterday Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
    {
      title: 'Total Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
  ]);
  const {receive,joinRoom} = useSocket()
  const { role, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<[]>([]);
  const [displayInfo,setDisplayInfo] = useState<[]>([]);
  const [isRefresh, setIsRefresh] = useState(0);

  let url: string;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (role === 'admin' || acceptedRoutes?.route === pathname) {
          url = `information`;
        } else {
          url = `information?id=${user?.id}`;
        }
        const data = await getData(url);
        setInfo((data as any)?.data);
        setDisplayInfo((data as any)?.data?.filter((item:any) => "email" in item))
        setLoading(false);
        const { 
            yesterdayDataLength,
            todayDataLength,
            thisMonthDataLength,
            todayIncrementPercentage,
            yesterdayIncrementPercentage,
            totalClick,
            averageLeadData
            
           
             } =
          manageCount((data as any)?.data);
          
      
        setClickData((prevClickData) => [
          {
            ...prevClickData[0],
            total: totalClick,
            overviewInPercent:100
          },
          {
            ...prevClickData[1],
            total: todayDataLength,
            overviewInPercent: todayIncrementPercentage
          },
          {
            ...prevClickData[2],
            total: yesterdayDataLength,
            overviewInPercent:yesterdayIncrementPercentage
          },
          {
            ...prevClickData[3],
            total: thisMonthDataLength,
            overviewInPercent: averageLeadData,
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isRefresh]);

  const userId = user?.id;
  useEffect(() => {
    const eventName =
      acceptedRoutes?.route === pathname ? 'conversion' : 'infoUpdate';
    
    if (!acceptedRoutes?.route) {
     joinRoom(userId);
    }
    receive(eventName, ({ data }: any) => {
      console.log(eventName,data,'data received');
      const objectIndex = info.findIndex(
        (obj) => (obj as any)?._id === data._id,
      );
 
      setInfo((prevInfo: any) => {
        if (objectIndex !== -1) {
          return prevInfo.map((obj: any, index: any) =>
            index === objectIndex ? data : obj,
          );
        } else {
          return [data, ...prevInfo];
        }
      });
      setDisplayInfo((prevInfo: any) => {
        const emailExistsInData = (data as any)?.data?.some((item: any) => "email" in item);
        if (objectIndex !== -1) {
          if (!emailExistsInData) {
            return prevInfo;
          }
          return prevInfo.map((obj: any, index: any) =>
            index === objectIndex ? data : obj,
          );
        } else {
          if (!emailExistsInData) {
            return prevInfo;
          }
          return [data, ...prevInfo];
        }
      });
   

      // Update state with the calculated values
      const { yesterdayDataLength, todayDataLength,totalClick,thisMonthDataLength ,averageLeadData } =
        manageCount(info);
      setClickData((prevClickData) => [
        {
          ...prevClickData[0],
          total: totalClick,
        },
        {
          ...prevClickData[1],
          total: todayDataLength,
        },
        {
          ...prevClickData[2],
          total: yesterdayDataLength,
        },
        {
          ...prevClickData[3],
          total: thisMonthDataLength,
            overviewInPercent: averageLeadData,
        },
      ]);
    });
  }, []);

  return {
    info,
    displayInfo,
    loading,
    setIsRefresh,
    role,
    clickData,
  };
}
