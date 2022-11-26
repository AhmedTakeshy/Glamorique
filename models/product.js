import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuid } from "uuid";

const ProductSchema = new Schema({
  id: uuid(),
  type: String,
  BrandName: String,
  productName: String,
  price: Number,
  src: [
    {
      src1: String,
    },
    {
      src2: String,
    },
  ],
  color: String,
  brand: String,
  FabricType: String,
});

module.exports = mongoose.model("Product", ProductSchema);
