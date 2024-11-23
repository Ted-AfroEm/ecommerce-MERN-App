import express from "express";
import {
  storeProduct,
  showProduct,
  removeProduct,
  showAllProducts,
} from "../controllers/productController";
import upload from "../middleware/multer";
import adminAuth from "../middleware/adminAuth";

const productRouter = express.Router();

productRouter.post(
  "/",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  storeProduct
);
productRouter.get("/", showAllProducts);
productRouter.delete("/:id", adminAuth, removeProduct);
productRouter.get("/:id", showProduct);

export default productRouter;
