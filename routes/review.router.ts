import { Hono } from "hono";
import { validator as vValidator } from 'hono-openapi/zod';

import { ReviewController } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addReviewInputSchema, getReviewsByBookParamsSchema, getReviewsByUserParamsSchema, reviewIdSchema, updateReviewInputSchema } from "../schemas/review";
import { addReviewValidator, getReviewByIdValidator, getReviewsByBookValidator, getReviewsByUserValidator, updateReviewValidator } from "../validators/reviews";

export const reviewRouter = new Hono();

const reviewController = new ReviewController();

reviewRouter.get(
    "/",
    getReviewsByUserValidator(),
    reviewController.getReviews
);
reviewRouter.get(
    "/i/:id",
    getReviewByIdValidator(),
    vValidator("param", reviewIdSchema),
    reviewController.getReviewById
);
reviewRouter.get(
    "/book/:book_id",
    getReviewsByBookValidator(),
    vValidator("param", getReviewsByBookParamsSchema),
    reviewController.getReviewsByBookId
);
reviewRouter.get(
    "/user/:user_id",
    getReviewsByUserValidator(),
    vValidator("param", getReviewsByUserParamsSchema),
    reviewController.getReviewsByUserId
);

reviewRouter.use("*", authMiddleware());

reviewRouter.post(
    "/",
    addReviewValidator(),
    vValidator("json", addReviewInputSchema),
    reviewController.addReview
);
reviewRouter.put(
    "/i/:id",
    updateReviewValidator(),
    vValidator("param", reviewIdSchema),
    vValidator("json", updateReviewInputSchema),
    reviewController.updateReview
);
reviewRouter.delete(
    "/i/:id",
    vValidator("param", reviewIdSchema),
    reviewController.deleteReview
);
