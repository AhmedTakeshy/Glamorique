import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

const ProductSchema = new Schema({
  type: String,
  brandName: String,
  description: String,
  price: Number,
  images: [imageSchema],
});

export default mongoose.model("Product", ProductSchema);
