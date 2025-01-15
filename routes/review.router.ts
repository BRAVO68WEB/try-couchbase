import { Hono } from "hono";

import { ReviewController } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const reviewRouter = new Hono();

const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getReviews);
reviewRouter.get("/i/:id", reviewController.getReviewById);
reviewRouter.get("/book/:book_id", reviewController.getReviewsByBookId);
reviewRouter.get("/user/:user_id", reviewController.getReviewsByUserId);

reviewRouter.use("*", authMiddleware());

reviewRouter.post("/", reviewController.addReview);
reviewRouter.put("/i/:id", reviewController.updateReview);
reviewRouter.delete("/i/:id", reviewController.deleteReview);
