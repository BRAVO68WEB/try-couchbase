import { Hono } from "hono";
import { validator as vValidator } from 'hono-openapi/zod';

import { BookController } from "../controllers/book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addBookValidator, bookByAuthorValidator, bookByIDValidator, bookByPublishedDateValidator, bookByTitleValidator, bookListValidator, bookSeachValidator, deleteBookValidator, updateBookValidator } from "../validators/books";
import { addBookInputSchema, spBookSchema, getBooksByAuthorParamsSchema, getBooksByTitleParamsSchema, publishedDateSchema, searchBookSchema, updateBookInputSchema } from "../schemas/book";

export const bookRouter = new Hono();

const bookController = new BookController();

bookRouter.get(
    "/",
    bookListValidator(),
    bookController.getBooks
);
bookRouter.get(
    "/i/:id",
    bookByIDValidator(),
    vValidator("param", spBookSchema),
    bookController.getBookById
);
bookRouter.get(
    "/search",
    bookSeachValidator(),
    vValidator("query", searchBookSchema),
    bookController.searchBooks
);
bookRouter.get(
    "/author/:author",
    bookByAuthorValidator(),
    vValidator("param", getBooksByAuthorParamsSchema),
    bookController.getBooksByAuthor
);
bookRouter.get(
    "/title/:title",
    bookByTitleValidator(),
    vValidator("param", getBooksByTitleParamsSchema),
    bookController.getBooksByTitle
);
bookRouter.get(
    "/published",
    bookByPublishedDateValidator(),
    vValidator("query", publishedDateSchema),
    bookController.getBooksByPublishedDate
);

bookRouter.use("*", authMiddleware('admin'));

bookRouter.post("/",
    addBookValidator(),
    vValidator("json", addBookInputSchema),
    bookController.addBook
);
bookRouter.put("/i/:id",
    updateBookValidator(),
    vValidator("param", spBookSchema),
    vValidator("json", updateBookInputSchema),
    bookController.updateBook
);
bookRouter.delete("/i/:id",
    deleteBookValidator(),
    vValidator("param", spBookSchema),
    bookController.deleteBook
);
