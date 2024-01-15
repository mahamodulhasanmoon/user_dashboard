import { useEffect, useState } from "react";
import { getData } from "../../api/fetching";
import toast from "react-hot-toast";


const PendingReq = () => {
    const [users,setUsers]= useState([])

    const fetchData = async () => {
        try {
          const data = await getData(`subscription/request`);
          setUsers((data as any)?.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

      const handleApproved = async ({id,userId}:any) => {
        const data = await getData(`subscription/approve?id=${id}&user=${userId}`)
        toast.success((data as any)?.message)
        fetchData()

      }

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
               Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                TRX ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
       
            </tr>
          </thead>
          <tbody className='text-center'>
            {
                users?.map(({_id,paymentMethod,paymentNumber,status,trxId,userId:{email,name , _id:userId}},index)=>(
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
              {paymentMethod}
              </td>
              <td className="px-6 py-4">
              {paymentNumber}
              </td>
              <td className="px-6 py-4">
              {trxId}
              </td>
              <td >
                {
                    status === 'pending' ? 
                    <button 
                    onClick={() => handleApproved({ id: _id, userId })}
                    className="bg-success text-white px-3 py-1">Approve</button>
                    : 
                    <span className="text-success"> Approved</span>
                }
            
              </td>
            </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PendingReq;
  
 