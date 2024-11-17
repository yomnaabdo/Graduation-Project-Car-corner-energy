const express = require('express');
const router = express.Router();

const {
  
  createcoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../services/couponService');

const authService = require('../services/authServices');
 
//Admin only
//router.use(authService.protect);
//router.use(authService.allowedTo('admin', 'manager'));
router.route('/').post( createcoupon);
router.route('/').get( getCoupons);
router.route('/:name').get( getCoupon);
router.route('/:id').put( updateCoupon).delete(deleteCoupon);

module.exports = router;