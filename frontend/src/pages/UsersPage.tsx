import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import useGetData from "../hooks/useGetData";
import useRemoveData from "../hooks/useRemoveData";
import Table from "../components/organisms/Table";
import Alert from "../components/atoms/Alert";
import SearchInput from "../components/atoms/searchInput";
import PaginationButton from "../components/atoms/PaginationButton";

const UsersPage = () => {
  const [page, setPage] = useState<number>(1);
  const { register, watch, reset } = useForm();
  const searchValue = watch("search");

  let navigate = useNavigate();

  const { userData, getUsers, getError } = useGetData();
  const { removeUser, removeSuccess, removeError, removeLoading } =
    useRemoveData();

  useEffect(() => {
    getUsers(page, searchValue);
  }, [page, searchValue]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await removeUser(id);
      getUsers(page, searchValue);
      reset({
        search: "",
      });
    }
  };

  return (
    <>
      {getError && <Alert variant="error" message={getError} />}
      {removeSuccess && <Alert variant="success" message={removeSuccess} />}
      {removeError && <Alert variant="error" message={removeError} />}
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 flex-col items-start md:justify-between md:flex-row">
          <SearchInput {...register("search")} />
          <button
            onClick={() => navigate(`add`)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="size-5" /> <span>Tambah Data</span>
          </button>
        </div>
        <Table
          columns={["ID", "Name", "Actions"]}
          data={
            <>
              {userData?.data.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td className="w-full">{user.name}</td>
                  <td className="flex gap-4">
                    <button
                      onClick={() => navigate(`edit/${user.id}`)}
                      className="btn btn-soft"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-soft btn-error"
                    >
                      {removeLoading ? "Menghapus" : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
            </>
          }
        />
        <div className="flex justify-between items-center">
          <p className="text-base">
            Page {userData?.pagination.currentPage} of{" "}
            {userData?.pagination.totalPage}
          </p>
          <PaginationButton
            pagination={userData?.pagination}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
