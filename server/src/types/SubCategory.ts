import { Document, Types } from 'mongoose';

export interface ISubCategory extends Document {
    name: string;
    category_id: Types.ObjectId;
}