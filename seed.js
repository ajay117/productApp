const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongo Connection Made");
  })
  .catch((err) => {
    console.log(err);
  });

// const p = new Product({
//   name: "Grape",
//   price: 20,
//   category: "fruit",
// });

// const seedProducts = [
//   {
//     name: "Spinach",
//     price: 5,
//     category: "vegetable",
//   },
//   {
//     name: "Carrot",
//     price: 3,
//     category: "Vegetable",
//   },
//   {
//     name: "Strawberry",
//     price: 30,
//     category: "Fruit",
//   },
//   {
//     name: "Milk",
//     price: 7,
//     category: "Dairy",
//   },
// ];

// Product.insertMany(seedProducts)
//   .then((obj) => console.log(obj))
//   .catch((err) => console.log(err));

show();
async function show() {
  const products = await Product.find();
  console.log(products);
}
