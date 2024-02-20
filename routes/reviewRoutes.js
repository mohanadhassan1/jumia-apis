const express = require("express")
const router = express.Router()

// const {auth} = require("../middlewares/auth")
const { getReview, postReview, patchReview, deleteReview, getReviewById } = require("../controllers/reviewController")

router.route('/').get(getReview).post(postReview);
router.route('/:id').get(getReviewById).patch(patchReview).delete(deleteReview);

module.exports = router;