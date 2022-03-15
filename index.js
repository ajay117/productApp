const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");
const Product = require("./models/product");
const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongo Connection Made");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const categories = ["fruit", "vegetable", "dairy"];

// Index Route
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

// New Route
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

// Create Route
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.redirect(`/products/${product._id}`);
});

// Show Route
app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

// Edit Route
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

// Put Route
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect(`/products/${id}`);
});

// Delete Route
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
