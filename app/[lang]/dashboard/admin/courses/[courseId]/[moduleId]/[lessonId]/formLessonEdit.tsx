"use client";

import { FC, useState } from "react";
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
    lessonId: string;
    lang: "ru" | "uz";
  };
  data: any;
  accToken?: string;
  dict: Awaited<ReturnType<typeof getDictionary>>['dashboard'];
}

const schema = z.object({
  video: z.union([z.string(), z.instanceof(FileList)]),
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  descriptionRu: z.string().min(1),
  descriptionUz: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

const FormLessonEdit: FC<Props> = ({
  params: { lang, lessonId, moduleId },
  data,
  accToken,
  dict
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors: inputErrors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues:
      {
        descriptionRu: data?.descriptionRu,
        descriptionUz: data?.descriptionUz,
        titleRu: data?.titleRu,
        titleUz: data?.titleUz,
        video: "",
      } ?? {},
  });
  const [lesson, setLesson] = useState<Object | any>(null);
  const router = useRouter();

  const { video: videoFile } = watch();

  const videoName =
    videoFile &&
    videoFile.length >= 0 &&
    (typeof videoFile !== "string" ? videoFile[0]?.name : "");

  const onSubmit = async (values: Schema) => {
    try {
      const formData = new FormData();
      if (values.video instanceof FileList) {
        formData.append("video", values.video[0], values.video[0].name);
      } else {
        formData.append("video", values.video);
      }

      formData.append("titleUz", values.titleUz);
      formData.append("titleRu", values.titleRu);
      formData.append("descriptionRu", values.descriptionRu);
      formData.append("descriptionUz", values.descriptionUz);

      // PATCH
      const api =
        process.env.NEXT_PUBLIC_BASE_URL + `/lessons/update/${lessonId}`;
      const req = await fetch(api, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accToken ?? "")}`,
        },
      });

      if (!req.ok) throw new Error(`${dict.admin.createLesson.toast.updateError}`);
      reset();
      const res = req.json();
      toast.success(dict.admin.createLesson.toast.update);
      router.refresh();
      setLesson(null);
      router.back();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteLesson = async () => {
    // DELTE
    const api =
      process.env.NEXT_PUBLIC_BASE_URL + `/lessons/delete/${lessonId}`;
    try {
      const req = await fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(accToken ?? "")}`,
        },
      });

      if (!req.ok) throw new Error(`${dict.admin.createLesson.toast.deleteError}`);

      const res = await req.json();
      toast.success(dict.admin.createLesson.toast.delete);
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
            htmlFor="videoUpload"
            className={clsx(
              "relative rounded-2xl p-4 flex items-center justify-between gap-3 border-dashed border-2",
              inputErrors.video && "border-destructive",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl w-[60px] h-[60px] flex items-center justify-center bg-white">
                <CiCirclePlus className="w-7 h-7" />
              </div>
              <div className="flex flex-col text-csneutral-500 gap-1">
                <h1 className="text-[22px] font-medium">
                  {videoName
                    ? getLangText(lang, "Video Tanlandi", "Видео выбрано")
                    : dict.admin.createLesson.videoLable}
                </h1>
                <p className="text-base font-normal">
                  {videoName
                    ? videoName
                    : dict.admin.createLesson.videoDescription}
                </p>
              </div>
            </div>
            <span className="rounded-[8px] py-3 px-5 bg-main-100 text-primary-300 text-sm font-normal">
              {videoName
                ? dict.admin.createLesson.btnEdit : dict.admin.createLesson.btnSelect}
            </span>
          </Label>
          <Input
            id="videoUpload"
            type="file"
            accept="video/*"
            className="absolute inset-0 opacity-0"
            // defaultValue={data?.video}
            {...register("video", { required: true })}
          />
        </div>

        <div className="rounded-2xl  bg-white flex flex-col gap-4 p-6">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="titleRu">
              {dict.admin.createLesson.title}
            </Label>
            <Input
              type="text"
              id="titleRu"
              placeholder={`${dict.admin.createLesson.title} RU`}
              className={cn({ "border-destructive": inputErrors.titleRu })}
              {...register("titleRu", { required: true })}
            // defaultValue={data?.titleRu}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Input
              type="text"
              id="titleUz"
              placeholder={`${dict.admin.createLesson.title} UZ`}
              className={cn({ "border-destructive": inputErrors.titleUz })}
              {...register("titleUz", { required: true })}
              defaultValue={data?.titleUz}
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
              defaultValue={data?.descriptionRu}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Textarea
              placeholder={`${dict.admin.createLesson.placeholder} UZ`}
              className={cn({
                "border-destructive": inputErrors.descriptionUz,
              })}
              {...register("descriptionUz", { required: true })}
              defaultValue={data?.descriptionUz}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              disabled={isSubmitting}
              onClick={handleDeleteLesson}
              className="bg-red-400 hover:bg-red-300 transition-colors text-sm font-normal py3 px-5"
              variant={"main"}
            >
              {dict.admin.createLesson.btnDelete}
            </Button>

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

export default FormLessonEdit;
