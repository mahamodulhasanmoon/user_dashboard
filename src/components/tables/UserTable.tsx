import { useEffect, useState } from "react";
import { getData } from "../../api/fetching";
import { formatUtcToLocal } from "../../utils/DateFormater";


const UserTable = () => {
    const [users,setUsers]= useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getData(`auth/users`);
            setUsers((data as any)?.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
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
               Created Time
              </th>
              <th scope="col" className="px-6 py-3">
                Validity
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
       
            </tr>
          </thead>
          <tbody className='text-center'>
            {
                users?.map(({_id,name,email,updatedAt},index)=>(
            <tr key={_id} className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-transparent border-t dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               {index + 1}
              </th>
              <td className="px-6 py-4">
               {name}
              </td>
              <td className="px-6 py-4">
               {email}
              </td>

              <td className="px-6 py-4">
              {formatUtcToLocal(updatedAt)}
              </td>
              <td className="px-6 py-4">
              362 days
              </td>
              <td className="px-6 font-bold text-meta-3 py-4">
             Approved
              </td>
      
            </tr>
                ))
            }
      

      
      
      
      
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserTable;
  
 