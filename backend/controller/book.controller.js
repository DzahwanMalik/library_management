import { Book } from "../models/index.js";

const addBook = async (req, res) => {
  try {
    const { title, quantity } = req.body;
    const book = await Book.create({ title, quantity });
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
    const books = await Book.findAll();
    res.json({
      result: books,
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
  try {
    const { id_book } = req.params;
    const { title, quantity } = req.body;

    await Book.update({ title, quantity }, { where: { id: id_book } });

    const updatedBook = await Book.findOne({ where: { id: id_book } });

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
