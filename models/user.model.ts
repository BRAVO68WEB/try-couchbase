import { Schema } from 'ottoman';
import { ottoman } from '../config/ottoman';

type IUserRole = 'admin' | 'user';

interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
  role: IUserRole;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema({
	id: String,
	name: String,
	email: String,
	password: String,
  role: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.index.findByName = { by: 'name' };
UserSchema.index.findByEmail = { by: 'email' };

const User = ottoman.model<IUser>('users', UserSchema);

export { User, type IUser, type IUserRole };
