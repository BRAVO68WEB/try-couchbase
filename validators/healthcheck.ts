import type { MiddlewareHandler } from "hono";
import { describeRoute } from 'hono-openapi';
import { resolver } from "hono-openapi/zod";
import { healthcheckSchema } from "../schemas/healthcheck";

export const healthcheckValidator = (): MiddlewareHandler => {
	return describeRoute({
        description: "Health check",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resolver(healthcheckSchema)
                    }
                }
            }
        }
    });
};