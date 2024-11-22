import { v2 as cloudnary } from "cloudinary";
import productModel from "../models/productModel";

const storeProduct = async (req: any, res: any) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const { image1, image2, image3, image4 } = req.files;

    const img1 = image1?.[0];
    const img2 = image2?.[0];
    const img3 = image3?.[0];
    const img4 = image4?.[0];

    const images = [img1, img2, img3, img4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudnary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const produtData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      createdDate: Date.now(),
    };
    const product = new productModel(produtData);
    await product.save();

    res.json({
      success: true,
      message: "Product Added",
    });
  } catch (error) {
    res.json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
const showProduct = async (req: any, res: any) => {};
const removeProduct = async (req: any, res: any) => {};
const showAllProducts = async (req: any, res: any) => {};

export { storeProduct, showProduct, removeProduct, showAllProducts };
