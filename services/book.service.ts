import type { LogicalWhereExpr, FindOptions } from 'ottoman';
import { Book, type IBook } from '../models/book.model';

export class BookService {
	public addBook = async (title: string, author: string, publishedDate: Date): Promise<IBook> => {
		const book = await Book.create({
			title,
			author,
			publishedDate,
		});

		return book;
	};

	public getBooks = async (): Promise<IBook[]> => {
		const books = await Book.find();
		return books.rows;
	};

	public getBookById = async (id: string): Promise<IBook> => {
		const book = await Book.findById(id);

		if (!book) {
			throw new Error('Book not found');
		}

		return book;
	};

	public updateBook = async (
		id: string,
		bookData: {
			title?: string;
			author?: string;
			publishedDate?: Date;
		},
	): Promise<string> => {
		const book = await Book.findById(id);

		if (!book) {
			throw new Error('Book not found');
		}

		await Book.updateMany(
			{
				id,
			},
			{
				...bookData,
			},
		);

		return book.id;
	};

	public deleteBook = async (id: string): Promise<string> => {
		const book = await Book.findById(id);

		if (!book) {
			throw new Error('Book not found');
		}

		await Book.removeById(id);

		return id;
	};

	public searchBooks = async (searchTerm: string): Promise<IBook[]> => {
		const whereExp : LogicalWhereExpr = {
			$or: [
				{
					title: {
						$like: `%${searchTerm}%`,
					},
				},
				{
					author: {
						$like: `%${searchTerm}%`,
					},
				},
			],
		}

		const filter : FindOptions = {
			ignoreCase: true
		}

		const books = await Book.find(whereExp, filter);

		return books.rows;
	};

	public getBooksByAuthor = async (author: string): Promise<IBook[]> => {
		const filter : FindOptions = {
			ignoreCase: true
		}

		const books = await Book.find({
			author,
		}, filter);

		return books.rows;
	};

	public getBooksByTitle = async (title: string): Promise<IBook[]> => {
		const filter : FindOptions = {
			ignoreCase: true
		}

		const books = await Book.find({
			title,
		}, filter);

		return books.rows;
	};

	public getBooksPublishedBetween = async ({
		startDate,
		endDate,
	}: {
		startDate?: Date;
		endDate?: Date;
	}): Promise<IBook[]> => {
		const whereExp : LogicalWhereExpr = {
			publishedDate: {
				$gte: startDate,
				$lte: endDate,
			},
		}

		if(!startDate) {
			delete whereExp.publishedDate.$gte;
		}

		else if(!endDate) {
			delete whereExp.publishedDate.$lte;
		}

		const books = await Book.find(whereExp);

		return books.rows;
	};
}
