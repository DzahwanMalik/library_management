import { useState } from "react";
import axiosInstance from "../lib/axios";

const useUpdateData = () => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.error("Error updating data:", error);
    setUpdateError(
      "Gagal memperbarui data" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const updateUser = async (id: number, name: string) => {
    try {
      setUpdateLoading(true);
      const response = await axiosInstance.patch(`/user/${id}`, { name });
      setUpdateSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const updateBook = async (id: number, title: string, quantity: number) => {
    try {
      setUpdateLoading(true);
      const response = await axiosInstance.patch(`/book/${id}`, {
        title,
        quantity,
      });
      setUpdateSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    updateLoading,
    updateSuccess,
    updateError,
    updateUser,
    updateBook,
  };
};

export default useUpdateData;
