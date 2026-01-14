import type { DataResponse } from "../../types/dataResponse.type";
import type { Book } from "../../types/book.type";
import type { User } from "../../types/user.type";

type StatProps = {
  bookData: DataResponse<Book> | null;
  userData: DataResponse<User> | null;
};

const Stat = ({ bookData, userData }: StatProps) => {
  return (
    <div className="w-full text-center stats stats-vertical lg:stats-horizontal shadow">
      <div className="stat">
        <div className="stat-title">Total Buku</div>
        <div className="stat-value">{bookData?.totalData}</div>
        <div className="stat-desc">Dimiliki</div>
      </div>

      <div className="stat">
        <div className="stat-title">Total Anggota</div>
        <div className="stat-value">{userData?.totalData}</div>
        <div className="stat-desc">Terdaftar</div>
      </div>
    </div>
  );
};

export default Stat;
