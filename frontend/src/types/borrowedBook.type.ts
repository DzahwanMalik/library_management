export type BorrowedBook = {
  id: number;
  id_book: number;
  id_user: number;
  borrowed_at: Date;
  returned_at: Date | null;
  due_date: Date;
  status: "borrowed" | "returned" | "overdue";
  user: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    title: string;
    quantity: number;
  };
};
