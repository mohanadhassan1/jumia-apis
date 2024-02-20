const express = require("express")
const router = express.Router()

// const {auth} = require("../middlewares/auth")
const { getShipment, postShipment, patchShipment, deleteShipment, getShipmentById } = require("../controllers/shipmentController")

router.route('/').get(getShipment).post(postShipment);
router.route('/:id').get(getShipmentById).patch(patchShipment).delete(deleteShipment);

module.exports = router;