const express = require('express');
const router = express.Router(); 

const {getOrders,AddOrder,EditOrder,getByOrderID,deleteOrder} = require('../controllers/Order');

router.get('/',getOrders);
router.get('/:id',getByOrderID);
router.delete('/:id',deleteOrder);
router.post('/',AddOrder);
router.patch('/:id',EditOrder);

module.exports =router;