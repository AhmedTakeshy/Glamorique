import mongoose from "mongoose";
import Product from "../models/product.js";
import allData from "./json-files/AllData.js";

mongoose.connect("mongodb://127.0.0.1:27017/exclusv", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  // await Product.deleteMany({});
  for (let i = 0; i < 22; i++) {
    const product = new Product({
      type: allData[i].type,
      brandName: allData[i].brandName,
      description: allData[i].description,
      price: allData[i].price,
      images: [
        {
          url: `https://res.cloudinary.com/dhulz3zfg/image/upload/v1669515382/Exclusv/women_shirt/item2previwe${i}.jpg`,
          filename: `Exclusv/women_shirt/item2previwe${i}`,
        },
        {
          url: `https://res.cloudinary.com/dhulz3zfg/image/upload/v1669515382/Exclusv/women_shirt/item2previwe${i}.jpg`,
          filename: `Exclusv/women_shirt/item2previwe${i}`,
        },
        {
          url: `https://res.cloudinary.com/dhulz3zfg/image/upload/v1669515382/Exclusv/women_shirt/item2previwe${i}.jpg`,
          filename: `Exclusv/women_shirt/item2previwe${i}`,
        },
      ],
    });
    await product.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
