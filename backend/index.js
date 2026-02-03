import express from "express";
import cors from "cors";
import db from "./config/database.js";
import dotenv from "dotenv";

import "./models/index.js";

import bookRouter from "./routes/book.route.js";
import userRouter from "./routes/user.route.js";
import borrowedBookRouter from "./routes/borrowedBook.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bookRouter);
app.use(userRouter);
app.use(borrowedBookRouter);

// Static Folder
app.use("/uploads", express.static("uploads"));

await db.authenticate();
console.log("Database connected...");

await db.sync({ alter: true });
console.log("Database synced...");

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend :)" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
