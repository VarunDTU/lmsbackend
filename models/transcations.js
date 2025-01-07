import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true }, //7days},
  },

  { timestamps: true }
);

export const transcations = mongoose.model("transcations", transactionSchema);
