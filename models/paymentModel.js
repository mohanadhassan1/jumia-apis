const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const paymentSchema = mongoose.Schema({
    // payment_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     required: true,
    // },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    },
}, { timestamps: true, collection: "Payment" })

const PaymentModel = mongoose.model("Payment",paymentSchema)

module.exports = PaymentModel;