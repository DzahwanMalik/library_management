import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import z from "zod";
import useGetData from "../hooks/useGetData";
import { useEffect, useState } from "react";
import useBorrowBook from "../hooks/useBorrowBook";
import Alert from "../components/atoms/Alert";

const schema = z.object({
  id_book: z.coerce.number(),
  id_user: z.coerce.number(),
  due_date: z.coerce.date(),
});

type FormData = z.infer<typeof schema>;

const BorrowBookPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const { getUsers, userData } = useGetData();
  const { borrowBook, borrowLoading, borrowSuccess, borrowError } =
    useBorrowBook();

  const ID_BOOK = useParams().id;

  const onSubmit = (data: FormData) => {
    borrowBook(data.id_book, data.id_user, data.due_date);
    console.log(data);
  };

  useEffect(() => {
    getUsers(1, searchValue);
  }, [searchValue]);

  return (
    <>
      {borrowSuccess && <Alert variant="success" message={borrowSuccess} />}
      {borrowError && <Alert variant="error" message={borrowError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pilih Peminjam</legend>
          <span className="relative">
            <label className="input mb-4">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Cari peminjam"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>
            <select
              className="select w-full"
              {...register("id_user")}
              defaultValue={"Pilih Peminjam"}
            >
              <option disabled>
                Pilih Peminjam
              </option>
              {userData?.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </span>
        </fieldset>
        <fieldset className="fieldset hidden">
          <legend className="fieldset-legend">ID Buku</legend>
          <span className="relative">
            <input
              {...register("id_book")}
              type="number"
              className="input w-full"
              value={ID_BOOK}
              disabled
            />
          </span>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Batas Meminjam</legend>
          <span className="relative">
            <input
              {...register("due_date")}
              type="date"
              className="input w-full"
            />
          </span>
        </fieldset>
        <button type="submit" className="btn btn-primary mt-5">
          {borrowLoading ? "Loading..." : "Pinjamkan!"}
        </button>
      </form>
    </>
  );
};

export default BorrowBookPage;
