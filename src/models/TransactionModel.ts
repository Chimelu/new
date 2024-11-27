import mongoose, { Schema, Document } from 'mongoose';

interface IProduct {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  subTotal: number;
}

interface ITransaction extends Document {
  products: IProduct[];
  userName: string;
  totalAmount: number;
  totalAmountPaid: number;
  amountSentToAccount: number;
  amountAtHand: number;
  date: Date;
  paymentMethod: 'Cash' | 'Transfer' | 'Both';
  status: 'Pending' | 'Approved';
}

const ProductSchema = new Schema<IProduct>({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  subTotal: { type: Number, required: true },
});

const TransactionSchema = new Schema<ITransaction>({
  products: { type: [ProductSchema], required: true },
  userName: { type: String },
  totalAmount: { type: Number, required: true },
  totalAmountPaid: { type: Number, required: true },
  amountSentToAccount: { type: Number, default: 0 },
  amountAtHand: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['Cash', 'Transfer', 'Both'], required: true },
  status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
