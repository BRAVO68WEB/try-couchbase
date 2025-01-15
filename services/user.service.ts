import { sign } from 'hono/jwt';
import * as crypto from 'node:crypto';

import { User, type IUser } from '../models/user.model';
import { config } from '../config/env';

export class UserService {
	public addUser = async (name: string, email: string, password: string) => {
		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const existingUser = await User.findOne({
            email,
        });

        if(existingUser) {
            throw new Error('User already exists');
        }

		const user = await User.create({
			name,
			email,
            role: "user",
			password: hashedPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return user;
	};

	public validateUserCreds = async (email: string, password: string) => {
		const user = await User.findOne({
			email,
		});

		if (!user) {
			throw new Error('User not found');
		}

		const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

		if (user.password !== hashedPassword) {
			throw new Error('Invalid password');
		}

		return user;
	};

	public generateToken = async (user: IUser) => {
		const token = sign(
			{
				sub: user.id,
				email: user.email,
			},
			config.JWT_SECRET,
			'HS512',
		);

		return token;
	};

	public getUserById = async (id: string) => {
		const user = await User.findById(id);

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	};
}
