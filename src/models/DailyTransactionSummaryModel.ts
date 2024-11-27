import { Document, Schema, model } from 'mongoose';

interface IDailyTransactionSummary extends Document {
  date: Date;                        // The date of the summary
  totalTransactions: number;         // Total number of transactions for the day
  totalAmount: number;               // Total sales amount for the day
  totalSentToAccount: number;        // Total amount sent to the bank for the day
  totalCashAtHand: number;           // Total cash kept on hand for the day
  approvedByAdmin: boolean;           // Total cash kept on hand for the day
}

const DailyTransactionSummarySchema = new Schema<IDailyTransactionSummary>({
  date: { type: Date, required: true, unique: true }, // Ensure one record per day
  totalTransactions: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  totalSentToAccount: { type: Number, default: 0 },
  totalCashAtHand: { type: Number, default: 0 },
  approvedByAdmin: { type: Boolean, default: false },
});

const DailyTransactionSummary = model<IDailyTransactionSummary>('DailyTransactionSummary', DailyTransactionSummarySchema);
export default DailyTransactionSummary;