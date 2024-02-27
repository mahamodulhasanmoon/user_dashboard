import { useEffect, useState } from "react";
import BalanceCard from "../../components/BalanceCard";
import { getData } from "../../api/fetching";

export default function SubadminView({id}:any) {
    const [balance,setBalance]= useState<any>(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
        
            const data:any = await getData(`balance?createdBy=${id}`);
            setBalance(data );
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
        <h2 className='text-center text-3xl font-bold mb-8'>Activity In {balance?.monthName} Month</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <BalanceCard
      title='total Users'
      amount={(balance as any)?.totalUser}
      /> 
      <BalanceCard 
              title='total Sells'
              amount={(balance as any)?.totalSell}
      /> 
      <BalanceCard
        title='Admin Charge'
        amount={(balance as any)?.adminAmount}
      /> 
     

    </div>
    </div>
  )
}
