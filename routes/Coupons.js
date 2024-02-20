const express = require('express');
const router = express.Router(); 

const {getCoupons,AddCoupon,EditCoupon,getByCouponID,deleteCoupon} = require('../controllers/Coupons');

router.get('/',getCoupons);
router.get('/:id',getByCouponID);
router.delete('/:id',deleteCoupon);
router.post('/',AddCoupon);
router.patch('/:id',EditCoupon);

module.exports =router;