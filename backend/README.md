backend/
│── node_modules/ # Thư viện cài bằng npm
│── src/
│ │── config/ # Cấu hình (DB, cloudinary, stripe, v.v.)
│ │ └── db.js
│ │ └── cloudinary.js
│ │
│ │── controllers/ # Nơi xử lý logic (login, register, CRUD)
│ │ └── authController.js
│ │ └── productController.js
│ │ └── orderController.js
│ │
│ │── models/ # Định nghĩa schema MongoDB
│ │ └── User.js
│ │ └── Product.js
│ │ └── Order.js
│ │
│ │── routes/ # Định nghĩa API endpoint
│ │ └── authRoutes.js
│ │ └── productRoutes.js
│ │ └── orderRoutes.js
│ │ └── userRoutes.js
│ │
│ │── middlewares/ # Middleware (auth, error handler, upload)
│ │ └── authMiddleware.js
│ │ └── uploadMiddleware.js
│ │
│ │── utils/ # Tiện ích chung (validator, email, jwt helper)
│ │ └── generateToken.js
│ │ └── sendEmail.js
│ │
│ │── app.js # Khởi tạo express app
│ │── server.js # File chính để start server
│ │── .env # Biến môi trường (PORT, DB_URL, JWT_SECRET...)
│
│── package.json
│── .gitignore

Giải thích các folder chính:

config/ → Kết nối database, cloudinary, cấu hình stripe/razorpay.

controllers/ → Xử lý logic chính (nhận request từ routes, gọi model, trả response).

models/ → Nơi định nghĩa schema MongoDB bằng Mongoose.

routes/ → Chứa đường dẫn API, gọi tới controller tương ứng.

middlewares/ → Xử lý trung gian (kiểm tra token, validate input, upload file...).

utils/ → Chứa function phụ (gửi email, tạo JWT, hash password).

app.js → Tạo app Express, sử dụng middleware, khai báo routes.

server.js → File start server (node server.js).

-------------------- DEMO ---------------------------

1️⃣ config/db.js (kết nối MongoDB) -----------------------------------------------------
import mongoose from "mongoose";

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB Connected");
} catch (error) {
console.error("❌ MongoDB connection failed:", error.message);
process.exit(1);
}
};

export default connectDB;

2️⃣ models/User.js-----------------------------------------------------
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
},
{ timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});

const User = mongoose.model("User", userSchema);
export default User;

3️⃣ utils/generateToken.js-----------------------------------------------------
import jwt from "jsonwebtoken";

const generateToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET, {
expiresIn: "30d",
});
};

export default generateToken;

4️⃣ controllers/authController.js-----------------------------------------------------
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

} catch (error) {
res.status(500).json({ message: error.message });
}
};

5️⃣ routes/authRoutes.js-----------------------------------------------------
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

6️⃣ middlewares/authMiddleware.js-----------------------------------------------------
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
let token;

if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
try {
token = req.headers.authorization.split(" ")[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }

}

if (!token) {
res.status(401).json({ message: "Not authorized, no token" });
}
};

export default protect;

7️⃣ controllers/productController.js-----------------------------------------------------
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
try {
const products = await Product.find({});
res.json(products);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const createProduct = async (req, res) => {
try {
const product = await Product.create(req.body);
res.status(201).json(product);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

8️⃣ models/Product.js-----------------------------------------------------
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
name: { type: String, required: true },
price: { type: Number, required: true },
description: { type: String },
},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

9️⃣ routes/productRoutes.js-----------------------------------------------------
import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, createProduct);

export default router;

🔟 app.js-----------------------------------------------------
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;

1️⃣1️⃣ server.js-----------------------------------------------------
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});


📄 .env-----------------------------------------------------
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopdb
JWT_SECRET=your_secret_key_here
