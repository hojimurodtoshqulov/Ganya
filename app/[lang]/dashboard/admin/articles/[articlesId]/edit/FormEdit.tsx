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
import { any, z } from "zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Props {
  articleId?: string;
  defaultValues?: any;
}

const schema = z.object({
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  headlineRu: z.string().min(1),
  headlineUz: z.string().min(1),
  textUz: z.string().min(1),
  textRu: z.string().min(1),
  link: z.string().min(1),
  articleImage: z.union([z.string(), z.instanceof(FileList)]),
  imageWeb: z.union([z.string(), z.instanceof(FileList)]),
  imageMobile: z.union([z.string(), z.instanceof(FileList)]),
});

type Schema = z.infer<typeof schema>;

const FormEditArticle: FC = ({ articleId }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      const response = await fetch(
        `https://oar-api.onrender.com/api/v1/articles/single/${articleId}`,
      );

      const data = await response.json();

      return {
        headlineUz: data?.headlineUz,
        headlineRu: data?.headlineRu,
        textUz: data?.textUz,
        textRu: data?.textRu,
        link: data?.link,
        titleRu: data?.titleRu,
        titleUz: data?.titleUz,
      };
    },
  });

  const imageWeb: any = watch("imageWeb") && (watch("imageWeb")[0] ?? {});
  const imageMobile: any =
    watch("imageMobile") && (watch("imageMobile")[0] ?? {});
  const articleImage: any =
    watch("articleImage") && (watch("articleImage")[0] ?? {});

  async function onSubmit(data: Schema) {
    const formData = new FormData();
    formData.append("bannerImageWeb", data.imageWeb[0]);
    formData.append("bannerImageMobile", data.imageMobile[0]);
    formData.append("articleImage", data.articleImage[0]);
    formData.append("titleRu", data.titleRu);
    formData.append("titleUz", data.titleUz);
    formData.append("headlineRu", data.headlineRu);
    formData.append("headlineUz", data.headlineUz);
    formData.append("textRu", data.textRu);
    formData.append("textUz", data.textUz);
    formData.append("link", data.link);

    const api = `https://oar-api.onrender.com/api/v1/articles/update/${articleId}`;

    try {
      const req = await fetch(api, { method: "PATCH", body: formData });
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
    fetch(
      "https://oar-api.onrender.com/api/v1/articles/" + `remove/${articleId}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.text())
      .then(
        (res) => (
          router.push("/dashboard/admin/articles/"),
          toast.success("Article Muvaffaqiyatli O'chrildi")
        ),
      );
  };

  return (
    <div>
      <h2 className="text-[24px] leading-[36px] text-main-300">
        {`Lapinoda tug'ilish. Bu qanday edi? (${watch("textUz") ? watch("titleUz") : "Maqola nomi"})`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="bg-white p-6 rounded-2xl mt-5 space-y-5">
          <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                <ImageIcon />
              </div>

              <div className="flex ml-3 flex-col gap-1">
                <h2 className="text-2xl font-normal">Обложка</h2>
                <p className="text-base">
                  Выберите или перетащите обложку для курса
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"filled"}>
                  {imageMobile?.name && imageWeb?.name
                    ? "редактировать"
                    : "Выбрать"}
                </Button>
              </DialogTrigger>
              <DialogContent className="p-7">
                <div
                  className={cn(
                    "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center  mb-4",
                    { "border-destructive": errors?.imageMobile },
                  )}
                >
                  <div className="flex items-center">
                    <div className=" rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                      <ImageIcon />
                    </div>
                    <div className="flex ml-3 flex-col gap-1">
                      <h2 className="text-2xl font-normal"> Обложка </h2>
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
                    {imageMobile?.name ? "редактировать" : "Выбрать"}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    id="file1"
                    {...register("imageMobile", { required: true })}
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
                      <h2 className="text-2xl font-normal">Обложка Web</h2>
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
                    {imageWeb?.name ? "редактировать" : "Выбрать"}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-0 h-0 opacity-0 hidden"
                    {...register("imageWeb", { required: true })}
                    id="file2"
                  />
                </div>
                <div className="relative">
                  <Link className="absolute top-2 left-3" />
                  <Input
                    placeholder="Ссылка"
                    className="mt-4 pl-12"
                    {...register("link", { required: true })}
                  />
                </div>
                <DialogClose asChild>
                  <Button variant={"filled"}>Soxranit</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
          <div
            className={cn(
              "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
              { "border-destructive": errors?.articleImage },
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl flex items-center justify-center w-14 h-14 bg-slate-500">
                <ImageIcon />
              </div>
              <div className="text-2xl font-normal flex flex-col ">
                <h1>Article Image</h1>
                <p>
                  {articleImage
                    ? (articleImage?.name as string)
                    : "Faqat Article uchun Rasm"}
                </p>
              </div>
            </div>
            <label className={buttonVariants({ variant: "filled" })}>
              {articleImage?.name ? "редактировать" : "Выбрать"}

              <Input
                type="file"
                accept="image/*"
                className="w-0 h-0 opacity-0 hidden"
                {...register("articleImage", { required: true })}
              />
            </label>
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">Заголовок</Label>
            <Input
              type="text"
              id="titleRu"
              placeholder="Базовый пакет:"
              className={cn({ "border-destructive": errors?.titleRu })}
              {...register("titleRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleUz">Sarlavha</Label>
            <Input
              type="text"
              id="titleUz"
              placeholder="Asosiy paket:"
              className={cn({ "border-destructive": errors?.titleUz })}
              {...register("titleUz", { required: true })}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="headlineRu">Заголовок</Label>
            <Input
              type="text"
              id="headlineRu"
              placeholder="Базовый пакет:"
              className={cn({
                "border-destructive": errors?.headlineRu?.types,
              })}
              {...register("headlineRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="headlineUz">Sarlavha</Label>
            <Input
              type="text"
              id="headlineUz"
              placeholder="Asosiy paket:"
              className={cn({ "border-destructive": errors?.headlineUz })}
              {...register("headlineUz")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={`textRu`}>Описание</Label>
            <Textarea
              id="textRu"
              placeholder="Преимущество 1"
              className={cn({ "border-destructive": errors?.textRu })}
              {...register("textRu")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={`textUz`}>Tavsif</Label>
            <Textarea
              placeholder="Преимущество 1"
              className={cn({ "border-destructive": errors?.textUz })}
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
              {"O'chirish"}
            </Button>{" "}
            <Button disabled={isSubmitting} type="submit" variant={"main"}>
              Nashr qilish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditArticle;