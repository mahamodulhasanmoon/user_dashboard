import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import svgImg from '../../images/svg/login.svg';
import Logo from '../../images/logo/logo.svg';
import { CiLock, CiMail } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext, AuthContextProps } from '../../Contexts/AuthProvider';

interface LoginData{
  email: string;
  password: string;
}
const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const {handleLogin,user}:AuthContextProps = useContext(AuthContext)
  const navivate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    useEffect(()=>{
      if (user) {
        return navivate(from, { replace: true });
       }
   
    },[])

  const onSubmit = async (data:LoginData) => {
    
    const result =  await handleLogin?.(data)
    console.log(result,'res')
    
  };
;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <span className="mt-15 inline-block">
                <img src={svgImg} alt="" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
               Wellcome To User Dashboard
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
          value="Login"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
