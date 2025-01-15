import type { Context } from 'hono';
import { ReviewService } from '../services/review.service';

const reviewService = new ReviewService();

export class ReviewController {
	public addReview = async (ctx: Context) => {
		try {
			const { book_id, rating, synopsis } = await ctx.req.json();

            const user = ctx.get('user');

			const review = await reviewService.addReview(book_id, rating, synopsis, user.id);

			return ctx.json(review, 201);
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public getReviews = async (ctx: Context) => {
		try {
			const reviews = await reviewService.getReviews();
			return ctx.json(reviews);
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public getReviewById = async (ctx: Context) => {
		try {
			const { id } = ctx.req.param();
			const review = await reviewService.getReviewById(id);
			return ctx.json(review);
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public updateReview = async (ctx: Context) => {
		try {
			const { id } = ctx.req.param();
			const { book_id, rating, synopsis, user_id } = await ctx.req.json();
			const review = await reviewService.updateReview(id, { book_id, rating, synopsis, user_id });
			return ctx.json({
				id: review
			});
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public deleteReview = async (ctx: Context) => {
		try {
			const { id } = ctx.req.param();
			await reviewService.deleteReview(id);
			return ctx.json({ message: 'Review deleted' });
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

    public getReviewsByBookId = async (ctx: Context) => {
        try {
            const { book_id } = ctx.req.param();
            const reviews = await reviewService.getReviewsByBook(book_id);
            return ctx.json(reviews);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    };

    public getReviewsByUserId = async (ctx: Context) => {
        try {
            const { user_id } = ctx.req.param();
            const reviews = await reviewService.getReviewsByUser(user_id);
            return ctx.json(reviews);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }
}
