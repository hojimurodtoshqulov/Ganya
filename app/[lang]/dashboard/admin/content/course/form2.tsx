"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  subTitleUz: z.string().min(1),
  subTitleRu: z.string().min(1),
});

interface Props {
  method: "POST" | "PATCH";
  lang: "uz" | "ru";
  id?: string;
  accessToken?: string;
  defaultValues?: {
    titleUz: string;
    titleRu: string;
    textUz: string;
    textRu: string;
    subTitleUz: string;
    subTitleRu: string;
  };
}
const CourseHelpForm: FC<Props> = ({
  id,
  lang,
  method,
  accessToken,
  defaultValues,
}): JSX.Element => {
  const {
    handleSubmit,
    register,

    formState: { errors: inputErrors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {},
  });
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("idx", "home_course");
    formData.append("titleUz", values.titleUz);
    formData.append("titleRu", values.titleRu);
    formData.append("textUz", values.textUz);
    formData.append("textRu", values.textRu);

    formData.append("subTitleUz", values.subTitleUz);
    formData.append("subTitleRu", values.subTitleRu);

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
      <DialogContent className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <h4>
                  {lang === "ru"
                    ? "Название, Курс помогает Uz "
                    : "Sarlavha, Kurs yordam beradi UZ"}
                </h4>
                <Textarea
                  {...register("titleUz")}
                  name="titleUz"
                  className={cn({
                    "border-destructive": inputErrors.titleUz,
                  })}
                />
              </div>
              <div>
                <h4>
                  {lang === "ru"
                    ? "Название, Курс помогает RU"
                    : "Sarlavha, Kurs yordam beradi RU"}
                </h4>
                <Textarea
                  {...register("titleRu")}
                  name="titleRu"
                  className={cn({
                    "border-destructive": inputErrors.titleRu,
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <h4>
                  {lang === "ru"
                    ? "Описание, Курс поможет UZ"
                    : "Tavsif, Kurs yordam beradi UZ"}
                </h4>
                <Textarea
                  {...register("subTitleUz")}
                  name="subTitleUz"
                  className={cn({
                    "border-destructive": inputErrors.subTitleUz,
                  })}
                />
              </div>
              <div>
                <h4>
                  {lang === "ru"
                    ? "Описание, Курс поможет RU"
                    : "Tavsif, Kurs yordam beradi RU"}
                </h4>
                <Textarea
                  {...register("subTitleRu")}
                  name="subTitleRu"
                  placeholder={
                    lang === "ru" ? "Подзаголовок RU" : "Alt sarlavha RU"
                  }
                  className={cn({
                    "border-destructive": inputErrors.subTitleRu,
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <h4>
                  {lang === "ru"
                    ? "Текст, Кому подходит курс UZ"
                    : "Text, Kurs kimga mos keladi UZ"}
                </h4>
                <Textarea
                  {...register("textUz")}
                  name="textUz"
                  className={cn({ "border-destructive": inputErrors.textUz })}
                />
              </div>
              <div>
                <h4>
                  {lang === "ru"
                    ? "Текст, Кому подходит курс RU"
                    : "Text, Kurs kimga mos keladi RU"}
                </h4>
                <Textarea
                  {...register("textRu")}
                  name="textRu"
                  className={cn({ "border-destructive": inputErrors.textRu })}
                />
              </div>
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

export default CourseHelpForm;
