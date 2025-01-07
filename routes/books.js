import { Router } from "express";
import mongoose from "mongoose";
import { books } from "../models/book.js";
mongoose.connect(process.env.MONGODB_URI, {});
const bookRoute = Router();
bookRoute.get("/all", async (req, res) => {
  try {
    var allBooksdata = [];
    await books.find({}).then((book) => {
      allBooksdata = book;
    });

    return res.json(allBooksdata);
  } catch (error) {
    console.log(error);
    throw new Error("error getting tables from DB");
  }
});
bookRoute.put("/:id", async (req, res) => {
  try {
    const status = await books.findByIdAndUpdate(req.params.id, req.body);
    console.log("status");
    return res.json({ status: "updated", data: status });
  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
});
bookRoute.get("/id/:id", (req, res) => {
  try {
    books.findById(req.params.id).then((book, err) => {
      console.log(book);
    });
  } catch (error) {
    console.log(error);
  }
  return res.json({ status: req.params.id });
});

bookRoute.get("/get/name/:name", async (req, res) => {
  try {
    await books.find({ title: req.params.name }).then((book) => {
      console.log(book);
      return res.json({ status: req.params.name });
    });
  } catch (error) {
    return res.json({ error: "error" });
  }
});

bookRoute.get("/get/name/:author", (req, res) => {
  try {
    books.findById(req.params.author).then((book) => {
      return book;
    });
  } catch (error) {
    console.log(error);
  }
});

bookRoute.post("/create", async (req, res) => {
  const newBook = new books(req.body);
  try {
    await newBook.save();
    console.log("newbook", newBook);
    return res.send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error" });
  }
});

bookRoute.delete("/:id", async (req, res) => {
  try {
    await books.findByIdAndDelete(req.params.id);
    console.log("deleted", req.params.id);
    return res.json({ status: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

bookRoute.get("/borrowed", async (req, res) => {
  try {
    const borrowedBooks = await books.find({ issued: { $ne: null } });
    return res.json(borrowedBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});
export default bookRoute;
