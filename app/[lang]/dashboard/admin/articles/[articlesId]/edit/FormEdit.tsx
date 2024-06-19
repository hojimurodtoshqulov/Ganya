"use client";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageIcon, Link } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import BackLink from "@/components/dashboard/back-link";

interface Props {
  articleId?: string;
  defaultValues?: any;
  accessToken?: string;
  langue: any;
  lang: "uz" | "ru";
}

const schema = z.object({
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  headlineRu: z.string().min(1),
  headlineUz: z.string().min(1),
  textUz: z.string().min(1),
  textRu: z.string().min(1),
  link: z.string().min(1),
  articleImageWeb: z.union([z.string(), z.instanceof(FileList)]),
  articleImageMobile: z.union([z.string(), z.instanceof(FileList)]),
  imageWeb: z.union([z.string(), z.instanceof(FileList)]),
  imageMobile: z.union([z.string(), z.instanceof(FileList)]),
});

type Schema = z.infer<typeof schema>;

const FormEditArticle: FC<Props> = ({
  articleId,
  defaultValues,
  accessToken,
  langue,
  lang,
}) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const imageWeb: any = watch("imageWeb") && (watch("imageWeb")[0] ?? {});
  const imageMobile: any =
    watch("imageMobile") && (watch("imageMobile")[0] ?? {});
  const articleImageMobile: any =
    watch("articleImageMobile") && (watch("articleImageMobile")[0] ?? {});
  const articleImageWeb: any =
    watch("articleImageWeb") && (watch("articleImageWeb")[0] ?? {});

  async function onSubmit(data: Schema) {
    const formData = new FormData();

    if (typeof data.imageWeb !== "string") {
      formData.append("bannerImageWeb", imageWeb);
    }
    if (typeof data.imageMobile !== "string") {
      formData.append("bannerImageMobile", data.imageMobile[0]);
    }

    if (typeof data.articleImageMobile !== "string") {
      formData.append("articleImageMobile", articleImageMobile);
    }
    if (typeof data.articleImageWeb !== "string") {
      formData.append("articleImageWeb", articleImageWeb);
    }
    formData.append("titleRu", data.titleRu);
    formData.append("titleUz", data.titleUz);
    formData.append("headlineRu", data.headlineRu);
    formData.append("headlineUz", data.headlineUz);
    formData.append("textRu", data.textRu);
    formData.append("textUz", data.textUz);
    formData.append("link", data.link);

    const api =
      process.env.NEXT_PUBLIC_BASE_URL + `/articles/update/${articleId}`;

    try {
      const req = await fetch(api, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      });
      if (!req.ok) throw new Error(" article yangilashda muammo yuzaga keldi");

      const res = req.json();
      router.refresh();
      toast.success("Article Muvaffaqiyatli yaratildi");
      router.push("/dashboard/admin/articles/");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const DeleteFun = () => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + `/articles/remove/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
      },
    })
      .then((res) => res.text())
      .then(
        (res) => (
          toast.success("Article Muvaffaqiyatli O'chrildi"),
          router.push("/dashboard/admin/articles/")
        ),
      );
  };

  return (
    <div>
      <BackLink title={langue.dashboard.admin.articels.home.back} />
      <h2 className="text-[24px] leading-[36px] text-main-300">
        {`(${watch(lang === "ru" ? "textRu" : "textUz") ? watch(lang === "uz" ? "titleUz" : "titleRu") : `${langue.dashboard.admin.articels.home.defaulttext}`})`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-6 rounded-2xl mt-5 space-y-5">
          {/* <div
            className={cn(
              "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mb-4",
              { "border-destructive": errors?.imageMobile },
            )}
          >
            <div className="flex items-center">
              <div className="rounded-xl flex items-center gap-3 justify-center mr-8">
                <Image
                  src={defaultValues?.articleImage}
                  alt="images"
                  width={80}
                  height={80}
                  className="rounded w-[80px] h-[80px] object-cover"
                />
              </div>
              <div className="flex ml-3 flex-col gap-1">
                <h2 className="text-2xl font-normal">
                  {langue.dashboard.admin.articels.forms.image}
                </h2>
                <p className="text-base">
                  {langue.dashboard.admin.articels.forms.text}
                </p>
              </div>
            </div>
            <label className={buttonVariants({ variant: "filled" })}>
              {articleImage?.name
                ? `${langue.dashboard.admin.articels.forms.btn1}`
                : `${langue.dashboard.admin.articels.forms.btn}`}

              <Input
                type="file"
                accept="image/*"
                className="w-0 h-0 opacity-0 hidden"
                {...register("articleImage", { required: true })}
              />
            </label>
          </div> */}
          {/* article image */}
          <div
            className={cn(
              "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
              {
                "border-destructive":
                  errors.articleImageMobile || errors.articleImageWeb,
              },
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl flex items-center gap-3 justify-center mr-8">
                <Image
                  src={defaultValues?.articleImageMobile ?? ""}
                  alt="images"
                  width={80}
                  height={80}
                  className="rounded w-[80px] h-[80px] object-cover"
                />
                <Image
                  src={defaultValues?.articleImageWeb ?? ""}
                  alt="images"
                  width={80}
                  height={80}
                  className="rounded w-[80px] h-[80px] object-cover"
                />
              </div>
              <div className="text-2xl font-normal flex flex-col ">
                <h1>
                  {lang === "ru" ? "Обложка статьи" : "Maqolaning muqovasi"}
                </h1>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"filled"}>
                  {articleImageMobile?.name
                    ? `${langue.dashboard.admin.articels.forms.btn1}`
                    : `${langue.dashboard.admin.articels.forms.btn}`}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[650px] p-10">
                <div
                  className={cn(
                    "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
                    {
                      "border-destructive":
                        errors.articleImageMobile || errors.articleImageMobile,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <div className=" rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                      <ImageIcon />
                    </div>
                    <div className="flex ml-3 flex-col gap-1">
                      <h2 className="text-2xl font-normal">
                        {langue.dashboard.admin.articels.forms.banertel}
                      </h2>
                      {/* <p className="text-base">
                        {imageMobile
                          ? (imageMobile?.name as string)
                          : (lang === 'ru' ?"Выберите или перетащите обложку":"Choose or drag and drop the cover image")}
                      </p> */}
                    </div>
                  </div>
                  <label
                    className={buttonVariants({ variant: "filled" })}
                    htmlFor="file1"
                  >
                    {articleImageMobile?.name
                      ? `${langue.dashboard.admin.articels.forms.btn1}`
                      : `${langue.dashboard.admin.articels.forms.btn}`}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    id="file1"
                    {...register("articleImageMobile")}
                  />
                </div>
                <div
                  className={cn(
                    "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center ",
                    { "border-destructive": errors?.articleImageWeb },
                  )}
                >
                  <div className="flex items-center">
                    <div className="rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                      <ImageIcon />
                    </div>
                    <div className="flex ml-3 flex-col gap-1">
                      <h2 className="text-2xl font-normal">
                        {langue.dashboard.admin.articels.forms.banerwep}
                      </h2>
                      {/* <p className="text-base">
                        {imageWeb
                          ? (imageWeb?.name as string)
                          : "Выберите или перетащите обложку для курса"}
                      </p> */}
                    </div>
                  </div>
                  <label
                    className={buttonVariants({ variant: "filled" })}
                    htmlFor="file2"
                  >
                    {articleImageWeb?.name
                      ? `${langue.dashboard.admin.articels.forms.btn1}`
                      : `${langue.dashboard.admin.articels.forms.btn}`}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    {...register("articleImageWeb")}
                    id="file2"
                  />
                </div>

                <DialogClose asChild>
                  <Button variant={"main"}>
                    {langue.dashboard.admin.articels.forms.sent}
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>

          {/* banner image */}
          <div
            className={cn(
              "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
              { "border-destructive": errors.imageWeb || errors.imageMobile },
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl flex items-center gap-3 justify-center mr-8">
                <Image
                  src={defaultValues?.imageMobile}
                  alt="images"
                  width={80}
                  height={80}
                  className="rounded w-[80px] h-[80px] object-cover"
                />
                <Image
                  src={defaultValues?.imageWeb}
                  alt="images"
                  width={80}
                  height={80}
                  className="rounded w-[80px] h-[80px] object-cover"
                />
              </div>
              <div className="text-2xl font-normal flex flex-col ">
                <h1>{langue.dashboard.admin.articels.forms.baner}</h1>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"filled"}>
                  {imageMobile?.name
                    ? `${langue.dashboard.admin.articels.forms.btn1}`
                    : `${langue.dashboard.admin.articels.forms.btn}`}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[650px] p-10">
                <div
                  className={cn(
                    "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
                    {
                      "border-destructive":
                        errors.imageWeb || errors.imageMobile,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <div className=" rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                      <ImageIcon />
                    </div>
                    <div className="flex ml-3 flex-col gap-1">
                      <h2 className="text-2xl font-normal">
                        {langue.dashboard.admin.articels.forms.banertel}
                      </h2>
                      <p className="text-base">
                        {imageMobile
                          ? (imageMobile?.name as string)
                          : "Выберите или перетащите обложку для курса"}
                      </p>
                    </div>
                  </div>
                  <label
                    className={buttonVariants({ variant: "filled" })}
                    htmlFor="file1"
                  >
                    {imageMobile?.name
                      ? `${langue.dashboard.admin.articels.forms.btn1}`
                      : `${langue.dashboard.admin.articels.forms.btn}`}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    id="file1"
                    {...register("imageMobile")}
                  />
                </div>
                <div
                  className={cn(
                    "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center ",
                    { "border-destructive": errors?.imageWeb },
                  )}
                >
                  <div className="flex items-center">
                    <div className="rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                      <ImageIcon />
                    </div>
                    <div className="flex ml-3 flex-col gap-1">
                      <h2 className="text-2xl font-normal">
                        {langue.dashboard.admin.articels.forms.banerwep}
                      </h2>
                      <p className="text-base">
                        {imageWeb
                          ? (imageWeb?.name as string)
                          : "Выберите или перетащите обложку для курса"}
                      </p>
                    </div>
                  </div>
                  <label
                    className={buttonVariants({ variant: "filled" })}
                    htmlFor="file2"
                  >
                    {imageWeb?.name
                      ? `${langue.dashboard.admin.articels.forms.btn1}`
                      : `${langue.dashboard.admin.articels.forms.btn}`}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    {...register("imageWeb")}
                    id="file2"
                  />
                </div>
                <div className="relative">
                  <Link className="absolute top-[1.5rem] left-3" />
                  <Input
                    placeholder="Ссылка"
                    className="mt-4 pl-12"
                    {...register("link")}
                  />
                </div>
                <DialogClose asChild>
                  <Button variant={"main"}>
                    {langue.dashboard.admin.articels.forms.sent}
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">
              {langue.dashboard.admin.articels.forms.heading}
            </Label>
            <Input
              type="text"
              id="titleRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder1}
              className={cn({ "border-destructive": errors?.titleRu })}
              {...register("titleRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="titleRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder2}
              className={cn({ "border-destructive": errors?.titleUz })}
              {...register("titleUz", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">
              {langue.dashboard.admin.articels.forms.title}
            </Label>

            <Input
              type="text"
              id="headlineRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder3}
              className={cn({ "border-destructive": errors?.headlineUz })}
              {...register("headlineRu")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="headlineRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder4}
              className={cn({
                "border-destructive": errors?.headlineRu?.types,
              })}
              {...register("headlineUz", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={`textRu`}>
              {langue.dashboard.admin.articels.forms.desck}
            </Label>
            <Textarea
              id="textRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder5}
              className={cn(`placeholder:text-csneutral-400`, {
                "border-destructive": errors?.textRu,
              })}
              {...register("textRu")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Textarea
              id="textRu"
              placeholder={langue.dashboard.admin.articels.forms.plecholder6}
              className={cn(`placeholder:text-csneutral-400`, {
                "border-destructive": errors?.textUz,
              })}
              {...register("textUz")}
            />
          </div>

          <div className="flex sm:justify-end mt-5 justify-center gap-3">
            <Button
              onClick={DeleteFun}
              disabled={isSubmitting}
              variant={"main"}
              className="bg-red-500 hover:bg-red-400 transition-colors"
            >
              {langue.dashboard.admin.articels.forms.delete}
            </Button>
            <Button disabled={isSubmitting} type="submit" variant={"main"}>
              {langue.dashboard.admin.articels.forms.sent}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditArticle;
