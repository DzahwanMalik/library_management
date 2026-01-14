import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Alert from "../components/atoms/Alert";
import useUpdateData from "../hooks/useUpdateData";
import useGetData from "../hooks/useGetData";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const schema = z.object({
  title: z.string().min(5, "Mimimal 5 karakter"),
  quantity: z.coerce.number().min(1, "Minimal 1 buku"),
  image: z
    .custom<FileList>()
    .optional()
    .transform((fileList) =>
      fileList && fileList.length > 0 ? (fileList[0] as File) : undefined
    )
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Tipe file harus jpg, jpeg, atau png",
    })
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Ukuran file maksimal 5MB"
    ),
});

type FormData = z.infer<typeof schema>;

const EditBookPage = () => {
  const BOOK_ID = useParams().id;

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const { bookDetail, getBook, getError } = useGetData();
  const { updateBook, updateSuccess, updateError, updateLoading } =
    useUpdateData();

  const onSubmit = (data: FormData) => {
    updateBook(Number(BOOK_ID), data.title, data.quantity, data.image);
    reset({
      title: data.title,
    });
  };

  useEffect(() => {
    getBook(Number(BOOK_ID));
  }, []);

  useEffect(() => {
    reset({
      title: bookDetail?.title,
      quantity: bookDetail?.quantity,
    });
  }, [bookDetail]);

  return (
    <>
      {updateSuccess && <Alert variant="success" message={updateSuccess} />}
      {updateError && <Alert variant="error" message={updateError} />}
      {getError && <Alert variant="error" message={getError} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Judul Buku</legend>
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
              {...register("quantity", { valueAsNumber: true })}
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
          {updateLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default EditBookPage;
