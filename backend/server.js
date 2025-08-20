import express from "express";
import cors from "cors";
import "dotenv";
import userRouter from "./router/userRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());


app.use("api/user", userRouter);
app.get("/", (req, res) => {
  res.send("API working now!");
});

app.listen(port, () => console.log("Server start on port:" + port));
