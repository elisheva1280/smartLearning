import { Document } from 'mongoose';

export interface IPrompt extends Document {
    user_id: mongoose.Types.ObjectId;
    category_id: mongoose.Types.ObjectId;
    sub_category_id: mongoose.Types.ObjectId;
    prompt: string;
    response: string;
    create_at: Date;
}