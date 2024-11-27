import { Router } from 'express';
import {
createTransaction,
approveTransaction,
getAllTransactions
} from '../controllers/transactionController';

import express, { Request, Response, NextFunction } from 'express';

// Helper middleware to catch async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


const router = express.Router();

router.post('/create', asyncHandler(createTransaction));
router.get('/', asyncHandler(getAllTransactions));
router.post('/approve/:id', asyncHandler(approveTransaction));





export default router;
