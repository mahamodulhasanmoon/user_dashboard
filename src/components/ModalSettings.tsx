
export const Modal = () => {







  return (
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 "
      
    >
    
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="w-full flex justify-end">
      <strong className="text-xl align-center cursor-pointer "
    
      >&times;</strong>
      </div>

      </div>
      </div>
    </div>
    
  );
};