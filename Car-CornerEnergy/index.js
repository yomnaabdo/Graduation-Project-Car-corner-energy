const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbConnection = require('./config/database');
const paymentRoute = require('./routes/paymentRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const locationRoute = require('./routes/locationRoute');
const stationRoute2 = require('./routes/stationRoute2');
const couponRoute = require('./routes/couponsRoute');
const reviewRoute = require('./routes/reviewRoute');
const contactRoute = require('./routes/contactRoute');
const userProfile = require('./routes/userProfile');
const visitorRoutes = require('./routes/VIsitorRoute'); 
const DeviceStatRoute = require('./routes/DeviceStatRoute');
const DountChartRoute = require('./routes/DountChartRoute');


const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const bodyParser = require('body-parser');

dotenv.config({ path: 'config.env' });
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create session
app.use(session({
  secret: 'yOur to-do-app sessions',
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true
}));

// Enable CORS only for specific routes
const corsOptions = {
  origin: 'http://localhost:3000', // or you can set '*' to allow all origins
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode:${process.env.NODE_ENV}`);
}

// Define your routes and other middleware
app.use('/api/v1/users', cors(corsOptions), userRoute);
app.use('/api/v1/locations', locationRoute);
app.use('/api/v1/stations', stationRoute2);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/coupons', couponRoute);
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/reviews', reviewRoute);

app.use('/api/v1/contact', contactRoute); 
app.use('/api/v1/profile', cors(corsOptions), userProfile);
app.use('/api/v1/visitors', visitorRoutes);

const modelUrl = 'http://127.0.0.1:5000/predict';

app.post('/predict', async (req, res) => {
  console.log('Received POST request at /predict');
  try {
    const inputData = req.body;
    console.log('Input data:', inputData);

    const response = await axios.post(modelUrl, inputData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from model:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error processing request');
  }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
};

app.use(errorHandler);
app.use(visitorRoutes);
app.use(DeviceStatRoute);
app.use(DountChartRoute);


// Catch-all for unhandled requests
app.use((req, res, next) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Not Found');
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});