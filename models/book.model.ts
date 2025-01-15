import { Schema } from 'ottoman';
import { ottoman } from '../config/ottoman';

interface IBook {
	id: string;
	title: string;
	author: string;
	publishedDate: Date;
}

const BookSchema = new Schema({
	id: String,
	title: String,
	author: String,
	publishedDate: Date,
});

BookSchema.index.findByName = { by: 'title' };
BookSchema.index.findByName = { by: 'author' };

const Book = ottoman.model<IBook>('books', BookSchema);

export { Book, type IBook };
