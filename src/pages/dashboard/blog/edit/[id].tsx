import { getToken, isJwtValid } from "@/configs";
import { IsUserAuthorized } from "@/contexts/users";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/loadings";
import RichInput from "@/components/elements/rich-input/richInput";
import "react-quill/dist/quill.snow.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import {
  IoDocument,
  IoImage,
  IoKey,
  IoPricetags,
  IoReader,
  IoSendSharp,
  IoTimer,
} from "react-icons/io5";
import { publishPatch } from "@/services/patch";
import Select from "react-select";
import { customStyles } from "@/styles";
import { NewPostValues, blogTags } from "@/models/blogs";
import { useQuery } from "react-query";
import { getPostById } from "@/services/get";

export default function NewPost() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPostValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [isUserAuthorized, setIsUserAuthorized] = useAtom(IsUserAuthorized);
  const router = useRouter();

  useEffect(() => {
    Promise.resolve().then(async () => {
      if (!(await isJwtValid(getToken()))) {
        router.push("/login");
        return;
      }

      setIsUserAuthorized(true);
    });
  }, []);

  const { id } = router.query;

  const {
    data,
    status,
    isLoading: isQueryLoading,
  } = useQuery(["post", id], () => getPostById(id as string));

  if (!isUserAuthorized || isQueryLoading) {
    return <Loading />;
  }

  const onSubmit: SubmitHandler<NewPostValues> = async (formData) => {
    if (
      (!formData.tags || formData.tags.length < 1) &&
      data &&
      data.tags.length > 0
    ) {
      formData.tags = data.tags;
    }

    setIsLoading(true);
    const response = await publishPatch(formData);

    if (response.statusCode === 200) {
      enqueueSnackbar("Post editado com sucesso!", { variant: "success" });
      setDisabledButton(true);
      setIsLoading(false);

      router.push("/dashboard/blog");
      return;
    }

    enqueueSnackbar("Erro ao cadastrar post!", { variant: "error" });
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title> Dashboard editar postagem • Takedi</title>
        <meta
          name="description"
          content="Editar postagem referente ao blog."
          key="desc"
        />
      </Head>
      <main className="main-default 2xs:p-2 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Editar postagem</h1>
        {status === "success" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mt-4">
              <label htmlFor="post-friendly-id">
                <IoKey
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <input
                type="text"
                id="post-friendly-id"
                defaultValue={data.friendlyId}
                placeholder="ID amigável"
                {...register("friendlyId", {
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                  maxLength: {
                    value: 155,
                    message: "Máximo de 155 caracteres",
                  },
                })}
                className="p-2 rounded-r-lg h-12 outline-none text-lg text-dark-blue w-full"
              />
            </div>
            {errors.friendlyId && (
              <span className="mt-2 text-red font-semibold">
                {errors.friendlyId.message}
              </span>
            )}

            <div className="flex mt-4">
              <label htmlFor="post-thumbnail">
                <IoImage
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <input
                type="text"
                id="post-thumbnail"
                placeholder="Link da thumbnail"
                defaultValue={data.thumbnail}
                {...register("thumbnail", {
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                  maxLength: {
                    value: 355,
                    message: "Máximo de 355 caracteres",
                  },
                })}
                className="p-2 rounded-r-lg h-12 outline-none text-lg text-dark-blue w-full"
              />
            </div>
            {errors.thumbnail && (
              <span className="mt-2 text-red font-semibold">
                {errors.thumbnail.message}
              </span>
            )}

            <div className="flex mt-4">
              <label htmlFor="post-title">
                <IoDocument
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <input
                type="text"
                id="post-title"
                placeholder="Título da postagem"
                defaultValue={data.title}
                {...register("title", {
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                  maxLength: {
                    value: 355,
                    message: "Máximo de 355 caracteres",
                  },
                })}
                className="p-2 rounded-r-lg h-12 outline-none text-lg text-dark-blue w-full"
              />
            </div>
            {errors.title && (
              <span className="mt-2 text-red font-semibold">
                {errors.title.message}
              </span>
            )}

            <div className="flex mt-4">
              <label htmlFor="post-description">
                <IoReader
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <input
                type="text"
                id="post-description"
                placeholder="Descrição da postagem"
                defaultValue={data.description}
                {...register("description", {
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                  maxLength: {
                    value: 355,
                    message: "Máximo de 355 caracteres",
                  },
                })}
                className="p-2 rounded-r-lg h-12 outline-none text-lg text-dark-blue w-full"
              />
            </div>
            {errors.description && (
              <span className="mt-2 text-red font-semibold">
                {errors.description.message}
              </span>
            )}

            <div className="flex mt-4">
              <label htmlFor="post-time-to-read">
                <IoTimer
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <input
                type="number"
                id="post-time-to-read"
                placeholder="Tempo de leitura em minutos"
                defaultValue={data.timeToRead}
                {...register("timeToRead", {
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 1, message: "Mínimo de 1 caracteres" },
                  maxLength: { value: 2, message: "Máximo de 2 caracteres" },
                })}
                className="p-2 rounded-r-lg h-12 outline-none text-lg text-dark-blue w-full"
              />
            </div>
            {errors.timeToRead && (
              <span className="mt-2 text-red font-semibold">
                {errors.timeToRead.message}
              </span>
            )}

            <div className="flex w-full mt-4">
              <label htmlFor="post-tags">
                <IoPricetags
                  size={32}
                  className=" w-12 text-dark-blue bg-white p-3 rounded-l-lg h-12"
                />
              </label>
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, value } }) => (
                  <Select
                    id="post-tags"
                    placeholder="Tags"
                    noOptionsMessage={() => "Nenhuma opção"}
                    closeMenuOnSelect={false}
                    isMulti
                    styles={customStyles}
                    options={blogTags}
                    defaultValue={data.tags.map((tag) => {
                      const findIndex = blogTags.findIndex(
                        (item) => item.value === tag
                      );
                      return blogTags[findIndex];
                    })}
                    onChange={(e) => onChange(e.map((item) => item.value))}
                  />
                )}
              />
              {errors.tags && (
                <span className="mt-2 text-red font-semibold">
                  {errors.tags.message}
                </span>
              )}
            </div>
            {errors.tags && (
              <span className="mt-2 text-red font-semibold">
                {errors.tags.message}
              </span>
            )}

            <div className="mt-4">
              <Controller
                control={control}
                name="content"
                rules={{
                  required: { value: true, message: "Campo obrigatório" },
                  minLength: { value: 10, message: "Mínimo de 10 caracteres" },
                }}
                render={({ field: { onChange, value } }) => (
                  <RichInput
                    onChange={(e) => onChange(e)}
                    value={value ? value : data.content}
                  />
                )}
              />
              {errors.content && (
                <span className="mt-2 text-red font-semibold">
                  {errors.content.message}
                </span>
              )}
            </div>
            <div className="w-full flex justify-end items-end">
              <button
                type="submit"
                disabled={disabledButton}
                name="submit-contact-form"
                className="button-global bg-soft-blue w-44"
              >
                {isLoading ? (
                  <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:blue"></div>
                ) : (
                  <>
                    <IoSendSharp size={22} className="mr-2" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
