import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useAddData = () => {
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddSuccess(null);
      setAddError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [addSuccess, addError]);

  const handleError = (error: any) => {
    console.error("Error adding data:", error);
    setAddError(
      "Gagal menambahkan data" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const addUser = async (name: string) => {
    try {
      setAddLoading(true);
      const response = await axiosInstance.post("/user", { name });
      setAddSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  const addBook = async (title: string, quantity: number, image: File) => {
    try {
      setAddLoading(true);
      const response = await axiosInstance.post(
        "/book",
        {
          title,
          quantity,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAddSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  return {
    addLoading,
    addSuccess,
    addError,
    addUser,
    addBook,
  };
};

export default useAddData;
