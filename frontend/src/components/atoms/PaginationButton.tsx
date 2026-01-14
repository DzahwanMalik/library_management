import type { Pagination } from "../../types/Pagination.type";

type PaginationButtonProps = {
  pagination: Pagination | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationButton = ({ pagination, setPage }: PaginationButtonProps) => {
  return (
    <div className="join grid grid-cols-2 w-fit">
      <button
        onClick={() => setPage((prevPage) => prevPage - 1)}
        className={`join-item btn ${
          pagination?.currentPage == 1 && "btn-disabled"
        }`}
      >
        Prev
      </button>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className={`join-item btn ${
          pagination?.totalPage == pagination?.currentPage && "btn-disabled"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
