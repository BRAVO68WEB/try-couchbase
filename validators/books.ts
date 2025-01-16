import type { MiddlewareHandler } from "hono";
import { describeRoute } from 'hono-openapi';
import { resolver } from "hono-openapi/zod";

import { bookSchema, bookListSchema, addBookInputSchema, spBookSchema } from "../schemas/book";

export const bookByIDValidator = (): MiddlewareHandler => {
	return describeRoute({
        description: "Get Book by ID",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookSchema)
                    }
                }
            }
        }
    });
};

export const bookListValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get List of Books",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookListSchema)
                    }
                }
            }
        }
    });
};

export const addBookValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Add Book",
        responses: {
            201: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(addBookInputSchema)
                    }
                }
            }
        }
    });
};

export const updateBookValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Update Book",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(spBookSchema)
                    }
                }
            }
        }
    });
}

export const deleteBookValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Delete Book",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(spBookSchema)
                    }
                }
            }
        }
    });
}

export const bookSeachValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Search Books",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookListSchema)
                    }
                }
            }
        }
    });
}

export const bookByAuthorValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Books by Author",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookListSchema)
                    }
                }
            }
        }
    });
}

export const bookByTitleValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Books by Title",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookListSchema)
                    }
                }
            }
        }
    });
}

export const bookByPublishedDateValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Get Books by Published Date",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(bookListSchema)
                    }
                }
            }
        }
    });
}