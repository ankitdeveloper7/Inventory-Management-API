import express from "express";
import prisma from "../lib/prisma.js";

// CREATE Product
const AddProduct = async (req, res) => {
  try {
    const { name, categoriesId, supplierId, stock_quantity, price, offer } =
      req.body;

    if (!name || !categoriesId || !supplierId || !stock_quantity || !price) {
      return res
        .status(400)
        .json({ message: "Some required product fields are missing" });
    }

    await prisma.product.create({
      data: {
        name,
        categoriesId: Number(categoriesId),
        supplierId: Number(supplierId),
        stock_quantity: Number(stock_quantity),
        price: Number(price),
        offer: Number(offer),
      },
    });

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while adding product" });
  }
};

// GET paginated Products
const GetSomeProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      include: {
        categories: true,
        supplies: true,
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching products" });
  }
};

// FILTER Products by categoryId
const FilterProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        categoriesId: Number(categoryId),
      },
      include: {
        categories: true,
        supplies: true,
      },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while filtering products" });
  }
};

// GET single Product by ID
const GetProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        categories: true,
        supplies: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching product" });
  }
};

// UPDATE Product by ID
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoriesId, supplierId, stock_quantity, price, offer } =
      req.body;

    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        categoriesId: Number(categoriesId),
        supplierId: Number(supplierId),
        stock_quantity: Number(stock_quantity),
        price: Number(price),
        offer: Number(offer),
      },
    });

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while updating product" });
  }
};

// DELETE Product by ID
const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while deleting product" });
  }
};

export {
  AddProduct,
  GetSomeProducts,
  FilterProductByCategory,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
};
