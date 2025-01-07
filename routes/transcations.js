import { Router } from "express";
import mongoose from "mongoose";
import { books } from "../models/book.js";
import { transcations } from "../models/transcations.js";
const { ObjectId } = mongoose.Types;
mongoose.connect(process.env.MONGODB_URI, {});
const transcationsRoute = Router();

transcationsRoute.get("/all", async (req, res) => {
  try {
    var allTranscationsdata = [];
    await transcations.find({}).then((transcation) => {
      allTranscationsdata = transcation;
    });
    console.log(allTranscationsdata);
    return res.json(allTranscationsdata);
  } catch (error) {
    console.log(error);
    throw new Error("error getting tables from DB");
  }
});

transcationsRoute.post("/create", async (req, res) => {
  try {
    const { bookId, userId } = req.body.userId;
    const oldbook = await books.findById(bookId);
    console.log("oldbook", oldbook);
    if (oldbook && oldbook.issued != null) {
      console.log("Book already issued");
      return res.status(400).json({ error: "Book already issued" });
    }

    await books.findByIdAndUpdate(bookId, { issued: userId });
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const book = new ObjectId(bookId);
    const user = new ObjectId(userId);
    const transaction = new transcations({
      bookId: book,
      userId: user,
      returnDate: futureDate,
    });

    await transaction.save();
    const data = await books.findOne({ _id: bookId });
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

transcationsRoute.post("/complete", async (req, res) => {
  try {
    console.log(req.body);
    const { bookId, userId } = req.body;
    console.log(bookId, userId);
    const oldbook = await books.findById(bookId);
    if (!oldbook || oldbook.issued != userId) {
      return res.status(400).json({ error: "Book not issued to this user" });
    }
    await books.findByIdAndUpdate(bookId, { issued: null });
    await transcations.findOneAndDelete({ bookId: bookId, userId: userId });
    const data = await books.findOne({ _id: bookId });
    console.log(data);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default transcationsRoute;
