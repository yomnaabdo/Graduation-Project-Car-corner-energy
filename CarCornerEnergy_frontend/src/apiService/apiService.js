
// import axios from 'axios';
// import apiUrl from '../apiConflig/apiConflig'; 
// // const cors=require("cors")
// // apiService.post(cors())

// const apiService = axios.create({
//   baseURL: apiUrl,
// });

// // login
// export const login = async ( email, password) => {
//     const credentials = {
      
//       email: email,
//       password: password
//     };
  
//     try {
//       const response = await apiService.post('/login', credentials);
//       return response.data;
//     } catch (error) {
//       console.error('Error logging in:', error);
//       throw error;
//     }
//   };
  

// // register
// export const register = async (userData) => {

  
  
//   try {
//     //axios.get('http://localhost:8000/api/v1/auth/signup');
//     const response = await apiService.post('/register', userData);
//     if (response.data.success) {
//       return response.data;
//     } else {
//       throw new Error(response.data.error);
//     } 
//   } catch (error) {
//     console.error('Error registering:', error);
//     throw error;
//   }
//   // const credentials = {
//   //   firstName: firstName,
//   //   lastName: lastName,  
//   //   email: email,
//   //   phone: phone,
//   //   carType :carType,
//   //   password: password
//   // };
//   // try {
//   //   const response = await apiService.post('/register', credentials);
//   //   return response.data;
//   // } catch (error) {
//   //   console.error('Error registering:', error);
//   //   throw error;
//   // }
// };

// // map
// export const fetchMapData = async () => {
//   try {
//     const response = await apiService.get('/map');
//     return response.data;
// } catch (error) {
//     console.error('Error fetching map data:', error);
//     throw error;
//   }
// };

// // offers
// export const fetchOffers = async (promoCode) => {
//   try {
//     const response = await apiService.get(`/offers?promoCode=${promoCode}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching offers:', error);
//     throw error;
//   }
// };

// // contact
// export const sendContactMessage = async (messageData) => {
//   try {
//     const response = await apiService.post('/contact', messageData);
//     return response.data;
//   } catch (error) {
//     console.error('Error sending contact message:', error);
//     throw error;
//   }
// };

// // profile
// export const fetchProfileData = async () => {
//   try {
//     const response = await apiService.get('/profile');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching profile data:', error);
//     throw error;
//   }
// };
