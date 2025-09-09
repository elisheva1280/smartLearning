import { Document } from 'mongoose';

export interface ISubCategory extends Document {
    name: string;
    category_id: mongoose.Types.ObjectId;
}