import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Alert from "../components/atoms/Alert";
import useUpdateData from "../hooks/useUpdateData";
import { useParams } from "react-router";
import useGetData from "../hooks/useGetData";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(5, "Mimimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

const EditUserPage = () => {
  const USER_ID = useParams().id;

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { userData, getUser, getError } = useGetData();
  const { updateUser, updateSuccess, updateError, updateLoading } =
    useUpdateData();

  const onSubmit = (data: FormData) => {
    updateUser(Number(USER_ID), data.name);
    reset({
      name: data.name,
    });
  };

  useEffect(() => {
    getUser(Number(USER_ID));
  }, []);

  useEffect(() => {
    reset({
      name: userData[0]?.name,
    });
  }, [userData]);

  return (
    <>
      {updateSuccess && <Alert variant="success" message={updateSuccess} />}
      {updateError && <Alert variant="error" message={updateError} />}
      {getError && <Alert variant="error" message={getError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Nama Lengkap</legend>
            <input
              {...register("name")}
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
            {formState.errors.name && (
              <p className="text-sm text-error mt-1 label">
                {formState.errors.name.message}
              </p>
            )}
          </fieldset>
        </label>
        <button className="btn btn-primary">
          {updateLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default EditUserPage;
