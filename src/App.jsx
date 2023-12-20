import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './pages/loading/Loading';
const Dashboard = React.lazy(() => import('@/layouts/Dashboard'));
const Auth = React.lazy(() => import('@/layouts/Auth'));
import { ToastContainer } from 'react-toastify';
import { SignIn } from './pages/auth';
import Home from './client/pages/Home/Home';

// const loadingMessage = (
//   <div>
//     <Loading />
//   </div>
// );

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken && location.pathname !== '/client-home' && !location.pathname.startsWith('/dashboard')) {
      navigate('/dashboard/kitob-berish');
    }

    if (!storedToken && location.pathname !== '/client-home') {
      navigate('/auth/sign-in')
    }
  }, [navigate]);

  return (
    <>
      {/* <Suspense fallback={loadingMessage}> */}
        <Routes>
          <Route path="/client-home" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
        </Routes>
        <ToastContainer />
      {/* </Suspense> */}
    </>
  );
}

export default App;

