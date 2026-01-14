import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import SearchInput from "../components/atoms/searchInput";
import useGetData from "../hooks/useGetData";
import useRemoveData from "../hooks/useRemoveData";
import PaginationButton from "../components/atoms/PaginationButton";
import Alert from "../components/atoms/Alert";
import BookCard from "../components/molecules/BookCard";

const BooksPage = () => {
  const [page, setPage] = useState<number>(1);
  const { register, watch, reset } = useForm();
  const searchValue = watch("search");

  const navigate = useNavigate();

  const { bookData, getBooks } = useGetData();
  const { removeBook, removeSuccess, removeError } = useRemoveData();

  useEffect(() => {
    getBooks(page, searchValue);
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await removeBook(id);
      getBooks(page, searchValue);
      reset({
        search: "",
      });
    }
  };

  return (
    <>
      {removeSuccess && <Alert variant="success" message={removeSuccess} />}
      {removeError && <Alert variant="error" message={removeError} />}
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
        <div className="min-h-screen">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-5">
            {bookData?.data.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                handleBorrow={() => navigate(`borrow/${book.id}`)}
                handleDelete={() => handleDelete(book.id)}
                handleEdit={() => navigate(`edit/${book.id}`)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base">
            Page {bookData?.pagination.currentPage} of{" "}
            {bookData?.pagination.totalPage}
          </p>
          <PaginationButton
            pagination={bookData?.pagination}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default BooksPage;
