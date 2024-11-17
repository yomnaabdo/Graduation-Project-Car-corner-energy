import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Profile from './Pages/Profile'
import Offers from './Pages/Offers'
import MapComponent from './MapComponent/MapComponent'
import HomeForUser from './Pages/HomeForUser'
import HeaderForUser from './HeaderForUser'
import Review from './Pages/Review'
import EiditProfile from './Pages/EiditProfile'

export default function UserInterface() {
  return (
    <div>
      <HeaderForUser/>
      <Outlet>
        <Profile/>
        <EiditProfile/>
        <Offers/>
        <HomeForUser/>
        <MapComponent/>
        <Review/>
      </Outlet>
      <Footer/>
    </div>
  )
}
