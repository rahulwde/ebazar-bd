import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import WhatsAppButton from './pages/WhatsAppButton';
import ScrollToTop from './ScrollToTop';
import Loader from './pages/Loader';

const MainLayout = () => {
    const [loading , setLoading]= useState(true)

    useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return()=> clearTimeout(timer)
  },[])
  if(loading){
    return <Loader></Loader>
  }
  return (
    <div >
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="min-h-screen">
        <Outlet />
      </main>
 <WhatsAppButton />
      <ScrollToTop />
      {/* Footer fixed at bottom */}
      <div className="w-full ">
        <Footer />
      </div>

      {/* WhatsApp button and ScrollToTop */}
     
    </div>
  );
};

export default MainLayout;
