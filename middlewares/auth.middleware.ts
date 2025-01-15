import { verify } from 'hono/jwt';
import type { Context, Next, MiddlewareHandler } from 'hono';

import { UserService } from '../services/user.service';
import type { IUserRole } from '../models/user.model';
import { config } from '../config/env';

const userService = new UserService();

export const authMiddleware = (
    role?: IUserRole,
): MiddlewareHandler => {
	return async (ctx: Context, next: Next) => {
		const token = ctx.req.header('Authorization');

		if (!token) {
			return ctx.json({ error: 'No token provided' }, 401);
		}

		try {
			const payload = await verify(token.replace('Bearer ', ''), config.JWT_SECRET, 'HS512');
			ctx.set('jwtPayload', payload);

            const user = await userService.getUserById(String(payload['sub']))
			ctx.set('user', user);

            if(role && user.role !== role) {
                return ctx.json({ error: 'Unauthorized' }, 401);
            }

			return next();
		} catch (error) {
			return ctx.json({ error: 'Invalid token' }, 401);
		}
	};
};
