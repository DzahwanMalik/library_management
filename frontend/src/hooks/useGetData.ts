import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import type { User } from "../types/user.type";
import type { Book } from "../types/book.type";
import type { BorrowedBook } from "../types/borrowedBook.type";
import type { DataResponse } from "../types/dataResponse.type";

const useGetData = () => {
  const [userData, setUserData] = useState<DataResponse<User> | null>(null);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [bookData, setBookData] = useState<DataResponse<Book> | null>(null);
  const [bookDetail, setBookDetail] = useState<Book | null>(null);
  const [borrowedData, setBorrowedData] =
    useState<DataResponse<BorrowedBook> | null>(null);

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

  const getUsers = async (page: number, search?: string) => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/users", {
        params: { search, page },
      });
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
      setUserDetail(response.data.result);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getBooks = async (page: number, search?: string) => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/books", {
        params: { page, search },
      });
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
      setBookDetail(response.data.result);
      setGetSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    } finally {
      setGetLoading(false);
    }
  };

  const getBorrowedBooks = async (page: number, search?: string) => {
    try {
      setGetLoading(true);
      const response = await axiosInstance.get("/borrowedBooks", {
        params: { page, search },
      });
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
    userDetail,
    bookData,
    bookDetail,
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
