import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/organisms/Table";
import useGetData from "../hooks/useGetData";
import formattedDate from "../utils/formatDate";
import SearchInput from "../components/atoms/searchInput";

const HistoryPage = () => {
  const { register, watch } = useForm();
  const searchValue = watch("search");

  const { getBorrowedBooks, borrowedData } = useGetData();
  const filteredBorrowed = borrowedData.filter((borrowed) =>
    (borrowed.user.name || borrowed.book.title || borrowed.status)
      .toLowerCase()
      .includes(searchValue?.toLowerCase() || "")
  );

  useEffect(() => {
    getBorrowedBooks();
  }, []);

  return (
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
        ]}
        data={
          <>
            {filteredBorrowed.map((borrowed) => (
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
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};

export default HistoryPage;
