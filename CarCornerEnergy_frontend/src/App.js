import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/VISITOR/Pages/Home';
import Register from './components/VISITOR/Pages/Register';
import Login from './components/VISITOR/Pages/Login';
import Offers from './components/USER/Pages/Offers';
import MapComponent from './components/USER/MapComponent/MapComponent';
import HomeForUser from './components/USER/Pages/HomeForUser';
import ContactUs from './components/VISITOR/Pages/ContactUs';
import About from './components/VISITOR/Pages/About'
import Profile from './components/USER/Pages/Profile';
//import EnergyConsumptionPrediction from '../src/REG.MODEL/EnergyConsumptionPrediction'
import VisitorInterface from './components/VISITOR/VisitorInterface';
import UserInterface from './components/USER/UserInterface';

import AdminInterface from './components/ADMIN/AdminInterface'
import Review from './components/USER/Pages/Review';
import ForgotPassword from './components/VISITOR/Pages/ForgotPassword';
import Dashbord from './components/ADMIN/Pages/Dashbord';
import ManageUsers from './components/ADMIN/Pages/ManageUsers';
import ManageStations from './components/ADMIN/Pages/ManageStations';
import FAQ from './components/VISITOR/Pages/FAQ';
import ResetPassword from './components/VISITOR/Pages/ResetPassword';
import VerifyResetCode from './components/VISITOR/Pages/VerifyResetCode';
import EiditProfile from './components/USER/Pages/EiditProfile';
import Model from './REG.MODEL/Model';
import AdminProfile from './components/ADMIN/Pages/AdminProfile';
import ManageCoupons from './components/ADMIN/Pages/ManageCoupons';
import AdminMessages from './components/ADMIN/Pages/AdminMessages';


function App() {
  return (
    <div>
      
        <Routes>
          <Route path='/' element={<VisitorInterface/>}>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/verifyResetCode" element={<VerifyResetCode/>} />
            <Route path="/freqentlyaskedquestions" element={<FAQ/>}/>
            <Route path="/about" element={<About/>}/>
          </Route>

          <Route path="/user"  element={<UserInterface/>}>
            <Route index element={<HomeForUser/>}/>
            <Route path="/user/offers" element={<Offers />} />
            <Route path="/user/map" element={<MapComponent />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/EiditProfile" element={<EiditProfile />} />
            <Route path="/user/EnergyConsumptionPrediction" element={<Model />} />
            <Route path="/user/review" element={<Review />} /> 
          </Route>

          <Route path='/Admin' element={<AdminInterface/>}>
            <Route index element={<Dashbord/>}/>
            <Route path="/Admin/ManageUsers" element={<ManageUsers />} />
            <Route path="/Admin/ManageStations" element={<ManageStations />} />
            <Route path="/Admin/ManageCoupons" element={<ManageCoupons/>} />
            <Route path="/Admin/adminprofile" element={<AdminProfile />} />
            <Route path="/Admin/adminMessages" element={<AdminMessages />} />
          </Route>
        </Routes>
    
    </div>
  );
}


export default App;