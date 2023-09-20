import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// database connect
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("welcome to crud app");
});

app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode  on ${PORT} `.bgCyan
      .white
  );
});
