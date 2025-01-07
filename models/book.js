import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title required"] },
    author: { type: String, required: [true, "author required"] },
    pages: Number,
    coverImage: String,
    description: String,
    ssbn: { type: String, required: [true, "ssbn required"] },
    issued: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  { timestamps: true }
);

export const books = mongoose.model("books", bookSchema);
