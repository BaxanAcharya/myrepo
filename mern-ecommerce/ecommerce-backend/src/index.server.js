const express = require("express");
const env = require("dotenv");
const connectDb = require("./config/db");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/admin/auth");
const cateRoutes = require("./routes/category");
const ProductRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const path = require("path");
const cors = require("cors");
const app = express();

env.config();
connectDb();

const API = "/api/v1";
app.use(express.json());
app.use(morgan("tiny"));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(API, authRoutes);
app.use(API, adminAuthRoutes);
app.use(API, cateRoutes);
app.use(API, ProductRoutes);
app.use(API, cartRoutes);

app.use((err, req, res, next) => {
  console.log("error", err);
  res.status(400).json({ message: err });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port  ${process.env.PORT}`);
});
