import { Document, Types } from 'mongoose';

export interface IPrompt extends Document {
    user_id: Types.ObjectId;
    category_id?: Types.ObjectId;
    sub_category_id?: Types.ObjectId;
    category?: string;
    subcategory?: string;
    prompt: string;
    response: string;
    create_at: Date;
}