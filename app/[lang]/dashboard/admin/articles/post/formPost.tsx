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
import { FaChevronLeft } from "react-icons/fa";

interface Props {
  accessToken?: string;
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

const FormPostArticle: FC<Props> = ({ accessToken }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  console.log(accessToken, "this is access token");

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

    const api = "https://oar-api.onrender.com/api/v1" + "/articles/create";
    try {
      const req = await fetch(api, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      });
      if (!req.ok)
        throw new Error("Yangi article yaratishda muammo yuzaga keldi");
      const res = req.json();
      router.refresh();
      toast.success("Article Muvaffaqiyatli yaratildi");
      router.push("/dashboard/admin/articles/");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <h1
        className={`${buttonVariants({ variant: "link" })} flex gap-2 items-center`}
        onClick={() => router.back()}
      >
        <FaChevronLeft className="font-normal" />
        Orqaga
      </h1>
      <h2 className="text-[24px] leading-[36px] text-main-300">
        {`(${watch("textUz") ? watch("titleUz") : "Maqola nomi"})`}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="bg-white p-6 rounded-2xl mt-5 space-y-5">
          <div className="border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center ">
            <div className="text-2xl font-normal flex flex-col ">
              <h1>Добавить рекламный баннер</h1>
            </div>
            <label className={buttonVariants({ variant: "filled" })}>
              {articleImage?.name ? "редактировать" : "Добавить"}

              <Input
                type="file"
                accept="image/*"
                className="w-0 h-0 opacity-0 hidden"
                {...register("articleImage", { required: true })}
              />
            </label>
          </div>
          <div
            className={cn(
              "border-dashed border-[2px] rounded-2xl p-4 flex justify-between items-center mt-4 mb-2",
              { "border-destructive": errors?.articleImage },
            )}
          >
            <div className="flex items-center gap-3">
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
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"filled"}>
                  {imageMobile?.name && imageWeb?.name
                    ? "редактировать"
                    : "Выбрать"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[650px] p-10">
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
                      <h2 className="text-2xl font-normal">Для мобильного</h2>
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
                      <h2 className="text-2xl font-normal">Для компьютера</h2>
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
                  <Link className="absolute top-[1.5rem] left-3" />
                  <Input
                    placeholder="Ссылка"
                    className="mt-4 pl-12"
                    {...register("link", { required: true })}
                  />
                </div>
                <DialogClose asChild>
                  <Button variant={"main"}>Опубликовать</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">Заголовок</Label>
            <Input
              type="text"
              id="titleRu"
              placeholder="Базовый пакет: Ru"
              className={cn({ "border-destructive": errors?.titleRu })}
              {...register("titleRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="titleRu"
              placeholder="Asosiy paket: Uz"
              className={cn({ "border-destructive": errors?.titleUz })}
              {...register("titleUz", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="headlineUz">Подзаголовок</Label>
            <Input
              type="text"
              id="headlineUz"
              placeholder="Asosiy paket: Uz"
              className={cn({
                "border-destructive": errors?.headlineRu?.types,
              })}
              {...register("headlineRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="headlineUz"
              placeholder="Базовый пакет: Ru"
              className={cn({ "border-destructive": errors?.headlineUz })}
              {...register("headlineUz")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={`textRu`}>Описание</Label>
            <Textarea
              id="textRu"
              placeholder="Преимущество 1 Ru"
              className={cn({ "border-destructive": errors?.textRu })}
              {...register("textRu")}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Textarea
              id="textRu"
              placeholder="Преимущество 1 Uz"
              className={cn({ "border-destructive": errors?.textUz })}
              {...register("textUz")}
            />
          </div>

          <div className="flex sm:justify-end mt-5 justify-center">
            <Button disabled={isSubmitting} type="submit" variant={"main"}>
              Nashr qilish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormPostArticle;
