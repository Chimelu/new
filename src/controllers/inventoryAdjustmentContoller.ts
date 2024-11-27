import { Request, Response } from 'express';
import InventoryAdjustment from '../models/InventoryAdjustmentModel';

// Record a new inventory adjustment
export const recordInventoryAdjustment = async (req: Request, res: Response) => {
  try {
    const { productId, quantityAdjusted, reason, submittedBy } = req.body;

    if (!productId || !quantityAdjusted || !reason || !submittedBy) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newAdjustment = new InventoryAdjustment({
      productId,
      quantityAdjusted,
      reason,
      submittedBy
    })

    await newAdjustment.save();

    res.status(201).json({ success: true, adjustment: newAdjustment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error recording inventory adjustment', error });
  }
};

// Approve an inventory adjustment by Admin
export const approveInventoryAdjustmentByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const adjustment = await InventoryAdjustment.findByIdAndUpdate(
      id,
      { approvedByAdmin: true },
      { new: true }
    );

    if (!adjustment) {
      return res.status(404).json({ success: false, message: 'Inventory adjustment not found' });
    }

    res.status(200).json({ success: true, adjustment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error approving adjustment by admin', error });
  }
};

// Approve an inventory adjustment by Inventory Management Admin
export const approveInventoryAdjustmentByInventoryAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const adjustment = await InventoryAdjustment.findByIdAndUpdate(
      id,
      { approvedByInventoryAdmin: true },
      { new: true }
    );

    if (!adjustment) {
      return res.status(404).json({ success: false, message: 'Inventory adjustment not found' });
    }

    res.status(200).json({ success: true, adjustment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error approving adjustment by inventory admin', error });
  }
};

// Get all inventory adjustments
export const getAllInventoryAdjustments = async (_req: Request, res: Response) => {
  try {
    const adjustments = await InventoryAdjustment.find();

    res.status(200).json({ success: true, adjustments });
  } catch (error) {
    throw error
    // res.status(500).json({ success: false, message: 'Error fetching inventory adjustments', error });
  }
};
