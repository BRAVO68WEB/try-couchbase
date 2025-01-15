import { Review, type IReview } from '../models/review.model';
import { BookService } from './book.service';

const bookService = new BookService();

export class ReviewService {
	public addReview = async (
		book_id: string,
		rating: number,
		synopsis: string,
		user_id: string,
	): Promise<IReview> => {
		// check if book exists
		const existingBook = await bookService.getBookById(book_id);

		if (!existingBook) {
			throw new Error('Book not found');
		}

		const review = await Review.create({
			book_id,
			rating,
			synopsis,
			user_id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return review;
	};

	public getReviews = async (): Promise<IReview[]> => {
		const reviews = await Review.find();
		return reviews.rows;
	};

	public getReviewById = async (id: string): Promise<IReview> => {
		const review = await Review.findById(id);

		if (!review) {
			throw new Error('Review not found');
		}

		return review;
	};

	public updateReview = async (
		id: string,
		reviewData: {
			book_id?: string;
			rating?: number;
			synopsis?: string;
			user_id?: string;
		},
	): Promise<string> => {
		const review = await Review.findById(id);

		if (!review) {
			throw new Error('Review not found');
		}

		await Review.updateMany(
			{
				id,
			},
			{
				...reviewData,
			},
		);

		return review.id;
	};

	public deleteReview = async (id: string): Promise<IReview> => {
		const review = await Review.findById(id);

		if (!review) {
			throw new Error('Review not found');
		}

		await Review.removeById(id);

		return review;
	};

	public getReviewsByBook = async (book_id: string): Promise<IReview[]> => {
		const reviews = await Review.find({
			book_id,
		});

		return reviews.rows;
	};

	public getReviewsByUser = async (user_id: string): Promise<IReview[]> => {
		const reviews = await Review.find({
			user_id,
		});

		return reviews.rows;
	};
}
