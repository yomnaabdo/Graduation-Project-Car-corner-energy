const express = require('express');
const router = express.Router();


router.get('/api/device-stats', (req, res) => {
    const data = [
      { name: 'Mobile', data: [120, 130, 150, 170, 180, 190] },
      { name: 'Tablet', data: [60, 70, 80, 90, 100, 110] },
      { name: 'Desktop', data: [200, 210, 230, 250, 260, 270] },
    ];
    res.json(data);
  });

  module.exports = router;  