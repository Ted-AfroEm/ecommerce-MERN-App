import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb";
import connectcloudinary from "./config/cloudnary";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectcloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT: ` + port));
