const express = require("express")
const router = express.Router()

// const {auth} = require("../middlewares/auth")
const { getPayment, postPayment, patchPayment, deletePayment, getPaymentById } = require("../controllers/paymentController")

router.route('/').get(getPayment).post(postPayment);
router.route('/:id').get(getPaymentById).patch(patchPayment).delete(deletePayment);

module.exports = router;