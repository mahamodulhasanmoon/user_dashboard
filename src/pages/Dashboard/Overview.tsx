
import { GoGraph } from "react-icons/go";
import OverviewCard from '../../components/OverviewCard.tsx';

const Overview = () => {
const data = [
  {
  title:'Total links',
  icon: GoGraph,
  total:30,
  overviewInPercent:1.30
},
  {
  title:'Today Click',
  icon: GoGraph,
  total:30,
  overviewInPercent:1.308
},
  {
  title:'Total links',
  icon:GoGraph,
  total:30,
  overviewInPercent:-1.30
},
  {
  title:'Total Data',
  icon: GoGraph,
  total:30,
  overviewInPercent:0
}
]
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {
          data.map((item,i) =>  <OverviewCard key={i} item={item} /> )
        }
       
        
      </div>

    </>
  );
};

export default Overview;
