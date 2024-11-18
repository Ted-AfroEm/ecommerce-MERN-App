import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb";
import connectcloudinary from "./config/cloudnary";
import userRouter from "./routes/userRouter";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectcloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT: ` + port));
