const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const shipmentSchema = mongoose.Schema({
    // shipment_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     required: true,
    // },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    status: {
        type: String,
        default: "Processing",
        enum: ["Not shippped", "Processing", "Charged", "Recharging"]
    },
    estimated_delivery_date: {
        type: Date,
        required: true,
    }
}, { timestamps: true, collection: "Shipment" })

const ShipmentModel = mongoose.model("Shipment", shipmentSchema);

module.exports = ShipmentModel;