import { useEffect } from "react";
import Table from "../components/organisms/Table";
import useGetData from "../hooks/useGetData";
import SearchInput from "../components/atoms/searchInput";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useRemoveData from "../hooks/useRemoveData";

const BooksPage = () => {
  const { register, watch } = useForm();
  const searchValue = watch("search");

  const navigate = useNavigate();

  const { bookData, getBooks } = useGetData();
  const { removeBook } = useRemoveData();

  const filteredBooks = bookData.filter((book) =>
    book.title.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      removeBook(id);
      getBooks();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 flex-col items-start md:justify-between md:flex-row">
        <SearchInput {...register("search")} />
        <button
          onClick={() => navigate(`add`)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="size-5" /> <span>Tambah Data</span>
        </button>
      </div>
      <Table
        columns={["ID", "Title", "Quantity", "Actions"]}
        data={
          <>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <th>{book.id}</th>
                <td className="w-full">{book.title}</td>
                <td>{book.quantity}</td>
                <td className="flex gap-4">
                  <button
                    onClick={() => navigate(`edit/${book.id}`)}
                    className="btn btn-soft"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-soft btn-error"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};

export default BooksPage;
