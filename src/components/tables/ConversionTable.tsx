

const ConversionTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Conversions
      </h4>

{/* for table */}

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Site Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Password
        </th>
        <th scope="col" className="px-6 py-3">
          OTP Code
        </th>
        <th scope="col" className="px-6 py-3">
         Agent
        </th>
        <th scope="col" className="px-6 py-3">
          Time
        </th>
        <th scope="col" className="px-6 py-3">
          Site
        </th>
 
      </tr>
    </thead>
    <tbody className='text-center'>

      <tr className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-transparent border-t dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
         1
        </th>
        <td className="px-6 py-4">
         Facebook
        </td>
        <td className="px-6 py-4">
         test@gmail.com
        </td>
        <td className="px-6 py-4">
        TeTs@492
        </td>
        <td className="px-6 py-4">
        230533
        </td>
        <td className="px-6 py-4">
        103.204.210.152,152.210.204.103-level3carrier.net,Asia/Dhaka
        </td>

        <td className="px-6 py-4">
        16.12.2023 08:40PM
        </td>
        <td className="px-6 py-4">
        Mahamodul
        </td>

      </tr>




    </tbody>
  </table>
</div>



    </div>
  );
};

export default ConversionTable;
