import express from "express";
import upload from "../middleware/upload.js";
import {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controller/book.controller.js";

const bookRouter = express.Router();

bookRouter.post("/book", upload.single("image"), addBook);
bookRouter.get("/books", getBooks);
bookRouter.get("/book/:id_book", getBook);
bookRouter.patch("/book/:id_book", upload.single("image"), updateBook);
bookRouter.delete("/book/:id_book", deleteBook);

export default bookRouter;
