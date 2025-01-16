import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { openAPISpecs } from 'hono-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { poweredBy } from 'hono/powered-by';
import { apiReference } from "@scalar/hono-api-reference";

import { userRouter } from './routes/user.router';
import { bookRouter } from './routes/book.router';
import { reviewRouter } from './routes/review.router';

import { healthcheckValidator } from './validators/healthcheck';

export const app = new Hono();

app.use(cors(
    {
        origin: '*',
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        maxAge: 3600,
    }
));
app.use(logger());
app.use(prettyJSON());
app.use(poweredBy());

app.get("/health", 
    healthcheckValidator(),
    async (ctx) => {
        return ctx.json({ status: "ok" });
    }
);

app.route('/users', userRouter);
app.route('/books', bookRouter);
app.route('/reviews', reviewRouter);

app.get('/favicon.ico', async (ctx) => {
    return ctx.redirect('https://hono.dev/images/logo-small.png');
})

app.get(
    '/openapi',
    openAPISpecs(app, {
      documentation: {
        info: { 
            title: 'Bun X Couchbase X Hono API Demo',
            version: '1.0.0',
            description: 'Review API',
        },
        servers: [
            { 
                url: 'http://localhost:3001',
                description: 'Local Server' 
            }
        ],
        components: {
            securitySchemes: {
              bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            },
          },
        security: [{ bearerAuth: [] }],
      },
    })
);

app.get(
    '/docs',
    apiReference({
      theme: 'saturn',
      spec: { url: '/openapi' },
    })
);

showRoutes(app);