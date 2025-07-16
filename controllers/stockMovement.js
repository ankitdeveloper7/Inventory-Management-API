import prisma from "../lib/prisma.js";

// CREATE Stock Movement
const AddStockMovement = async (req, res) => {
  try {
    const {
      productId,
      movement_type,
      quantity,
      source_address,
      destination_address,
      contact_number,
      email,
      delivery_address,
    } = req.body;

    if (
      !productId ||
      !movement_type ||
      !quantity ||
      !source_address ||
      !destination_address ||
      !contact_number ||
      !email ||
      !delivery_address
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await prisma.stockMovement.create({
      data: {
        productId: Number(productId),
        movement_type,
        quantity: Number(quantity),
        source_address,
        destination_address,
        contact_number: Number(contact_number),
        email,
        delivery_address,
      },
    });

    return res
      .status(200)
      .json({ message: "Stock movement recorded successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while recording stock movement" });
  }
};

// GET paginated Stock Movements
const GetStockMovements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movements = await prisma.stockMovement.findMany({
      skip,
      take: limit,
      include: {
        product: true,
      },
    });

    return res.status(200).json(movements);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching stock movements" });
  }
};

// GET stock movement by contact_number
const FilterStockByDelivery = async (req, res) => {
  try {
    const { contact_number } = req.body;

    if (!contact_number) {
      return res.status(400).json({ message: "Contact number is required" });
    }

    const movement = await prisma.stockMovement.findUnique({
      where: {
        contact_number: Number(contact_number),
      },
      include: {
        product: true,
      },
    });

    if (!movement) {
      return res
        .status(404)
        .json({ message: "No stock movement found for this contact number" });
    }

    return res.status(200).json(movement);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error filtering stock movement" });
  }
};

// DELETE stock movement by ID
const DeleteStockMovement = async (req, res) => {
  try {
    const { id } = req.body;

    await prisma.stockMovement.delete({
      where: {
        id: Number(id),
      },
    });

    return res
      .status(200)
      .json({ message: "Stock movement deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting stock movement" });
  }
};

export {
  AddStockMovement,
  GetStockMovements,
  FilterStockByDelivery,
  DeleteStockMovement,
};
