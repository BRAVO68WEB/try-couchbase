import type { MiddlewareHandler } from "hono";
import { describeRoute } from 'hono-openapi';
import { resolver } from "hono-openapi/zod";
import { reviewIdSchema, reviewListSchema, reviewSchema,  } from "../schemas/review";

export const addReviewValidator = (): MiddlewareHandler => {
	return describeRoute({
        description: "Add Review",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewSchema)
                    }
                }
            }
        }
    });
};

export const getReviewsValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get List of Reviews",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewListSchema)
                    }
                }
            }
        }
    });
};

export const getReviewByIdValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Review by ID",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewSchema)
                    }
                }
            }
        }
    });
};

export const updateReviewValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Update Review",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewIdSchema)
                    }
                }
            }
        }
    });
};

export const deleteReviewValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Delete Review",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        "message": "Review deleted"
                    }
                }
            }
        }
    });
};

export const getReviewsByBookValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Reviews by Book",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewListSchema)
                    }
                }
            }
        }
    });
};

export const getReviewsByUserValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Reviews by User",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(reviewListSchema)
                    }
                }
            }
        }
    });
};