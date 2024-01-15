import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { postData } from "../../api/fetching";
import toast from "react-hot-toast";

interface ISubscription {
    paymentNumber: number;
    trxId: string;
    paymentMethod: string;
}
export default function PaymentModal() {
    const {user}= useContext(AuthContext)
const {showModal,setShowModal} = useContext(AuthContext)
const { handleSubmit, register } = useForm<ISubscription>();



const onSubmit = async (data: ISubscription) => {
  try {
    const originalData = {
        ...data,
        userId: user._id,
    }
    const response = await postData("subscription/request", originalData)
    toast.success((response as any).message)
    setShowModal(false)
  } catch (error) {
    console.log((error as any).message)
  }
}
  return (
    <>

      {showModal ? (
        <>
          <div
            className="justify-center z-999 items-center flex overflow-x-hidden  fixed top-10 inset-0  outline-none focus:outline-none max-h-[90vh] overflow-y-auto pt-39"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl text-black font-semibold">
                    Renuew Your Account
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                  <p className="my-4 text-[#ff0000] text-lg leading-relaxed">
                    আপনার একাউন্ট ১ মাসের জন্য সাবস্ক্রিপশন নিতে 2৫০০ টাকা নিচের  নাম্বারে  টাকা সেন্ডমানি করুন। 
                  </p>
                  <ul>
                    <li>
                        <p className="text-black font-bold mb-2">বিকাশঃ 01326194562  (পার্সোনাল)</p>
                    </li>
                    <li>
                        <p className="text-black font-bold mb-2">নগদঃ 01326194562 (পার্সোনাল)</p>
                    </li>
                  </ul>
                  <p className="my-4 text-success text-lg leading-relaxed">
                    টাকা সফলভাবে সেন্ড করার পর নিচের ফর্মটি পূরণ করুন।
                  </p>
                </div>

                {/* Balance Information Form */}
                <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-5.5 px-6.5 py-2">
              <div>
                <label className="mb-3 block text-[#ff0000] fonr-bold mt-1">
                  যে নাম্বার থেকে টাকা সেন্ড করা হয়েছে
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter " type="text" placeholder="যে নাম্বার থেকে টাকা সেন্ড করা হয়েছে"

                  {...register('paymentNumber')}
                />
                <label className="mb-3 block text-[#ff0000] fonr-bold mt-1">
                  পেমেন্ট মেথড
                </label>
                <select
      className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 outline-none transition text-black font-bold focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
      {...register('paymentMethod')}
    >
              <option disabled selected>
          choose one
        </option>
        <option  value='Bkash'>
          Bkash
        </option>
        <option  value='nagad'>
          Nagad
        </option>

    </select>
                <label  className="mb-3 block text-[#ff0000] font-bold mt-1">
                  TRX ID
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter " type="text" placeholder="ট্রানজেকশন আইডি টি দিন"

{...register('trxId')}
/>
               
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-[#ff0000] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-success text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Request For Premium
                  </button>
                </div>

           

            </div>
          </form>
                {/*footer*/}
              
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}