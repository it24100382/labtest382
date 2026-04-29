import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount Percentage is required"],
      min: [0, "Discount Percentage cannot be negative"],
      max: [100, "Discount Percentage cannot exceed 100"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);