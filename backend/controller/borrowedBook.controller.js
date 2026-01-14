import db from "../config/database.js";
import { Book, User, BorrowedBook } from "../models/index.js";
import { Op, where } from "sequelize";

const updateOverdueStatus = async () => {
  try {
    const today = new Date();
    await BorrowedBook.update(
      { status: "overdue" },
      {
        where: {
          status: "borrowed",
          due_date: { [db.Sequelize.Op.lt]: today },
          returned_at: null,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    await updateOverdueStatus();

    const page = req.query.page || 1;
    const search = req.query.search || null;
    const offset = (page - 1) * 10;
    const limit = 10;

    const whereCondition = {};

    if (search) {
      whereCondition[Op.or] = [
        { "$User.name$": { [Op.like]: `%${search}%` } },
        { "$Book.title$": { [Op.like]: `%${search}%` } },
        { status: { [Op.like]: `%${search}%` } },
      ];
    }

    const borrowedBooks = await BorrowedBook.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      include: [
        {
          model: Book,
        },
        {
          model: User,
        },
      ],
    });

    const totalPage = Math.ceil(borrowedBooks.count / limit);

    res.json({
      result: {
        data: borrowedBooks.rows,
        pagination: {
          currentPage: page,
          totalPage,
        },
      },
      message: "Berhasil mengambil data buku yang dipinjam!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getOverdueBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const search = req.query.search || null;
    const offset = (page - 1) * 10;
    const limit = 10;

    const whereCondition = {};

    if (search) {
      whereCondition[Op.or] = [
        { "$User.name$": { [Op.like]: `%${search}%` } },
        { "$Book.title$": { [Op.like]: `%${search}%` } },
      ];
    }

    const borrowedBooks = await BorrowedBook.findAndCountAll({
      where: { status: "overdue", ...whereCondition },
      limit,
      offset,
      include: [
        {
          model: Book,
        },
        {
          model: User,
        },
      ],
    });

    const totalPage = Math.ceil(borrowedBooks.count / limit);

    res.json({
      result: {
        data: borrowedBooks.rows,
        pagination: {
          currentPage: page,
          totalPage,
        },
      },
      message: "Berhasil mengambil data buku yang menunggak!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const borrowBook = async (req, res) => {
  const t = await db.transaction();

  try {
    const { id_book, id_user, due_date } = req.body;

    const book = await Book.findOne(
      { where: { id: id_book } },
      { transaction: t }
    );

    if (!book) {
      await t.rollback();
      return res.status(404).json({ message: "Buku tidak ditemukan!" });
    }

    if (book.quantity === 0) {
      await t.rollback();
      return res.status(401).json({ message: "Buku tidak tersedia!" });
    }

    const borrowedBook = await BorrowedBook.create(
      {
        id_book,
        id_user,
        borrowed_at: new Date(),
        returned_at: null,
        due_date,
        status: "borrowed",
      },
      { transaction: t }
    );

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
    const { returned_at } = req.body;

    await BorrowedBook.update(
      { returned_at, status: "returned" },
      { where: { id_book, id_user } },
      { transaction: t }
    );

    await Book.increment("quantity", {
      where: { id: id_book },
      transaction: t,
    });

    const updatedBorrowedBook = await BorrowedBook.findOne(
      {
        where: { id_book, id_user },
      },
      { transaction: t }
    );

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

export { getBorrowedBooks, getOverdueBooks, borrowBook, returnBook };
