import Book from "./book.model.js";
import User from "./user.model.js";
import BorrowedBook from "./borrowed_book.model.js";

Book.hasMany(BorrowedBook, {
  foreignKey: "id_book",
  onDelete: "CASCADE",
});

User.hasMany(BorrowedBook, {
  foreignKey: "id_user",
  onDelete: "CASCADE",
});

BorrowedBook.belongsTo(Book, { foreignKey: "id_book" });
BorrowedBook.belongsTo(User, { foreignKey: "id_user" });

export { Book, User, BorrowedBook };
