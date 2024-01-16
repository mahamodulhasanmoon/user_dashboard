

import OverviewCard from '../../components/OverviewCard.tsx';

import ConversionTable from "../../components/tables/ConversionTable.tsx";
import useInformation from "../../hooks/useInformation.ts";


const Overview = () => {

  const {clickData}= useInformation({route:'/overview'})
 

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {
          clickData?.map((item,i) =>  <OverviewCard key={i} item={item} /> )
        }
       
     
        
      </div>

      <div className="my-5">

        <ConversionTable/>
        
      </div>

    </>
  );
};

export default Overview;
