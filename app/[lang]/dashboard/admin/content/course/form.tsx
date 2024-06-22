"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/actions/token";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  titleUz: z.string().min(1),
  titleRu: z.string().min(1),
  textUz: z.string().min(1),
  textRu: z.string().min(1),
  file: z.union([z.string(), z.instanceof(FileList)]),
});

interface Props {
  method: "POST" | "PATCH";
  accessToken?: string;
  lang: "uz" | "ru";
  id?: string;
  defaultValues?: {
    titleUz: string;
    titleRu: string;
    textUz: string;
    textRu: string;
    file: string;
  };
}

const HomeCourseDataForm: FC<Props> = ({
  defaultValues,
  lang,
  method,
  accessToken,
  id,
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors: inputErrors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {},
  });
  const router = useRouter();
  const { toast } = useToast();

  const imageWeb: any = watch("file") && (watch("file")[0] ?? "");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    if (typeof values.file !== "string") {
      formData.append("file", values?.file?.[0], values?.file?.[0]?.name);
    }
    formData.append("idx", "home_course");
    formData.append("titleUz", values.titleUz);
    formData.append("titleRu", values.titleRu);
    formData.append("textUz", values.textUz);
    formData.append("textRu", values.textRu);

    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/statics/" +
        (method === "POST" ? "create" : `${id}`),
      {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      },
    );
    const data = await res.json();
    if (res.status === 401) {
      const json = await getAccessToken();
      if (json) {
        onSubmit(values);
      }
    }
    if (res.ok) {
      router.refresh();
      toast({
        title: lang === "uz" ? "Ma'lumotlar saqlandi" : "Данные сохранены",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="main" className="h-12 text-sm px-6">
          {lang === "uz" ? "Ma'lumotlarni o'zgartirish" : "Изменить данные"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full">
            <div className="space-y-2.5">
              <div className="w-full p-2.5 rounded-xl border-dashed border-2 flex items-center justify-between">
                <h2 className="pl-2 text-xl">
                  {lang === "uz" ? "Rasm" : "Картина"}
                </h2>
                <label
                  className={buttonVariants({ variant: "filled" })}
                  htmlFor="fayl"
                >
                  {imageWeb?.name ? "редактировать" : "Выбрать"}
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fayl"
                  {...register("file")}
                />
              </div>
              <Input
                {...register("titleUz")}
                name="titleUz"
                placeholder={lang === "ru" ? "Заголовок UZ" : "Sarlavha UZ"}
                className={cn({ "border-destructive": inputErrors.titleUz })}
              />
              <Input
                {...register("titleRu")}
                name="titleRu"
                placeholder={lang === "ru" ? "Заголовок RU" : "Sarlavha RU"}
                className={cn({ "border-destructive": inputErrors.titleRu })}
              />
              <Textarea
                {...register("textUz")}
                name="textUz"
                placeholder={lang === "ru" ? "Текст UZ" : "Matn UZ"}
                className={cn({ "border-destructive": inputErrors.textUz })}
              />
              <Textarea
                {...register("textRu")}
                name="textRu"
                placeholder={lang === "ru" ? "Текст RU" : "Matn RU"}
                className={cn({ "border-destructive": inputErrors.textRu })}
              />
            </div>
          </div>
          <Button
            className="w-full mt-2.5"
            variant="main"
            disabled={isSubmitting}
          >
            {lang === "ru" ? "Сохранить" : "Saqlash"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HomeCourseDataForm;
