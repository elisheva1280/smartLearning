import mongoose, { Schema } from 'mongoose';
import { IPromptHistory } from '../types/PromptHistory';

const promptHistorySchema = new Schema<IPromptHistory>({
    userId: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const PromptHistory = mongoose.model<IPromptHistory>('PromptHistory', promptHistorySchema);

export default PromptHistory;