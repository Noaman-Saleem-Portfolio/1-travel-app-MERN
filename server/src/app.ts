import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import connectDB from "./database/database.js";

// Importing Routes
import agencyRoutes from "./routes/agency-routes.js";
import categoryRoutes from "./routes/category-routes.js";

import { errorMiddleware } from "./middlewares/error.js";

//Configuring environment variables
config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

//Connecting to MongoDB
connectDB(mongoURI);

//Initializing app variable
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

//Routes declaration
app.use("/api/v1/agency", agencyRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
