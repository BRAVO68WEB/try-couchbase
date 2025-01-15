import { Hono } from "hono";

import { BookController } from "../controllers/book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const bookRouter = new Hono();

const bookController = new BookController();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/i/:id", bookController.getBookById);
bookRouter.get("/search", bookController.searchBooks);
bookRouter.get("/author/:author", bookController.getBooksByAuthor);
bookRouter.get("/title/:title", bookController.getBooksByTitle);
bookRouter.get("/published", bookController.getBooksByPublishedDate);

bookRouter.use("*", authMiddleware('admin'));

bookRouter.post("/", bookController.addBook);
bookRouter.put("/i/:id", bookController.updateBook);
bookRouter.delete("/i/:id", bookController.deleteBook);
