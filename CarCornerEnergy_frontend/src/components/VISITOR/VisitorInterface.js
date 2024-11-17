import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ContactUs from './Pages/ContactUs'
import ForgotPassword from './Pages/ForgotPassword'
import About from './Pages/About'
import FAQ from './Pages/FAQ'
import ResetPassword from './Pages/ResetPassword'
import VerifyResetCode from './Pages/VerifyResetCode'



export default function Visitor() {
  return (
    <div>
        <Header/>
        <Outlet>
            <Home/>
            <Login/>
            <Register/>
            <ContactUs/>
            <ForgotPassword/>
            <ResetPassword/>
            <VerifyResetCode/>
            <FAQ/>
            <About/>
        </Outlet>
        <Footer/>


    </div>
  )
}
