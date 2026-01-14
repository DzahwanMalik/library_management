import type { Pagination } from "./Pagination.type";

export type DataResponse<T> = {
  data: T[];
  pagination: Pagination;
};
