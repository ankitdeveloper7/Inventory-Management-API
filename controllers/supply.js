import express from "express";
import prisma from "../lib/prisma.js";

// CREATE Supply
const AddSupply = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { name, address, contact_number, email } = req.body;

    if (!name || !address || !contact_number || !email) {
      return res.status(400).json({ message: "Some data is missing" });
    }

    await prisma.supply.create({
      data: {
        name,
        address,
        contact_number,
        email,
      },
    });

    return res.status(200).json({ message: "Supply added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while adding supply" });
  }
};

// GET paginated Supplies
const GetSomeSupply = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const supplies = await prisma.supply.findMany({
      skip: skip,
      take: limit,
    });

    return res.status(200).json(supplies);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching supplies" });
  }
};
// GET the supply detals based on filtering
const FilterSupply = async (req, res) => {
  try {
    const { contact } = req.body;
    console.log(contact);
    if (!contact) {
      return res.status(300).json({ message: "contact is missing" });
    }
    console.log("checkpoint1");
    const supplydetails = await prisma.supply.findUnique({
      where: {
        contact_number: contact,
      },
    });
    if (!supplydetails) {
      return res
        .status(404)
        .json({ message: "No supply found with this contact number" });
    }
    return res.status(200).json(supplydetails);
  } catch (error) {
    return res.status(400).json({ message: "Some error has occured" });
  }
};

// GET single Supply by ID
const GetSupply = async (req, res) => {
  try {
    const { id } = req.body;

    const supply = await prisma.supply.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        address: true,
        contact_number: true,
        email: true,
      },
    });

    return res.status(200).json(supply);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the supply" });
  }
};

// UPDATE Supply by ID
const UpdateSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact_number, email } = req.body;

    await prisma.supply.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        address,
        contact_number,
        email,
      },
    });

    return res.status(200).json({ message: "Supply updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the supply",
    });
  }
};

// DELETE Supply by ID
const DeleteSupply = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.supply.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Supply deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the supply",
    });
  }
};

export {
  AddSupply,
  GetSomeSupply,
  FilterSupply,
  GetSupply,
  UpdateSupply,
  DeleteSupply,
};
