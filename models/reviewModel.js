const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const reviewSchema = mongoose.Schema({
    // review_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     required: true,
    // },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        optional: true,
    },
    comment: {
        type:String,
        required: true,
        minLength: 5,
        maxLength: 200,
        optional:true,
    },
    date: {
        type: Date,
        optional:true,
    }
},{ timestamps:true,collection:"Reviews"})

const ReviewModel = mongoose.model("Reviews", reviewSchema);

module.exports = ReviewModel;