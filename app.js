import "dotenv/config";
import express from "express";
import { createServer } from "http";

import cors from "cors";
import bookRoute from "./routes/books.js";
import transcationsRoute from "./routes/transcations.js";
import userRoute from "./routes/user.js";
const app = express();
const port = 8000;
const allowedOrigins = [
  process.env.FRONTEND_URL ? process.env.FRONTEND_URL : "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
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
