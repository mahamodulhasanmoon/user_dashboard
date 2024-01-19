import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiLock, CiMail } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { AuthContext, AuthContextProps } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';

interface LoginData{
  email: string;
  password: string;
}
const SignIn = () => {
  const [loading,setLoading]= useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const {handleLogin,user}:AuthContextProps = useContext(AuthContext)
  const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    useEffect(()=>{
      if (user) {
        return navigate(from, { replace: true });
       }
   
    },[])

  const onSubmit = async (data:LoginData) => {
    try {
      setLoading(true)
        await handleLogin?.(data)
        setLoading(false)
      return navigate(from, { replace: true });
    } catch (error:any) {
      setLoading(false)
      toast.error(error.response.data.error || error.response.data.message);
    }

    
  };
;

  return (
    <>
      <div className="rounded-sm  min-h-[101vh] m-0 p-0  text-white shadow-default bg-black">
        <div className="flex flex-wrap items-center justify-center">


          <div className="w-full flex items-center  xl:w-1/2 ">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9  text-center text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
               Wellcome To Update Links
              </h2>
              <span className="mb-5 block font-medium text-center">Login System For Premium Account</span>

              <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute right-4 top-4">
            <CiMail/>
          </span>
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="6+ Characters, 1 Capital letter"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute right-4 top-4">
            <CiLock/>
          </span>
        </div>
        {(errors as any).password && <p className="text-red-500">{(errors as any)?.password.message}</p>}
      </div>

      <div className="mb-5">
        <input
          type="submit"
          value={loading ? 'Loading...' : 'Login'}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
    <div>
      <p className='text-center'>Not Have any Account?
      </p>
<div className='flex w-full mt-5'>
<Link to='/free_trial' className='w-full text-center cursor-pointer rounded-lg border border-[#2CB13C] bg-[#2CB13C] p-4 text-white transition hover:bg-opacity-90'>7 Days Free Trial</Link>
</div>
<p className='text-center  mt-5'>Forget Password? <Link className='text-primary' to='/reset-password'>Reset Password</Link>
      </p>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
