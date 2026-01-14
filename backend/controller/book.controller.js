import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import db from "../config/database.js";
import { Book } from "../models/index.js";

const addBook = async (req, res) => {
  try {
    const { title, quantity } = req.body;

    let image_url = null;
    let image_public_id = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      image_url = result.secure_url;
      image_public_id = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    const book = await Book.create({
      title,
      quantity,
      image_url,
      image_public_id,
    });

    res.json({
      result: book,
      message: "Buku berhasil ditambahkan!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBooks = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const search = req.query.search || null;
    const offset = (page - 1) * 10;
    const limit = 10;

    const books = await Book.findAndCountAll({
      where: search && { title: { [Op.like]: `%${search}%` } },
      limit,
      offset,
    });

    const totalPage = Math.ceil(books.count / limit);

    res.json({
      result: {
        data: books.rows,
        pagination: {
          currentPage: page,
          totalPage,
        },
      },
      message: "Berhasil mengambil data buku!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBook = async (req, res) => {
  try {
    const { id_book } = req.params;
    const book = await Book.findOne({ where: { id: id_book } });
    res.json({
      result: book,
      message: "Berhasil mengambil data buku!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateBook = async (req, res) => {
  const t = await db.transaction();

  try {
    const { id_book } = req.params;
    const { title, quantity } = req.body;

    const book = await Book.findByPk(id_book, { transaction: t });

    if (!book) {
      await t.rollback();
      return res.status(401).json({ message: "Buku tidak ditemukan!" });
    }

    let image_url = book.image_url;
    let image_public_id = book.image_public_id;

    if (req.file) {
      await cloudinary.uploader.destroy(book.image_public_id);

      const result = await cloudinary.uploader.upload(req.file.path);

      image_url = result.secure_url;
      image_public_id = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    await Book.update(
      {
        title,
        quantity,
        image_url,
        image_public_id,
      },
      { where: { id: id_book } },
      { transaction: t }
    );

    const updatedBook = await Book.findOne(
      { where: { id: id_book } },
      { transaction: t }
    );

    await t.commit();

    res.json({
      result: updatedBook,
      message: "Buku berhasil diperbarui!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id_book } = req.params;
    const book = await Book.destroy({ where: { id: id_book } });
    res.json({
      result: book,
      message: "Buku berhasil dihapus!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addBook, getBooks, getBook, updateBook, deleteBook };
