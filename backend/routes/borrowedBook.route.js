import express from "express";
import {
  getBorrowedBooks,
  getOverdueBooks,
  borrowBook,
  returnBook,
} from "../controller/borrowedBook.controller.js";

const borrowedBookRouter = express.Router();

borrowedBookRouter.get("/borrowedBooks", getBorrowedBooks);
borrowedBookRouter.get("/overdueBooks", getOverdueBooks);
borrowedBookRouter.post("/borrowedBook", borrowBook);
borrowedBookRouter.patch("/borrowedBook/:id_book/:id_user", returnBook);

export default borrowedBookRouter;
