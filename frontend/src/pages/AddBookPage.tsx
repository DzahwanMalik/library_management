import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddData from "../hooks/useAddData";
import Alert from "../components/atoms/Alert";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  title: z.string().min(5, "Mimimal 5 karakter"),
  quantity: z.coerce.number().min(1, "Minimal 1 buku"),
  image: z
    .custom<FileList>()
    .refine((fileList) => fileList.length > 0, "Expected File")
    .transform((file) => file[0] as File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Tipe file harus jpg, jpeg, atau png",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran file maksimal 5MB"),
});

type FormData = z.infer<typeof schema>;

const AddBookPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const { addBook, addSuccess, addError, addLoading } = useAddData();

  const onSubmit = async (data: FormData) => {
    await addBook(data.title, data.quantity, data.image);
    reset();
  };

  return (
    <>
      {addSuccess && <Alert variant="success" message={addSuccess} />}
      {addError && <Alert variant="error" message={addError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Judul</legend>
            <input
              {...register("title")}
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
            {formState.errors.title && (
              <p className="text-sm text-error mt-1 label">
                {formState.errors.title.message}
              </p>
            )}
          </fieldset>
        </label>
        <label>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Jumlah</legend>
            <input
              {...register("quantity")}
              type="number"
              className="input w-full"
              placeholder="Type here"
            />
            {formState.errors.quantity && (
              <p className="text-sm text-error mt-1 label">
                {formState.errors.quantity.message}
              </p>
            )}
          </fieldset>
        </label>
        <label>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Cover</legend>
            <input {...register("image")} type="file" className="file-input" />
            {formState.errors.image && (
              <p className="text-sm text-error mt-1 label">
                {formState.errors.image.message}
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

export default AddBookPage;
