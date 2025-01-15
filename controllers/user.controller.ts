import type { Context } from 'hono';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
	public register = async (ctx: Context) => {
		try {
			const { name, email, password } = await ctx.req.json();
			const user = await userService.addUser(name, email, password);
			return ctx.json(user, 201);
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public login = async (ctx: Context) => {
		try {
			const { email, password } = await ctx.req.json();

			const user = await userService.validateUserCreds(email, password);

			const token = await userService.generateToken(user);

			return ctx.json({
				access_token: token,
			});
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

	public me = async (ctx: Context) => {
		try {
			const user = ctx.get('user');
			return ctx.json(user);
		} catch (error) {
			if (error instanceof Error) {
				return ctx.json({ error: error.message }, 400);
			}
		}
	};

  public getUserById = async (ctx: Context) => {
    try {
      const { id } = ctx.req.param();
      const user = await userService.getUserById(id);

      if (user && 'password' in user) {
        const { password, ...userWithoutPassword } = user;
        return ctx.json(userWithoutPassword);
      }
    } catch (error) {
      if (error instanceof Error) {
        return ctx.json({ error: error.message }, 400);
      }
    }
  }}
