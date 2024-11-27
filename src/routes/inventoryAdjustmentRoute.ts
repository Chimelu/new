import { Router } from 'express';
import {
  recordInventoryAdjustment,
  approveInventoryAdjustmentByAdmin,
  approveInventoryAdjustmentByInventoryAdmin,
  getAllInventoryAdjustments
} from '../controllers/inventoryAdjustmentContoller';

import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();
import asyncHandler from '../utils/Asyncly';



// Route to create a new inventory adjustment
router.post('/adjustments', asyncHandler(recordInventoryAdjustment));

// Route to approve an inventory adjustment by Admin
router.patch('/adjustments/:id/approve-admin', asyncHandler(approveInventoryAdjustmentByAdmin));

// Route to approve an inventory adjustment by Inventory Management Admin
router.patch('/adjustments/:id/approve-inventory-admin', asyncHandler(approveInventoryAdjustmentByInventoryAdmin));

// Route to get all inventory adjustments
router.get('/adjustments', getAllInventoryAdjustments);

export default router;
