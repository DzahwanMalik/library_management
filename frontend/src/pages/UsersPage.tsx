import { useEffect } from "react";
import { useNavigate } from "react-router";
import useGetData from "../hooks/useGetData";
import Table from "../components/organisms/Table";
import SearchInput from "../components/atoms/searchInput";
import { Plus } from "lucide-react";
import useRemoveData from "../hooks/useRemoveData";
import { useForm } from "react-hook-form";
import Alert from "../components/atoms/Alert";

const UsersPage = () => {
  const { register, watch } = useForm();
  const searchValue = watch("search");

  let navigate = useNavigate();

  const { userData, getUsers, getError } = useGetData();
  const { removeUser, removeSuccess, removeError, removeLoading } =
    useRemoveData();

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await removeUser(id);
      getUsers();
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
              {filteredUsers.map((user) => (
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
      </div>
    </>
  );
};

export default UsersPage;
