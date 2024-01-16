import { useContext, useEffect, useState } from 'react';
import { socketUrl } from '../constant/environment';
import { io } from 'socket.io-client';
import { AuthContext } from '../Contexts/AuthProvider';
import { getData } from '../api/fetching';
import { GoGraph } from 'react-icons/go';
import { manageCount } from '../utils/manageInfo';
import { useLocation } from 'react-router-dom';

export default function useInformation(acceptedRoutes?: any) {
  const { pathname } = useLocation();

  const [clickData, setClickData] = useState([
    {
      title: 'Total Hits',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 1.3,
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
  const socket = io(socketUrl);
  const { role, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<[]>([]);
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
        setLoading(false);
        const { 
            yesterdayDataLength,
            todayDataLength,
            thisMonthDataLength,
            totalIncrementPercentage,
            todayIncrementPercentage,
            yesterdayIncrementPercentage
             } =
          manageCount((data as any)?.data);
        setClickData((prevClickData) => [
          {
            ...prevClickData[0],
            total: 0,
            overviewInPercent:0
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
            overviewInPercent: totalIncrementPercentage,
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
      socket.emit('joinRoom', userId);
    }
    socket.on(eventName, ({ data }: any) => {
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

      // Update state with the calculated values
      const { yesterdayDataLength, todayDataLength, thisMonthDataLength } =
        manageCount(info);
      setClickData((prevClickData) => [
        {
          ...prevClickData[0],
          total: 0,
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
        },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return {
    info,
    loading,
    setIsRefresh,
    role,
    clickData,
  };
}
