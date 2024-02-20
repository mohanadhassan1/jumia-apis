const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const recommendationSchema = mongoose.Schema({
    // recommendation_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    //     required: true,
    // },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    recommended_products: {
        type: Array,

    }
},{timestamps:true, collection:"Recommendations"})

const RecommendationModel = mongoose.model("Recommendations", recommendationSchema)

module.exports = RecommendationModel;