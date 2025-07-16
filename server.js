import express from "express";

import {
  AddCategory,
  GetSomeCategory,
  GetCategory,
  DeleteCategory,
  UpdateCategory,
} from "./controllers/category.js";

import {
  AddSupply,
  GetSomeSupply,
  FilterSupply,
  GetSupply,
  UpdateSupply,
  DeleteSupply,
} from "./controllers/supply.js";

import {
  AddProduct,
  GetSomeProducts,
  FilterProductByCategory,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} from "./controllers/product.js";

import {
  AddStockMovement,
  GetStockMovements,
  DeleteStockMovement,
  FilterStockByContact,
} from "./controllers/stockMovement.js";
// import cate

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// category section
app.post("/category/add", AddCategory);
app.get("/category", GetSomeCategory);
app.get("/category/getcategory", GetCategory);
app.put("/category/:id", UpdateCategory);
app.delete("/category/deletecategory", DeleteCategory);

// supply section
app.post("/supply/add", AddSupply);
app.get("/supply", GetSomeSupply);
app.get("/supply/filter", FilterSupply);
app.get("/supply/getsupply", GetSupply);
app.put("/supply/:id", UpdateSupply);
app.delete("/supply/deletesupply", DeleteSupply);

// Product section
app.post("/product/add", AddProduct);
app.get("/product", GetSomeProducts);
app.get("/product/filter", FilterProductByCategory);
app.post("/product/get", GetProduct);
app.put("/product/:id", UpdateProduct);
app.delete("/product/delete", DeleteProduct);

// stock movement section
app.post("/stock/add", AddStockMovement);
app.get("/stock", GetStockMovements);
app.post("/stock/filter", FilterStockByContact);
app.delete("/stock/delete", DeleteStockMovement);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
