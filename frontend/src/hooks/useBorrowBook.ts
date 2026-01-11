import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useBorrowBook = () => {
  const [borrowLoading, setBorrowLoading] = useState<boolean>(false);
  const [borrowSuccess, setBorrowSuccess] = useState<string | null>(null);
  const [borrowError, setBorrowError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBorrowSuccess(null);
      setBorrowError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [borrowSuccess, borrowError]);

  const handleError = (error: any) => {
    console.error("Error borrowing book:", error);
    setBorrowError(
      "Gagal meminjam buku" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const borrowBook = async (
    id_book: number,
    id_user: number,
    borrowed_at: Date,
    returned_at: Date,
    due_date: Date,
    status: string
  ) => {
    try {
      setBorrowLoading(true);
      const response = await axiosInstance.post("/borrowedBook", {
        id_book,
        id_user,
        borrowed_at,
        returned_at,
        due_date,
        status,
      });
      setBorrowSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setBorrowLoading(false);
    }
  };

  return { borrowLoading, borrowSuccess, borrowError, borrowBook };
};

export default useBorrowBook;
