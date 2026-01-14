import type { Book } from "../../types/book.type";

type Props = {
  book: Book;
  handleBorrow: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
};

const BookCard = ({ book, handleBorrow, handleDelete, handleEdit }: Props) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure className="w-full bg-gray-200">
        {book.image_url && (
          <img
            src={book.image_url}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p>Jumlah : {book.quantity}</p>
        <div className="card-actions justify-end mt-10">
          <button
            onClick={handleBorrow}
            className="w-full btn btn-soft btn-primary btn-sm"
          >
            Pinjamkan
          </button>
          <button
            onClick={handleEdit}
            className="w-full btn btn-soft btn-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full btn btn-soft btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
