import {  useState } from "react";

// import CountComp from "../components/Status/CountComp";



export default function NoticeModal() {
  // const [countdown, setCountdown] = useState<React.ReactNode>('00 days : 00 hours : 00 minutes : 00 seconds');

  const [showModal, setShowModal] = useState(true)

  // useEffect(() => {


  //   // check my plan lists and permissions


  //   const currentDate = new Date();
  //   const endDateTime = new Date('2024-07-01T01:00:10.155+00:00');

  //   // Calculate initial timeLeft
  //   let timeLeft = endDateTime.getTime() - currentDate.getTime();

  //   // Update countdown every second
  //   const intervalId = setInterval(() => {
  //     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  //     const formattedTime = (

  //       <CountComp
  //         hours={hours}
  //         days={days}
  //         minutes={minutes}
  //         seconds={seconds}
  //       />
  //     );

  //     setCountdown(formattedTime);

  //     if (timeLeft <= 0) {
  //       clearInterval(intervalId);
  //       setCountdown(

  //         <CountComp
  //           hours={'00'}
  //           days={'00'}
  //           minutes={'00'}
  //           seconds={'00'}
  //         />
  //       );
  //     }

  //     timeLeft -= 1000;
  //   }, 1000);

  //   // Cleanup interval on component unmount
  //   return () => {
  //     clearInterval(intervalId);
  //   };

  // }

  //   , []);


  return (
    <>

      {showModal ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999">
            <div className="bg-form-strokedark rounded shadow-lg p-6 w-1/2  backdrop-blur-md">
              <h2 className="text-center text-2xl font-bold text-danger mb-5">লগিন সম্পর্কিত  নোটিস</h2>
              <hr />

              <p className="text-gray-3 text-xl my-5"> ওয়েবসাইটের ডোমেইন পরিবর্তন হয়েছে। দয়া করে ভিজিট করুন আমাদের নতুন ডোমেইনে <br/> 
              <a href="https://datalink.click">https://datalink.click</a> 
                </p> <br />

              <div className="text-center mx-auto">
                <div className="mx-auto">
                  {/* {countdown} */}
                </div>
                <button className="btn btn-sm ms-3 bg-meta-1 text-white" onClick={() => setShowModal(false)}  >Closed</button>
              </div>

            </div>

          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </>
      ) : null}
    </>
  );
}
