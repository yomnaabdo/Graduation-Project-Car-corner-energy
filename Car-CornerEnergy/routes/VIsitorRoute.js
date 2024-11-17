const express = require('express');
const router = express.Router();

// Mock data for visitors count
let visitorCount = 100; // Example initial visitor count

// Route to get visitor count
router.get('/', (req, res) => { // Adjusted the path to just '/'
  res.json({ data: visitorCount });
});

// Optionally, route to increment visitor count (e.g., each time a page is loaded)
router.post('/', (req, res) => { // Adjusted the path to just '/'
  visitorCount += 1;
  res.json({ data: visitorCount });
});

// vistor chart 
router.get('/api/visitors', (req, res) => {
    const data = [
      { x: 'Jan', y: 1200 },
      { x: 'Feb', y: 1500 },
      { x: 'Mar', y: 1700 },
      { x: 'Apr', y: 1800 },
      { x: 'May', y: 1600 },
      { x: 'Jun', y: 1900 },
      { x: 'Jul', y: 2000 },
      { x: 'Aug', y: 2200 },
      { x: 'Sep', y: 2100 },
      { x: 'Oct', y: 2300 },
      { x: 'Nov', y: 2400 },
      { x: 'Dec', y: 2500 },
    ];
    res.json(data);
  });
  

module.exports = router;




