import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./router/userRoute.js";
import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./router/productRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API working now!");
});

app.listen(port, () => console.log("Server start on port:" + port));
