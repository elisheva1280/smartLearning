import mongoose, { Schema } from 'mongoose';
import { ISubCategory } from '../types/SubCategory';

const subCategorySchema = new Schema<ISubCategory>({
    name: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const SubCategory = mongoose.model<ISubCategory>('SubCategory', subCategorySchema);

export default SubCategory;