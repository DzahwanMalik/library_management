import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useReturnBook = () => {
  const [returnSuccess, setReturnSuccess] = useState<boolean | null>(null);
  const [returnError, setReturnError] = useState<string | null>(null);
  const [returnLoading, setReturnLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReturnSuccess(null);
      setReturnError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [returnSuccess, returnError]);

  const handleError = (error: any) => {
    console.error("Error returning book:", error);
    setReturnError(
      "Gagal mengembalikan buku" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const returnBook = async (
    id_book: number,
    id_user: number,
    returned_at: Date,
    status: string
  ) => {
    try {
      setReturnLoading(true);
      const response = await axiosInstance.patch(
        `/borrowedBook/${id_book}/${id_user}`,
        {
          returned_at,
          status,
        }
      );
      setReturnSuccess(response.data.success);
    } catch (error) {
      handleError(error);
    } finally {
      setReturnLoading(false);
    }
  };

  return { returnSuccess, returnError, returnLoading, returnBook };
};

export default useReturnBook;
