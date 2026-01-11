import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import type { User } from "../types/user.type";
import type { Book } from "../types/book.type";
import type { BorrowedBook } from "../types/borrowedBook.type";

const useGetData = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [bookData, setBookData] = useState<Book[]>([]);
  const [borrowedData, setBorrowedData] = useState<BorrowedBook[]>([]);

  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [getSuccess, setGetSuccess] = useState<string | null>(null);
  const [getError, setGetError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGetSuccess(null);
      setGetError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [getSuccess, getError]);

  const handleError = (error: any) => {
    console.error("Error getting data:", error);
    setGetError(
      "Gagal mengambil data" +
        (error.response?.data?.message
          ? `: ${error.response.data.message}`
          : "")
    );
  };

  const getUsers = async () => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/users");
      setUserData(response.data.result);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getUser = async (userId: number) => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get(`/user/${userId}`);
      setUserData([response.data.result]);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getBooks = async () => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/books");
      setBookData(response.data.result);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getBook = async (bookId: number) => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get(`/book/${bookId}`);
      setBookData([response.data.result]);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getBorrowedBooks = async () => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/borrowedBooks");
      setBorrowedData(response.data.result);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  return {
    userData,
    bookData,
    borrowedData,
    getLoading,
    getSuccess,
    getError,
    getUsers,
    getUser,
    getBooks,
    getBook,
    getBorrowedBooks,
  };
};

export default useGetData;
