const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const omiseRoutes = require("./routes/omise.routes");
const authRoutes = require("./routes/auth.routes");
const mongoString = process.env.DATABASE_URL;
console.log("mongoString : ", mongoString);
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use("/", (req, res) => {
  console.log("Hi!!!");
  res.send("Hi!!");
});
app.use("/api/user", userRoutes);
app.use("/api/omise", omiseRoutes);
app.use("/api/auth", authRoutes);

app.listen(3030, () => {
  console.log(`Server Started at ${3030}`);
});
