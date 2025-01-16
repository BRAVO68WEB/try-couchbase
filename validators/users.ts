import type { MiddlewareHandler } from "hono";
import { describeRoute } from 'hono-openapi';
import { resolver } from "hono-openapi/zod";
import { 
    registerUserResponseSchema,
    loginUserResponseSchema,
    fetchedUserResponseSchema,
} from "../schemas/user";

export const addUserValidator = (): MiddlewareHandler => {
	return describeRoute({
        description: "Register User",
        responses: {
            201: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(registerUserResponseSchema)
                    }
                },
            },
            400: {
                description: "Bad Request",
                content: {
                    "application/json": {
                        "error": "document not found"
                    }
                }
            }
        },
    });
};

export const loginUserValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Login User",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(loginUserResponseSchema)
                    }
                },
            },
            400: {
                description: "Bad Request",
                content: {
                    "application/json": {
                        "error": "document not found"
                    }
                }
            }
        }
    });
};

// fetchUserByIdValidator
export const fetchUserByIdValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Fetch User By Id",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(fetchedUserResponseSchema)
                    }
                }
            },
            400: {
                description: "Bad Request",
                content: {
                    "application/json": {
                        "error": "document not found"
                    }
                }
            }
        }
    });
};

// whoamiValidator
export const whoamiValidator = (): MiddlewareHandler => {
    return describeRoute({
        description: "Who am I",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(fetchedUserResponseSchema)
                    }
                }
            },
            400: {
                description: "Bad Request",
                content: {
                    "application/json": {
                        "error": "document not found"
                    }
                }
            } 
        }
    });
};