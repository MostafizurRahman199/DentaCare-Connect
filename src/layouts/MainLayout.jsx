import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div>
        <ToastContainer />
        <Navbar />
      
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout