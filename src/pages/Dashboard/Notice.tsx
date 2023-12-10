import { useState } from "react";
import { Link } from "react-router-dom";


export default function Notice() {
  const [isForm,setIsForm] = useState(false)
   const  notifications=[
        {
            title:'Password Is Being Updated',
            description:'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim',
            time:'12 May, 2025 12:00 PM'
        },
        {
            title:'Account Has Been Approved',
            description:'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim',
            time:'12 May, 2025 12:00 PM'
        }
    ]
  return (
    <div>
               <div className="px-4.5 py-3 flex items-center justify-between">
          <h5 className="text-xl font-medium text-bodydark2">Notification</h5>
                  {/* create Button */}
        <div className="flex items-center justify-center">
          <button 
          onClick={() => setIsForm((state) => !state)}
          className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create New Notice</button>
        </div>
        </div>
{
  isForm && (
    <form className="transition-all" >
    <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
          Title
            </label>
            <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text" />
            <label className="mb-3 block text-black dark:text-white">
              Enter Description
            </label>
            <textarea
              rows={6}
              placeholder="Default textarea"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <button className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Update</button>

        </div>
    </form>
  )
}
      

        <ul className="flex h-auto flex-col overflow-y-auto">
            {
                notifications?.map(({title,description,time},index)=>(
                    <li key={index}>
                    <Link
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      to="#"
                    >
                      <p className="text-lg">
                        <span className="text-black dark:text-meta-3 font-bold">
                          {title}
                        </span>{' '}
                    {description}
                      </p>
        
                      <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-meta-5">{time}</p>
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-meta-3">Edit</button>
                        <button className="text-meta-1">Delete</button>
                      </div>
                      </div>
                    </Link>
                  </li>
                ))
            }




        </ul>

    </div>
  )
}
