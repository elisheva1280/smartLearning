import mongoose, { Schema } from 'mongoose';
import { IPrompt } from '../types/Prompt';

const promptSchema = new Schema<IPrompt>({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    category: { type: String },
    subcategory: { type: String },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    create_at: { type: Date, default: Date.now }
});

const Prompt = mongoose.model<IPrompt>('Prompt', promptSchema);

export default Prompt;