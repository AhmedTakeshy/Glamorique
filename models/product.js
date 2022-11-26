import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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

export default mongoose.model("Product", ProductSchema);
