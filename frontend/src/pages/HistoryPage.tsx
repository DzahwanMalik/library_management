import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/organisms/Table";
import useGetData from "../hooks/useGetData";
import formattedDate from "../utils/formatDate";
import SearchInput from "../components/atoms/searchInput";
import PaginationButton from "../components/atoms/PaginationButton";
import useReturnBook from "../hooks/useReturnBook";
import Alert from "../components/atoms/Alert";

const HistoryPage = () => {
  const [page, setPage] = useState<number>(1);
  const { register, watch } = useForm();
  const searchValue = watch("search");

  const { getBorrowedBooks, borrowedData } = useGetData();
  const { returnBook, returnLoading, returnSuccess, returnError } =
    useReturnBook();

  useEffect(() => {
    getBorrowedBooks(page, searchValue);
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handleReturn = async (
    id_book: number,
    id_user: number,
    returned_at: Date
  ) => {
    await returnBook(id_book, id_user, returned_at);
    getBorrowedBooks(page, searchValue);
  };

  return (
    <>
      {returnSuccess && <Alert variant="success" message={returnSuccess} />}
      {returnError && <Alert variant="error" message={returnError} />}
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 flex-col items-start md:justify-between md:flex-row">
          <SearchInput {...register("search")} />
        </div>
        <Table
          columns={[
            "ID",
            "Nama",
            "Meminjam",
            "Tanggal Meminjam",
            "Dikembalikan Pada",
            "Batas Waktu",
            "Status",
            "Aksi",
          ]}
          data={
            <>
              {borrowedData?.data.map((borrowed) => (
                <tr key={borrowed.id}>
                  <th>{borrowed.id}</th>
                  <td>{borrowed.user.name}</td>
                  <td>{borrowed.book.title}</td>
                  <td>{formattedDate(borrowed.borrowed_at)}</td>
                  <td>
                    {borrowed.returned_at
                      ? formattedDate(borrowed.returned_at)
                      : '"Belum Dikembalikan"'}
                  </td>
                  <td>{formattedDate(borrowed.due_date)}</td>
                  <td>
                    {
                      <div
                        className={`badge badge-soft ${
                          borrowed.status === "returned"
                            ? "badge-success"
                            : borrowed.status === "overdue"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {borrowed.status.charAt(0).toUpperCase() +
                          borrowed.status.slice(1)}
                      </div>
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm md:btn-md"
                      disabled={borrowed.status === "returned"}
                      onClick={() => {
                        handleReturn(
                          borrowed.book.id,
                          borrowed.user.id,
                          new Date()
                        );
                      }}
                    >
                      {returnLoading ? "Loading..." : "Kembalikan"}
                    </button>
                  </td>
                </tr>
              ))}
            </>
          }
        />
        <div className="flex justify-between items-center">
          <p className="text-base">
            Page {borrowedData?.pagination.currentPage} of{" "}
            {borrowedData?.pagination.totalPage}
          </p>
          <PaginationButton
            pagination={borrowedData?.pagination}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
