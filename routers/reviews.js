// routers/reviews.js

import express from 'express'

import { getAllReviews, createReview, getReview, updateReview, deleteReview,getAllReviewsRecipe, createReviewRecipe } from '../controllers/reviews.js';

const router = express.Router();

router.route('/')
    .get(getAllReviews)
    .post(createReview);
router.route('/recipe')
    .get(getAllReviewsRecipe)
    .post(createReviewRecipe);
router.route('/:id')
    .get(getReview)
    .patch(updateReview)
    .delete(deleteReview);

// Add more review routes and corresponding controller functions
export default router;