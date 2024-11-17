// routes/contactRoute.js

const express = require('express');
const router = express.Router();
const contact = require ("../services/contactServer");



// POST route for sending a message
 router.post('/contact', contact.sendEmail);

module.exports = router;