"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";
import { useRouter } from "next/navigation";
import BackLink from "@/components/dashboard/back-link";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { getLangText } from "@/lib/utils";
import { getDictionary } from "@/lib/get-dictionary";
interface Props {
  params: {
    courseId: string;
    moduleId: string;
    lang: "ru" | "uz";
  };
  accToken?: string;
  dict: Awaited<ReturnType<typeof getDictionary>>["dashboard"];
}

const schema = z.object({
  videoUz: z.union([z.string(), z.instanceof(FileList)]),
  videoRu: z.union([z.string(), z.instanceof(FileList)]),
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  descriptionRu: z.string().min(1),
  descriptionUz: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

const FormCreateLesson: FC<Props> = ({
  params: { lang, courseId, moduleId },
  accToken,
  dict,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors: inputErrors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const videoUzFile = watch("videoUz") as FileList;
  const videoUzName =
    videoUzFile && videoUzFile.length > 0 ? videoUzFile[0]?.name : "";
  const videoRuFile = watch("videoRu") as FileList;
  const videoRuName =
    videoRuFile && videoRuFile.length > 0 ? videoRuFile[0]?.name : "";

  const onSubmit = async (values: Schema) => {
    try {
      if (!videoUzFile || !videoUzName)
        throw new Error(`${dict.admin.createLesson.toast.videoError}`);
      const formData = new FormData();
      if (values.videoUz instanceof FileList) {
        formData.append("videoUz", values.videoUz[0], values.videoUz[0].name);
      } else {
        formData.append("videoUz", values.videoUz);
      }
      if (!videoRuFile || !videoRuName)
        throw new Error(`${dict.admin.createLesson.toast.videoError}`);

      if (values.videoRu instanceof FileList) {
        formData.append("videoRu", values.videoRu[0], values.videoRu[0].name);
      } else {
        formData.append("videoRu", values.videoRu);
      }

      formData.append("titleUz", values.titleUz);
      formData.append("titleRu", values.titleRu);
      formData.append("descriptionRu", values.descriptionRu);
      formData.append("descriptionUz", values.descriptionUz);

      const api =
        process.env.NEXT_PUBLIC_BASE_URL + `/lessons/create/${moduleId}`;

      const req = await fetch(api, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${JSON.parse(accToken ?? "")}` },
      });

      if (!req.ok)
        throw new Error(`${dict.admin.createLesson.toast.createError}`);

      const res = await req.json();
      reset();
      toast.success(dict.admin.createLesson.toast.save);
      router.refresh();
      router.back();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-5">
      {lang === "ru" ? (
        <BackLink title="Вернуться к урокам" heading="" />
      ) : (
        <BackLink title="Darslarga Qaytish" heading="" />
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "box-shadow: 0px 24px 36px 0px #DEDEDE7A",
          },
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative">
          <Label
            htmlFor="videoUploadUz"
            className={clsx(
              "relative rounded-2xl p-4 flex items-center justify-between gap-3 border-dashed border-2",
              inputErrors.videoUz && "border-destructive",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl w-[60px] h-[60px] flex items-center justify-center bg-white">
                <CiCirclePlus className="w-7 h-7" />
              </div>
              <div className="flex flex-col text-csneutral-500 gap-1">
                <h1 className="text-[22px] font-medium">
                  {videoUzName
                    ? getLangText(lang, "Video Tanlandi", "Видео выбрано")
                    : dict.admin.createLesson.videoLable}{" "}
                  {lang === "ru" ? "УЗ" : "UZ"}
                </h1>
                <p className="text-base font-normal">
                  {videoUzName
                    ? videoUzName
                    : dict.admin.createLesson.videoDescription}
                </p>
              </div>
            </div>
            <span className="rounded-[8px] py-3 px-5 bg-main-100 text-primary-300 text-sm font-normal">
              {videoUzName
                ? dict.admin.createLesson.btnEdit
                : dict.admin.createLesson.btnSelect}
            </span>
          </Label>
          <Input
            id="videoUploadUz"
            type="file"
            accept="video/*"
            className="absolute inset-0 opacity-0"
            {...register("videoUz", { required: true })}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="videoUploadRu"
            className={clsx(
              "relative rounded-2xl p-4 flex items-center justify-between gap-3 border-dashed border-2",
              inputErrors.videoRu && "border-destructive",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl w-[60px] h-[60px] flex items-center justify-center bg-white">
                <CiCirclePlus className="w-7 h-7" />
              </div>
              <div className="flex flex-col text-csneutral-500 gap-1">
                <h1 className="text-[22px] font-medium">
                  {videoRuName
                    ? getLangText(lang, "Video Tanlandi", "Видео выбрано")
                    : dict.admin.createLesson.videoLable}{" "}
                  {lang === "ru" ? "РУ" : "RU"}
                </h1>
                <p className="text-base font-normal">
                  {videoRuName
                    ? videoRuName
                    : dict.admin.createLesson.videoDescription}
                </p>
              </div>
            </div>
            <span className="rounded-[8px] py-3 px-5 bg-main-100 text-primary-300 text-sm font-normal">
              {videoUzName
                ? dict.admin.createLesson.btnEdit
                : dict.admin.createLesson.btnSelect}
            </span>
          </Label>
          <Input
            id="videoUploadRu"
            type="file"
            accept="video/*"
            className="absolute inset-0 opacity-0"
            {...register("videoRu", { required: true })}
          />
        </div>

        <div className="rounded-2xl  bg-white flex flex-col gap-4 p-6">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">{dict.admin.createLesson.title}</Label>
            <Input
              type="text"
              id="titleRu"
              placeholder={`${dict.admin.createLesson.title} RU`}
              className={cn({ "border-destructive": inputErrors.titleRu })}
              {...register("titleRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="titleUz"
              placeholder={`${dict.admin.createLesson.title} UZ`}
              className={cn({ "border-destructive": inputErrors.titleUz })}
              {...register("titleUz", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={`descriptionRu`}>
              {dict.admin.createLesson.title1}
            </Label>
            <Textarea
              placeholder={`${dict.admin.createLesson.placeholder} RU`}
              className={cn({
                "border-destructive": inputErrors.descriptionRu,
              })}
              {...register("descriptionRu", { required: true })}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Textarea
              placeholder={`${dict.admin.createLesson.placeholder} UZ`}
              className={cn({
                "border-destructive": inputErrors.descriptionUz,
              })}
              {...register("descriptionUz", { required: true })}
            />
          </div>

          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="disabled:bg-main-200 text-sm font-normal py3 px-5"
              variant={"main"}
            >
              {dict.admin.createLesson.btnSave}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreateLesson;
