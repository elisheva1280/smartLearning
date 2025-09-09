import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types/Category';

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true }
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;