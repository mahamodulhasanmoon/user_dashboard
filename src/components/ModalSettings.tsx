import React, { useState } from "react";
import dataJSON from '../../public/data.json';



export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const fields=Object.keys(Object.values(dataJSON)[0]).filter((item:any)=>!(item.startsWith("delta_")));
  
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "",
      para: "price",
        criterion: "0",
        value: "",
        type: "0",

    }
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        console.log(key);
        console.log(value);
        if (!value) {
          errorFields.push(key=="id"?"Bond ID":key);
        }
        else{
        if (key=='id'){
          if (!(Object.keys(dataJSON).includes(value)||value=="ALL")){
            errorFields.push("INVALID_ID_"+value)
          }
        }
      }
      }
      console.log(errorFields);
      setErrors(errorFields);
      return false;
    }
  };

  const handleChange = (e) => {
    console.log(formState.criterion);
    console.log(e.target.name);
    console.log(e.target.name=="para"&&e.target.value=='rating');
    console.log(formState.criterion>1&&formState.criterion<4);
    console.log(e.target.value);
    console.log(e.target.name=="para"&&e.target.value=='rating'&&formState.criterion>1&&formState.criterion<4);
    if (e.target.name=="para"&&e.target.value=='rating'&&formState.criterion>1&&formState.criterion<4) {setFormState({ ...formState, ["criterion"]: 0 });}
    
    console.log(formState.criterion);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 "
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
    
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="w-full flex justify-end">
      <strong className="text-xl align-center cursor-pointer "
      onClick={closeModal}
      >&times;</strong>
      </div>

      </div>
      </div>
    </div>
    
  );
};