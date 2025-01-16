import { z } from 'zod';

export const bookSchema = z.object({
    _type: z.string(),
    author: z.string(),
    id: z.string(),
    publishedDate: z.string(),
    title: z.string(),
});

export const addBookInputSchema = z.object({
    author: z.string(),
    title: z.string(),
    publishedDate: z.string(),
});

export const spBookSchema = z.object({
    id: z.string(),
});

export const updateBookInputSchema = z.object({
    author: z.string().optional(),
    title: z.string().optional(),
    publishedDate: z.string().optional(),
});

export const searchBookSchema = z.object({
    q: z.string(),
});

// startDate and endDate, either one is optional
export const publishedDateSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export const getBooksByAuthorParamsSchema = z.object({
    author: z.string(),
});

export const getBooksByTitleParamsSchema = z.object({
    title: z.string(),
});

export const bookListSchema = z.array(bookSchema);