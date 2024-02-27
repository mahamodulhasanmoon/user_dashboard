import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../api/fetching";
import SubadminView from "./SubadminView";


export default function UserView() {
    const {id} = useParams()

  const [userInfo,setUserInfo]= useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo:any = await getData(`auth/user/${id}`);
        setUserInfo(userInfo.data );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(userInfo);

  return (
    <div>


    <>
    <h2 className='text-center text-3xl font-bold mb-8'>User Overview</h2>

    <div className="my-5">
        <h5>name : {userInfo?.name}</h5>
        <h5>email : {userInfo?.email}</h5>
        <h5>role : {userInfo?.role}</h5><br /><br />
        <h5>CreatedBy : {userInfo?.createdBy?.name}</h5>
        <h5>Admin Email : {userInfo?.createdBy?.email}</h5>
    </div>

    {
  userInfo?.role === 'subadmin' && (
    <SubadminView id={userInfo?._id}/>
  )
}
    </>

    </div>
  )
}
