import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddData from "../hooks/useAddData";
import Alert from "../components/atoms/Alert";

const schema = z.object({
  name: z.string().min(5, "Mimimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

const AddUserPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { addUser, addSuccess, addError, addLoading } = useAddData();

  const onSubmit = async (data: FormData) => {
    await addUser(data.name);
    reset();
  };

  return (
    <>
      {addSuccess && <Alert variant="success" message={addSuccess} />}
      {addError && <Alert variant="error" message={addError} />}
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
          {addLoading ? "Loading..." : "Tambahkan"}
        </button>
      </form>
    </>
  );
};

export default AddUserPage;
