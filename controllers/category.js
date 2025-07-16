import express from "express";
import prisma from "../lib/prisma.js";

// CREATE CATEGORY
const AddCategory = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, lifespan } = req.body;

    if (!name || !lifespan) {
      return res.status(203).json({ message: "Some data is missing" });
    }
    console.log("checkpoint1");
    await prisma.category.create({
      data: {
        name,
        lifespan,
      },
    });
    console.log("code has run till here");
    return res.status(200).json({ message: "product has added successfully" });
    console.log("chekpoint 2");
  } catch (error) {
    return res.status(500).json({ message: "some invalid Error occured !" });
  }
};

// GET PAGINATED CATEGORY
const GetSomeCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * 10;
    const getcategory = await prisma.category.findMany({
      skip: skip,
      take: limit,
    });
    return res.status(200).json(getcategory);
  } catch (error) {
    return res.status(500).json({ message: "some invalid error has occured" });
  }
};

// GET SPECIFIC CATEGORIES

const GetCategory = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("this is id", id);
    const getcategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        lifespan: true,
        created_at: true,
      },
    });
    console.log(getcategory);
    return res.status(200).json(getcategory);
  } catch (error) {
    return res.status(500).json({ message: "some invalid error has occured" });
  }
};

// UPDATED CATEGORIES
const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, lifespan } = req.body;
    await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        lifespan,
      },
    });

    return res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "some invalid error has occured in updating the category",
    });
  }
};

// DELETE CATEGORIES
const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "some invalid error has occured while deleteing this category",
    });
  }
};

export {
  AddCategory,
  GetSomeCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
};
