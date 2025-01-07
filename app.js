import "dotenv/config";
import express from "express";
import { createServer } from "http";

import bookRoute from "./routes/books.js";
import transcationsRoute from "./routes/transcations.js";
import userRoute from "./routes/user.js";

const app = express();
const port = 8000;
app.use(express.json());

const server = createServer(app);

app.get("/", (req, res) => {
  return res.json({ status: "active" });
});
app.use("/book", bookRoute);
app.use("/transaction", transcationsRoute);
app.use("/user", userRoute);
server.listen(port, () => {
  console.log(`server running at ${port}`);
});
