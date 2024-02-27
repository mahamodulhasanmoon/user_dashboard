import { useEffect, useState } from "react";
import { deleteData, getData } from "../../api/fetching";
import { formatUtcToLocal } from "../../utils/DateFormater";
import { getStatusColor } from "../../utils/statusColor";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import moment from "moment";
const filterArr = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Sub Admins',
    value: 'subadmin'
  },
  {
    label: 'users',
    value: 'user'
  }

]


const UserTable = () => {
  const [selectedValue, setSelectedValue] = useState<String>(filterArr[0].value)
  const [users, setUsers] = useState([])
  const [refresh,setRefresh]= useState<any>(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`auth/users?role=${selectedValue}`);
        setUsers((data as any)?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue,refresh,setRefresh]);
  const deleteUserHandler = async (id:string,email:any) => {
    const deletedMail = prompt('Are you sure you want to delete this user? Enter Email to confirm:');
    if (deletedMail===email ) {
      toast.promise(
         deleteData(`auth/user/${id}`),
     
   
        {
          loading: 'Deleteing...',
          success: <b>Successfully User Deleted</b>,
          error: <b>Plase Try Again</b>,
        }
      ).then(()=>  setRefresh(Math.random()))
     
     
     
    } else {
      toast.error("please enter email which user you Want to delete")
    }
  };
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
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Created Time
            </th>
         <th scope="col" className="px-6 py-3">
              Action
            </th> 
            {/* <th scope="col" className="px-6 py-3">
              Status
            </th> */}

          </tr>
        </thead>
        <tbody className='text-center'>
          {
            users?.map(({ _id, name, email,role, updatedAt}, index) => (
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
                  {role}
                </td>

                <td className="px-6 py-4">
                  {moment(formatUtcToLocal(updatedAt)).fromNow()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-5">
                  <Link to={`/users/view/${_id}`} className="bg-primary  btn" >view</Link>
                  <button onClick={()=>deleteUserHandler(_id,email)} className="bg-danger  btn">Delete</button>
                  </div>
                </td>
                
                <td className={`px-6 font-bold py-4 ${getStatusColor(status)}`}>
               
                {/* {status === 'expired' ?
                <button className="bg-primary text-white px-3 py-1">Delete  User</button>
                : status} */}
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

