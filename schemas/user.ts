import { z } from 'zod';

export const registerUserInputSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const registerUserResponseSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    password: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    _type: z.string(),
});

export const loginUserInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const loginUserResponseSchema = z.object({
    access_token: z.string(),
});

export const fetchedUserResponseSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    _type: z.string(),
});

export const fetchUserByIdParamsSchema = z.object({
    id: z.string(),
});