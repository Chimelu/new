import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import productRoutes from './routes/productRoute'; // Assuming you have a product routes file
import inventoryAdjustmentRoute from './routes/inventoryAdjustmentRoute'
import transactionRoute from './routes/transactionRoute'
import errorHandler from './middlewares/errorHandler'
import cors from 'cors';
import {connectPG} from './connect';

dotenv.config();


 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*', // Allow all origins (adjust this for security in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Noe.js!');
});

app.use('/api', productRoutes); // Use your product routes
app.use('/api', inventoryAdjustmentRoute); // Use your product routes
app.use('/api/transactions', transactionRoute); 



app.listen(PORT, () => {
  // connectPG()
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});
