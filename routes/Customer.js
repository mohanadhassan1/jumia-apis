const express = require('express');
const router = express.Router(); 

const {getCustomers,AddCustomer,EditCustomer,getByCustomerID,deleteCustomer} = require('../controllers/Customer');

router.get('/',getCustomers);
router.get('/:id',getByCustomerID);
router.delete('/:id',deleteCustomer);
router.post('/',AddCustomer);
router.patch('/:id',EditCustomer);

module.exports =router;