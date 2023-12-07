import { Link } from "react-router-dom";

export default function Notice() {
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
               <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

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
        
                      <p className="text-xs font-bold text-meta-5">{time}</p>
                    </Link>
                  </li>
                ))
            }




        </ul>
    </div>
  )
}
