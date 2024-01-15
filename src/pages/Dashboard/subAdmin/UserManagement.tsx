
import UserTable from "../../../components/tables/UserTable";

import toast from "react-hot-toast";
import { postData } from "../../../api/fetching";
import { useForm } from "react-hook-form";
import { useState } from "react";


export default function UserManagement() {


    const [userForm, setUserForm] = useState<boolean>(false)
    const { handleSubmit, register } = useForm<any>();
    const onSubmit = async (data:any) => {
        try {
          const response = await postData("auth/signup", data)
          toast.success((response as any).message)
          setUserForm(false)
        } catch (error) {
          console.log((error as any).message)
        }
    
    
      };
    return (
        <div>
            <div className="rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="px-4.5 py-3 flex items-center justify-between">
            

                    <h5 className="text-xl font-medium text-bodydark2">User Informations</h5>

             

                    
                    {/* create Button */}
                    <div className="flex items-center justify-center">

                        <button
                            onClick={() => setUserForm((state) => !state)}
                            className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">{userForm ? 'Cancel' : 'Create New User'}</button>


                    </div>
                    {/* handle Create User Form */}

                </div>
                <div>

                </div>

      {
        !userForm && (
            <UserTable />
        ) 
      }
               
            </div>
            {
        userForm &&  (
          <form className="text-center flex items-center justify-center" onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full max-w-[600px] flex text-center flex-col gap-5.5 p-6.5">
             <div>
             <div className="text-start">
                <label className="mt-3 block text-black dark:text-white">
                  Name
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
                placeholder="Ex:( Jhon Doe)"

                  {...register('name')}
                />
                {/* email */}
                <label className="mt-3 block text-black dark:text-white">
                  Email Adress
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="email"
                placeholder="Ex: (example@gmail.com)"

                  {...register('email')}
                />
                {/* gender */}
                <label className="mt-3 block text-black dark:text-white">
                  Gender
                </label>
                <select
  className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
  {...register('gender')}
>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

{/* password */}
<label className="mt-3 block text-black dark:text-white">
                 Password
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="password"
                placeholder="password"

                  {...register('password')}
                />


<button className="inline-flex rounded items-center my-5 w-full justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create New User</button>
              </div>

             </div>

            </div>
          </form>
        )
      }
        </div>
    )
}
