import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

/**
 * @desc    Add a new product
 * @route   POST /api/product/add
 * @access  Private (Admin)
 */
const addProduct = async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Lấy file upload từ request (multer lưu ở req.files)
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Gom các ảnh có tồn tại lại thành 1 mảng
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload lần lượt từng ảnh lên Cloudinary → trả về link
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // secure_url là link https
      })
    );

    // Chuẩn bị dữ liệu sản phẩm
    const productData = {
      name,
      description,
      category,
      price: Number(price), // ép kiểu về số
      subCategory,
      bestSeller: bestSeller === "true" ? "true" : "false", // ép về boolean
      sizes: JSON.parse(sizes), // parse từ string thành mảng
      image: imageUrl,
      date: Date.now(),
    };

    // Lưu vào MongoDB
    const product = new productModel(productData);
    const productInfo = await product.save();

    // Trả về response
    res.json({
      status: "success",
      message: "Product added successfully",
      data: productInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error when adding product",
    });
  }
};

/**
 * @desc    Remove a product by ID
 * @route   DELETE /api/product/remove/:id
 * @access  Private (Admin)
 */
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);

    res.json({ status: "success", message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error when removing product",
    });
  }
};

/**
 * @desc    Get list of all products
 * @route   GET /api/product/list
 * @access  Public
 */
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ status: "success", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error when getting product list",
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/product/:id
 * @access  Public
 */
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.json({ status: "success", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error when getting product",
    });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
