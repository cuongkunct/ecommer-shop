import mongoose from "mongoose";

// Khởi tạo Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: Array,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  subCategory: {
    type: String,
    require: true,
  },
  size: {
    type: Array,
    require: true,
  },
  bestSeller: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Number,
    require: true,
  },
});

// mongoose.models.product > Kiểm tra model đã được tạo hay chưa
// Nếu chưa thì tạo mongoose.model("product", productSchema);
//mongoose.models là nơi Mongoose lưu tất cả các model đã được khởi tạo.
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
