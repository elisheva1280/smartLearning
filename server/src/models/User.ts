import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/User';

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
