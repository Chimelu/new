import express, { Request, Response, NextFunction } from 'express';
import { createProduct, getAllProducts, editProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

// Helper middleware to catch async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// POST: Create a new product
router.post('/products', asyncHandler(createProduct));

// GET: Get all products
router.get('/products', asyncHandler(getAllProducts));

// PUT: Edit an existing product by ID
router.patch('/products/:productId', asyncHandler(editProduct));

// DELETE: Delete a product by ID
router.delete('/products/:productId', asyncHandler(deleteProduct))

export default router;
