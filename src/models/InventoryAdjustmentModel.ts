import mongoose, { Schema, Document } from 'mongoose';

interface IInventoryAdjustment extends Document {
    productId: string;
    quantityAdjusted: number;
    reason: string;
    submittedBy: string;
    approvedByAdmin: boolean;
    approvedByInventoryAdmin: boolean;
    date: Date;
  }
  
  const InventoryAdjustmentSchema = new Schema<IInventoryAdjustment>({
    productId: { type: String, required: true },
    quantityAdjusted: { type: Number, required: true },
    reason: { type: String, required: true },
    submittedBy: { type: String, required: true },
    approvedByAdmin: { type: Boolean, default: false },
    approvedByInventoryAdmin: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  });
  
  export default mongoose.model<IInventoryAdjustment>('InventoryAdjustment', InventoryAdjustmentSchema);
  