const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 15,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: [
      {
        data: Buffer,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Item", itemSchema);
