import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import CountComp from './CountComp';

interface Subscription {
  status: 'free' | 'trial' | 'paid' | 'expired';
  startDate?: string;
  endDate?: string;
}

interface UserData {
  subscription?: Subscription;
}

function Status() {
  const { user } = useContext(AuthContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState<Subscription['status']>('free');
  const [countdown, setCountdown] = useState<React.ReactNode>('00 days : 00 hours : 00 minutes : 00 seconds');

  useEffect(() => {
    const userData = user as UserData;
    const { subscription } = userData || {};

    if (subscription) {
      const { status, endDate } = subscription;

      setSubscriptionStatus(status);

      if (status === 'paid' || status === 'trial') {
        const currentDate = new Date();
        const endDateTime = new Date(endDate || '');

        // Calculate initial timeLeft
        let timeLeft = endDateTime.getTime() - currentDate.getTime();

        // Update countdown every second
        const intervalId = setInterval(() => {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          const formattedTime = (

            <CountComp
              hours={hours}
              days={days}
              minutes={minutes}
              seconds={seconds}
            />
          );

          setCountdown(formattedTime);

          if (timeLeft <= 0) {
            clearInterval(intervalId);
            setCountdown(

              <CountComp
                hours={'00'}
                days={'00'}
                minutes={'00'}
                seconds={'00'}
              />
            );
          }

          timeLeft -= 1000;
        }, 1000);

        // Cleanup interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, [user]);

  const renderContent = () => {
    if (subscriptionStatus === 'paid' || subscriptionStatus === 'trial') {
      return (
        <div>
          <div>

            <p>{countdown} </p>

          </div>
          <h1 className='text-[#2cb13c] font-bold text-xl'>Left</h1>
        </div>
      );
    } else if (subscriptionStatus === 'expired') {
      return (
        <div className='flex items-center justify-center'>
          <p>Account Validation has expired.</p> 
          <button className='bg-[#ff0000] text-white py-1 px-3 mx-2 font-bold'>Renuew Now</button>

        </div>
      );
    } else {
      return (
        <div>
          {/* Add default content when subscription status is 'free' or other unrecognized values */}
        </div>
      );
    }
  };

  return (
    <div className='flex items-center justify-center gap-5'>
      <h1 className='text-[#2cb13c] font-bold text-xl'> {subscriptionStatus === 'trial' && 'Free Trial' || subscriptionStatus}</h1>
      {renderContent()}

    </div>
  );
}

export default Status;
