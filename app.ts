import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

import { userRouter } from './routes/user.router';
import { bookRouter } from './routes/book.router';
import { reviewRouter } from './routes/review.router';

export const app = new Hono();

app.all("/health", (ctx) => {
    return ctx.json({ status: "ok" });
});

app.route('/users', userRouter);
app.route('/books', bookRouter);
app.route('/reviews', reviewRouter);

showRoutes(app);