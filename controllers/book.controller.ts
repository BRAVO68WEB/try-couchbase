import type { Context } from 'hono';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export class BookController {
    public addBook = async (ctx: Context) => {
        try {
            const { title, author, publishedDate } = await ctx.req.json();
            const book = await bookService.addBook(title, author, publishedDate);
            return ctx.json(book, 201);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    };

    public getBooks = async (ctx: Context) => {
        try {
            const books = await bookService.getBooks();
            return ctx.json(books);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    };

    public getBookById = async (ctx: Context) => {
        try {
            const { id } = ctx.req.param();
            const book = await bookService.getBookById(id);
            return ctx.json(book);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    };

    public updateBook = async (ctx: Context) => {
        try {
            const { id } = ctx.req.param();
            const { title, author, publishedDate } = await ctx.req.json();
            const book = await bookService.updateBook(id, { title, author, publishedDate });
            return ctx.json({
                id: book,
            });
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    };

    public deleteBook = async (ctx: Context) => {
        try {
            const { id } = ctx.req.param();
            await bookService.deleteBook(id);
            return ctx.json({ message: 'Book deleted' });
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }

    public getBooksByAuthor = async (ctx: Context) => {
        try {
            const { author } = ctx.req.param();
            const books = await bookService.getBooksByAuthor(author);
            return ctx.json(books);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }

    public getBooksByTitle = async (ctx: Context) => {
        try {
            const { title } = ctx.req.param();
            const books = await bookService.getBooksByTitle(title);
            return ctx.json(books);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }

    public getBooksByPublishedDate = async (ctx: Context) => {
        try {
            const { 
                startDate,
                endDate,
            } = ctx.req.query();

            if (!startDate && !endDate) {
                throw new Error('Please provide atleast one of the dates');
            }

            const books = await bookService.getBooksPublishedBetween({
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            });
            
            return ctx.json(books);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }

    public searchBooks = async (ctx: Context) => {
        try {
            const { q } = ctx.req.query();
            const books = await bookService.searchBooks(q);
            return ctx.json(books);
        } catch (error) {
            if (error instanceof Error) {
                return ctx.json({ error: error.message }, 400);
            }
        }
    }
}