import { Document } from 'mongoose';

export interface IPromptHistory extends Document {
    userId: string;
    category: string;
    subcategory: string;
    prompt: string;
    response: string;
    timestamp: Date;
}