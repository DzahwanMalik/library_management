import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(5, "Mimimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

const AddUserPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
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
      <button className="btn btn-primary">Tambahkan</button>
    </form>
  );
};

export default AddUserPage;
