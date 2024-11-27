import { Request, Response } from 'express';
import Product from '../models/ProductModel'; // Adjust the path to your actual Product model



// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, pricePerCarton, quantityAvailable, priceTiers } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      productName,
      pricePerCarton,
      quantityAvailable,
      priceTiers
    });

    // Save the product to the database
    await newProduct.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find(); // Retrieves all products from the database
    return res.status(200).json({
      message: 'Products fetched successfully',
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Edit an existing product
export const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { productName, pricePerCarton, quantityAvailable, priceTiers } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { productName, pricePerCarton, quantityAvailable, priceTiers },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product', error });
  }
};
