import db from "../config/database.js";
import { Book, User, BorrowedBook } from "../models/index.js";

const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll({
      include: [
        {
          model: Book,
        },
        {
          model: User,
        },
      ],
    });
    res.json({
      result: borrowedBooks,
      message: "Berhasil mengambil data buku yang dipinjam!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const borrowBook = async (req, res) => {
  const t = await db.transaction();

  try {
    const { id_book, id_user, borrowed_at, returned_at, due_date, status } =
      req.body;

    const borrowedBook = await BorrowedBook.create({
      id_book,
      id_user,
      borrowed_at,
      returned_at,
      due_date,
      status,
    });

    await Book.decrement("quantity", {
      where: { id: id_book },
      transaction: t,
    });

    await t.commit();

    res.json({
      result: borrowedBook,
      message: "Buku berhasil dipinjam!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    await t.rollback();
  }
};

const returnBook = async (req, res) => {
  const t = await db.transaction();

  try {
    const { id_book, id_user } = req.params;
    const { returned_at, status } = req.body;

    await BorrowedBook.update(
      { returned_at, status },
      { where: { id_book, id_user } }
    );

    await Book.increment("quantity", {
      where: { id: id_book },
      transaction: t,
    });

    const updatedBorrowedBook = await BorrowedBook.findOne({
      where: { id_book, id_user },
    });

    await t.commit();

    res.json({
      result: updatedBorrowedBook,
      message: "Buku berhasil dikembalikan!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
    await t.rollback();
  }
};

export { getBorrowedBooks, borrowBook, returnBook };
