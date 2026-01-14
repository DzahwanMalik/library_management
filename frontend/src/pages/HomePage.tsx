import { useEffect, useState } from "react";
import Stat from "../components/organisms/Stat";
import useGetData from "../hooks/useGetData";
import Table from "../components/organisms/Table";
import formattedDate from "../utils/formatDate";
import useReturnBook from "../hooks/useReturnBook";
import SearchInput from "../components/atoms/searchInput";
import Alert from "../components/atoms/Alert";
import { useForm } from "react-hook-form";
import PaginationButton from "../components/atoms/PaginationButton";

const HomePage = () => {
  const { register, watch } = useForm();
  const [page, setPage] = useState<number>(1);
  const searchValue = watch("search");

  const {
    getBooks,
    getUsers,
    getOverdueBooks,
    bookData,
    userData,
    overdueData,
  } = useGetData();

  const { returnBook, returnLoading, returnSuccess, returnError } =
    useReturnBook();

  const handleReturn = async (
    id_book: number,
    id_user: number,
    returned_at: Date
  ) => {
    await returnBook(id_book, id_user, returned_at);
    getOverdueBooks(page, searchValue);
  };

  useEffect(() => {
    getBooks(1, "");
    getUsers(1, "");
  }, []);

  useEffect(() => {
    getOverdueBooks(page, searchValue);
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  return (
    <>
      {returnSuccess && <Alert variant="success" message={returnSuccess} />}
      {returnError && <Alert variant="error" message={returnError} />}
      <div className="flex flex-col gap-5">
        <Stat bookData={bookData} userData={userData} />
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
              {overdueData?.data.map((overdue: any) => (
                <tr key={overdue.id}>
                  <th>{overdue.id}</th>
                  <td>{overdue.user.name}</td>
                  <td>{overdue.book.title}</td>
                  <td>{formattedDate(overdue.borrowed_at)}</td>
                  <td>
                    {overdue.returned_at
                      ? formattedDate(overdue.returned_at)
                      : '"Belum Dikembalikan"'}
                  </td>
                  <td>{formattedDate(overdue.due_date)}</td>
                  <td>
                    {
                      <div
                        className={`badge badge-soft ${
                          overdue.status === "returned"
                            ? "badge-success"
                            : overdue.status === "overdue"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {overdue.status.charAt(0).toUpperCase() +
                          overdue.status.slice(1)}
                      </div>
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm md:btn-md"
                      disabled={overdue.status === "returned"}
                      onClick={() => {
                        handleReturn(
                          overdue.book.id,
                          overdue.user.id,
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
            Page {overdueData?.pagination.currentPage} of{" "}
            {overdueData?.pagination.totalPage}
          </p>
          <PaginationButton
            pagination={overdueData?.pagination}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
