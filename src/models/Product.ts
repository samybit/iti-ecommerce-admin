import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discount: String,
    stock: { type: Number, default: 0 },

    //  RELATION FIX
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);