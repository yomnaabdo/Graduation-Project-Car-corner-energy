// cors.js
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // or you can set '*' to allow all origins
  optionsSuccessStatus: 200 // Some browsers expect to see a 200 status code on preflight requests
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
