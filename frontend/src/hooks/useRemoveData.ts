import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useRemoveData = () => {
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [removeSuccess, setRemoveSuccess] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemoveSuccess(null);
      setRemoveError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [removeSuccess, removeError]);

  const handleError = (error: any) => {
    console.error("Error removing data:", error);
    setRemoveError(
      "Gagal menghapus data" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const removeUser = async (userId: number) => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete(`/user/${userId}`);
      setRemoveSuccess(response.data.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const removeBook = async (bookId: number) => {
    try {
      setRemoveLoading(true);
      const response = await axiosInstance.delete(`/book/${bookId}`);
      setRemoveSuccess(response.data.message);
    } catch (error: any) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return { removeLoading, removeError, removeSuccess, removeUser, removeBook };
};

export default useRemoveData;
