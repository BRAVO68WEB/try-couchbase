import { z } from 'zod';

// {
//     "book_id": "45f2d6bd-f403-4407-98c7-bd8380302f50",
//     "rating": 5,
//     "synopsis": "Dammmmmmm!!",
//     "user_id": "6752d7e6-30a3-4809-88c5-4f8d6fd5fb28",
//     "createdAt": "2025-01-16T06:38:15.811Z",
//     "updatedAt": "2025-01-16T06:38:15.811Z",
//     "id": "356fcac8-4ade-4865-ab5b-63ba24ef2988",
//     "_type": "reviews"
// }

export const reviewSchema = z.object({
    _type: z.string(),
    book_id: z.string(),
    rating: z.number(),
    synopsis: z.string(),
    user_id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
});

export const addReviewInputSchema = z.object({
    book_id: z.string(),
    rating: z.number(),
    synopsis: z.string(),
});

export const updateReviewInputSchema = z.object({
    book_id: z.string().optional(),
    rating: z.number().optional(),
    synopsis: z.string().optional(),
});

export const reviewListSchema = z.array(reviewSchema);

export const getReviewsByBookParamsSchema = z.object({
    book_id: z.string(),
});

export const getReviewsByUserParamsSchema = z.object({
    user_id: z.string(),
});

export const reviewIdSchema = z.object({
    id: z.string(),
});