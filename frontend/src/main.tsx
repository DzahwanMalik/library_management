import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/global.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";
import HistoryPage from "./pages/HistoryPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="users" element={<UsersPage />} />
          <Route path="users/add" element={<AddUserPage />} />
          <Route path="users/edit/:id" element={<EditUserPage />} />

          <Route path="books" element={<BooksPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
