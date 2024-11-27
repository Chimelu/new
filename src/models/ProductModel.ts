import { Document, Schema, model } from 'mongoose';

interface IPriceTier {
  minQuantity: number;         // Minimum cartons required to qualify for this price
  pricePerCarton: number;      // Discounted price per carton at this tier
}

interface IProduct extends Document {
  _id: Schema.Types.ObjectId;  // Unique identifier for each product
  productName: string;
  pricePerCarton: number;      // Standard price per carton
  quantityAvailable: number;   // Stock level in cartons
  priceTiers: IPriceTier[];    // Array of price tiers for bulk discounting
}





const PriceTierSchema = new Schema<IPriceTier>({
  minQuantity: { type: Number, required: true },
  pricePerCarton: { type: Number, required: true }
});




const ProductSchema = new Schema<IProduct>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  productName: { type: String, required: true },
  pricePerCarton: { type: Number, required: true },
  quantityAvailable: { type: Number, required: true },
  priceTiers: { type: [PriceTierSchema], default: [] } // Embedded array for price tiers
});



const Product = model<IProduct>('Product', ProductSchema);
export default Product;
