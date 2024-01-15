import { useEffect, useState } from "react";
import { getData } from "../../api/fetching";
import { formatUtcToLocal } from "../../utils/DateFormater";
import { getStatusColor } from "../../utils/statusColor";
const filterArr = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'paid',
    value: 'paid'
  },
  {
    label: 'free',
    value: 'free'
  },
  {
    label: 'trial',
    value: 'trial'
  },
  {
    label: 'expired',
    value: 'expired'
  }
]


const UserTable = () => {
  const [selectedValue, setSelectedValue] = useState<String>(filterArr[0].value)
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`auth/users?status=${selectedValue}`);
        setUsers((data as any)?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="buttons my-5 flex items-center justify-center gap-2 flex-wrap text-center">
    

        {
          filterArr.map(({ label, value }, index) => (
            <button key={index} className={`inline-flex rounded items-center justify-center  px-2 py-1 text-center font-medium hover:bg-opacity-90 ${value === selectedValue ? 'text-white bg-primary' : 'text-stroke bg-body'}`} value={value}
              onClick={() => (setSelectedValue(value))}
            >{label}</button>
          ))
        }


      </div>
      <div>
      <h2 className="font-bold text-xl text-center my-10 capitalize text-bodydark1 mr-10">total {selectedValue} Users: {users?.length}</h2>
      </div>
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
            users?.map(({ _id, name, email, updatedAt ,subscription:{status}}, index) => (
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
                
                <td className={`px-6 font-bold py-4 ${getStatusColor(status)}`}>
               
                {status === 'expired' ?
                <button className="bg-primary text-white px-3 py-1">Delete  User</button>
                : status}
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

