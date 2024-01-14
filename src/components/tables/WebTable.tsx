import { useContext, useEffect, useState } from "react";
import { linksTypeArr } from "../../data/data";
import { getData } from "../../api/fetching";
import { handleCopyClick } from "../../utils/copyToClipboard";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loader from "../../common/Loader";


const WebTable = () => {
  const {user} = useContext(AuthContext)
  const [selectedValue,setSelectedValue] = useState<String>(linksTypeArr[0].value)
  const [links,setLinks]= useState<[]>([])
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getData(`sites?category=${selectedValue}`);
        setLinks((data as any)?.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, [selectedValue]);


  return (
    <div className="  rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
       Website Urls
      </h4>
      <div className="buttons my-5 flex items-center justify-center gap-2 flex-wrap text-center">


{
  linksTypeArr.map(({label,value}, index) =>(
    <button key={index} className={`inline-flex rounded items-center justify-center  px-2 py-1 text-center font-medium hover:bg-opacity-90 ${value===selectedValue ? 'text-white bg-primary' : 'text-stroke bg-body'}` } value={value}
    onClick={()=>(setSelectedValue(value))}
    >{label}</button>
  ))
}
      </div>
             
      {
         loading && (
          <div>
            <Loader/>
          </div>
         )
      }

      <div className="flex flex-col">
        <div className="grid grid-cols-12 rounded-sm bg-gray-2 dark:bg-meta-4 ">
        <div className="p-2.5 text-center xl:p-5 col-span-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Website
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5 col-span-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>


        </div>

{
  links?.map(({category,_id,siteUrl, subCategory })=>(
<div key={_id} className="grid grid-cols-12 border-b border-stroke dark:border-strokedark ">
<div className="flex items-center justify-center p-2.5 xl:p-5 col-span-2">
            <p className="text-black dark:text-meta-5 font-bold text-lg">{category}/{subCategory}</p>
          </div>
          <div className="flex items-center gap-3 p-2.5 xl:p-5 col-span-8">

            <p className="hidden text-black dark:text-white sm:block">{`${siteUrl}?id=${user?.id}`}
</p>
          </div>



          <div className="flex items-center justify-center p-2.5 xl:p-5 col-span-2">
          <button
onClick={()=> handleCopyClick(`${siteUrl}?id=${user?.id}`)}
      
      className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10"
    >
      Copy
    </button>
          </div>


        </div>
  ))
}
        



      </div>
    </div>
  );
};

export default WebTable;
