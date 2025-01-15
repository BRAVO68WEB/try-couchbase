import { Schema } from 'ottoman';
import { ottoman } from '../config/ottoman';

interface IReview {
	id: string;
	book_id: string;
	rating: number;
	synopsis: string;
	user_id: string;
	createdAt: Date;
	updatedAt: Date;
}

const ReviewSchema = new Schema({
	id: String,
	book_id: String,
	rating: Number,
	synopsis: String,
	user_id: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

ReviewSchema.index.findByName = { by: 'book_id' };
ReviewSchema.index.findByName = { by: 'user_id' };

const Review = ottoman.model<IReview>('reviews', ReviewSchema);

export { Review, type IReview };
