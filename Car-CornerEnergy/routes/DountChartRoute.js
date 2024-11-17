
const express = require('express');
const router = express.Router();

router.get('/api/donut-chart', (req, res) => {
  const data = {
    series: [21, 23, 19, 14, 6],
    labels: ['Microsoft Edge', 'Google Chrome', 'Fire Fox', 'Safari', 'Opera'],
  };
  res.json(data);
});

module.exports = router;