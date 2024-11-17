import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import 
{  BsMap, BsPeopleFill, BsGift}
 from 'react-icons/bs'
 import 
 { ResponsiveContainer} 
 from 'recharts';
import FooterAdmin from '../FooterAdmin';
import Chart1 from '../controller/chart-1';
import Chart3 from '../controller/chart-3';
import Chart4 from '../controller/chart-4';
import MyCalendar from '../controller/calendar-1';



const Dashbord = () => {
  const [data, setData] = useState({
    coupons: 0,
    stations: 0,
    users: 0,
    alerts: 0
  });

  // Fetch coupons data
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/v1/coupons");
        const coupons = response.data.data;
        setData(prevData => {
          const newData = { ...prevData, coupons: coupons.length }; // assuming coupons is an array
          localStorage.setItem('dashboardData', JSON.stringify(newData));
          return newData;
        });
        // alert("Coupons data fetched successfully");
      } catch (error) {
        console.error("Error fetching coupons data:", error);
        alert("Failed to fetch coupons data");
      }
    };
    fetchCoupons();
  }, []);

  // Fetch stations data
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get("/api/v1/stations/getAllStations");
        const stations = response.data.data;
        setData(prevData => {
          const newData = { ...prevData, stations: stations.length }; // assuming stations is an array
          localStorage.setItem('dashboardData', JSON.stringify(newData));
          return newData;
        });
        // alert("Stations data fetched successfully");
      } catch (error) {
        console.error("Error fetching stations data:", error);
        alert("Failed to fetch stations data");
      }
    };
    fetchStations();
  }, []);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/users');
        const users = response.data.data;
        setData(prevData => {
          const newData = { ...prevData, users: users.length }; // assuming users is an array
          localStorage.setItem('dashboardData', JSON.stringify(newData));
          return newData;
        });
        // alert('Users data fetched successfully');
      } catch (error) {
        console.error('Error fetching users data:', error);
        alert('Failed to fetch users data');
      }
    };
    fetchUsers();
  }, []);
// Fetch visitors data
useEffect(() => {
  const fetchVisitors = async () => {
    try {
      const response = await axios.get('/api/v1/visitors');
      const visitors = response.data.data;
      setData(prevData => {
        const newData = { ...prevData, visitors };
        localStorage.setItem('dashboardData', JSON.stringify(newData));
        return newData;
      });
     // alert('Visitors data fetched successfully');
    } catch (error) {
      console.error('Error fetching visitors data:', error);
      alert('Failed to fetch visitors data');
    }
  };
  fetchVisitors();
}, []);
  // Fetch data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card-dashbord' style={{ backgroundColor: 'var(--color-dark)', color: '#FFFFFF' }}>
          <div className='card-inner'>
            <h3>COUPONES</h3>
            <BsGift className='card_icon' />
          </div>
          <h1>{data.coupons}</h1>
        </div>
        <div className='card' style={{ backgroundColor: 'var(--color-primary)' }}>
          <div className='card-inner'>
            <h3>STAIONS</h3>
            <BsMap className='card_icon' />
          </div>
          <h1>{data.stations}</h1>
        </div>
        <div className='card' style={{ backgroundColor: 'var(--color-darker)', color: '#FFFFFF' }}>
          <div className='card-inner'>
            <h3>USERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{data.users}</h1>
        </div>
        <div className='card' style={{ backgroundColor: 'var(--color-light)' }}>
          <div className='card-inner'>
            <h3>Visitor</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{data.visitors}</h1>
        </div>
      </div>











        <div className="dashboard-container">
      <div className="card-container">
        <ResponsiveContainer width="100%" height="100%">
          <div className="card widget-card border-light shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
                <div className="mb-3 mb-sm-0">
                  <h5 className="card-title widget-card-title">Visitor Overview</h5>
                </div>
                <div>
                  <select className="form-select text-secondary border-light-subtle">
                    <option value="1">March 2024</option>
                    <option value="2">April 2024</option>
                    <option value="3">May 2024</option>
                    <option value="4">June 2024</option>
                  </select>
                </div>
              </div>
              <div id="bsb-chart-1">
                <Chart1 />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <div className="card-container">
        <ResponsiveContainer width="100%" height="100%">
          <div className="card widget-card border-light shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
                <div className="mb-3 mb-sm-0">
                  <h5 className="card-title widget-card-title">Web Browser</h5>
                </div>
                <div>
                  <select className="form-select text-secondary border-light-subtle">
                    <option value="1">March 2023</option>
                    <option value="2">April 2023</option>
                    <option value="3">May 2023</option>
                    <option value="4">June 2023</option>
                  </select>
                </div>
              </div>
              <div id="bsb-chart-4">
                <Chart4 />
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
         


    <div className="dashboard-container2">
      <div className="responsive-container">
        {/* Chart 3 - Bootstrap Brain Component */}
        <div className="card widget-card border-light shadow-sm h-100">
          <div className="card-body p-4">
            <h5 className="card-title widget-card-title mb-3">Device Stats</h5>
            <div id="bsb-chart-3"><Chart3/></div>
          </div>
        </div>
      </div>

      <div className="responsive-container">
      {/* <!-- Calendar 1 - Bootstrap Brain Component --> */}
            <div class="card widget-card border-light shadow-sm h-100">
              <div class="card-body p-4">
                <div id="bsb-calendar-1" class="fc fc-media-screen fc-direction-ltr fc-theme-bootstrap5 bsb-calendar-theme"><MyCalendar/></div>
              </div>
            </div>
          </div>
    </div>
           
           
            <ResponsiveContainer><FooterAdmin/> </ResponsiveContainer>
        
      
    </main>
  )
}

export default Dashbord