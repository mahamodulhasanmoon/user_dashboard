import { Suspense, lazy,  useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Overview from './pages/Dashboard/Overview';
// import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import PrivateRoutes from './routes/PrivateRoutes';
import SignUp from './pages/Authentication/SignUp';
import VerifyOTP from './pages/Authentication/VerifyOTP';
import Auth from './pages/Authentication/Auth';
import SignIn from './pages/Authentication/SignIn';
import Blocked from './components/Blocked';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        
        <Route path="/login" element={<Auth />} />
        <Route path="/blocked" element={<Blocked />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/free_trial" element={<SignUp />} />
        <Route path="/reset-password" element={<SignUp />} />
        <Route path="/verify_otp" element={<VerifyOTP />} />

        <Route element={<PrivateRoutes><DefaultLayout /></PrivateRoutes> }>
          <Route index element={<Overview />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    

                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>

     
      </Routes>
    </>
  );
}

export default App;
