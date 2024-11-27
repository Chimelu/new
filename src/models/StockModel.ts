
import mongoose, { Schema, Document } from 'mongoose';
interface IStock extends Document {
    productId: string;
    supplier?: string;
    quantityReceived: number;
    costPerUnit?: number;
    totalCost?: number;
    dateOfArrival?: Date;
    branchDetails?: string;
    quantitySent?: number;
    dateOfDispatch?: Date;
    status: 'Pending' | 'Approved';
    type: 'Stock-In' | 'Stock-Out';
    approvedByAdmin: boolean;
    verifiedByInventoryAdmin: boolean;
  }
  
  const StockSchema = new Schema<IStock>({
    productId: { type: String, required: true },
    supplier: { type: String },
    quantityReceived: { type: Number },
    costPerUnit: { type: Number },
    totalCost: { type: Number },
    dateOfArrival: { type: Date },
    branchDetails: { type: String },
    quantitySent: { type: Number },
    dateOfDispatch: { type: Date },
    status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
    type: { type: String, enum: ['Stock-In', 'Stock-Out'], required: true },
    approvedByAdmin: { type: Boolean, default: false },
    verifiedByInventoryAdmin: { type: Boolean, default: false }
  });
  
  export default mongoose.model<IStock>('Stock', StockSchema);
  