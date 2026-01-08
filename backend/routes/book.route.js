import express from "express";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controller/book.controller.js";

const bookRouter = express.Router();

bookRouter.post("/book", addBook);
bookRouter.get("/books", getBooks);
bookRouter.patch("/book/:id_book", updateBook);
bookRouter.delete("/book/:id_book", deleteBook);

export default bookRouter;
