const express = require("express")
const router = express.Router()

// const {auth} = require("../middlewares/auth")
const { getRecommendation, postRecommendation, patchRecommendation, deleteRecommendation, getRecommendationById } = require("../controllers/recommendationController")

router.route('/').get(getRecommendation).post(postRecommendation);
router.route('/:id').get(getRecommendationById).patch(patchRecommendation).delete(deleteRecommendation);

module.exports = router;