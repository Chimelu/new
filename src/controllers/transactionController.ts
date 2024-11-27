import { Request, Response } from 'express';
import Transaction from '../models/TransactionModel';
import Product from '../models/ProductModel';  // Adjust the import path to your Transaction model

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      products,
      userName,
      totalAmountPaid,
      amountSentToAccount,
      amountAtHand,
      paymentMethod,
      
    } = req.body;

    // Validate request body
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: 'Products array is required and cannot be empty' });
    }

    // Validate each product
    products.forEach((product: any) => {
      const { productId, productName, quantity, pricePerUnit, subTotal } = product;

      if (!productId || !productName || !quantity || !pricePerUnit || subTotal === undefined) {
        throw new Error(
          'Each product must have productId, productName, quantity, pricePerUnit, and subTotal'
        );
      }
    });

    // Calculate totalAmount from the provided subtotals
    const totalAmount = products.reduce(
      (sum: number, product: any) => sum + product.subTotal,
      0
    );

    // Create transaction object
    const newTransaction = new Transaction({
      products,
      userName,
      totalAmount,
      totalAmountPaid,
      amountSentToAccount,
      amountAtHand,
      paymentMethod,
    });

    // Save transaction to the database
    await newTransaction.save();

    return res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  }catch (error) {
    throw error
  }
};

export const approveTransaction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Find the transaction
      const transaction = await Transaction.findById(id);
  
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
  
      // Check if the transaction is already approved
      if (transaction.status === 'Approved') {
        return res.status(400).json({ success: false, message: 'Transaction is already approved' });
      }
  
      // Update product quantities
      for (const product of transaction.products) {
        const { productId, quantity } = product;
  
        const existingProduct = await Product.findById(productId);
  
        if (!existingProduct) {
          return res.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found`,
          });
        }
  
        // Check if enough quantity is available
        if (existingProduct.quantityAvailable < quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${existingProduct.productName}`,
          });
        }
  
        // Subtract the quantity sold from the available stock
        existingProduct.quantityAvailable -= quantity;
        await existingProduct.save();
      }
  
      // Update the transaction status to "Approved"
      transaction.status = 'Approved';
      await transaction.save();
  
      res.status(200).json({
        success: true,
        message: 'Transaction approved and product quantities updated',
        transaction,
      });
    } catch (error) {
        throw error
        
      }
  };
  export const getAllTransactions = async (req: Request, res: Response) => {
    try {
      // Fetch all transactions from the database
      const transactions = await Transaction.find();
  
      // Return the transactions
      res.status(200).json({
        success: true,
        message: 'Transactions retrieved successfully',
        transactions,
      });
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve transactions'
      })
    }
  };
  
  /**
   * Get a transaction by ID
   */
  export const getTransactionById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Find the transaction by ID
      const transaction = await Transaction.findById(id);
  
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: `Transaction with ID ${id} not found`,
        });
      }
  
      // Return the transaction
      res.status(200).json({
        success: true,
        message: 'Transaction retrieved successfully',
        transaction,
      });
    } catch (error) {
      console.error(`Error retrieving transaction with ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve transaction',
      });
    }
  };