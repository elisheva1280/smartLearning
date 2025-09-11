import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    phone: string;
    password: string;
    isAdmin?: boolean;
}