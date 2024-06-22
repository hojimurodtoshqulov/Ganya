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
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full">
            <div className="space-y-2.5">
              {/* <label> */}
              {/* <p></p>  */}
              <Textarea
                {...register("titleUz")}
                name="titleUz"
                placeholder={lang === "ru" ? "Заголовок UZ" : "Sarlavha UZ"}
                className={cn({ "border-destructive": inputErrors.titleUz })}
              />
              {/* </label> */}
              <Textarea
                {...register("titleRu")}
                name="titleRu"
                placeholder={lang === "ru" ? "Заголовок RU" : "Sarlavha RU"}
                className={cn({ "border-destructive": inputErrors.titleRu })}
              />
              <Textarea
                {...register("subTitleUz")}
                name="subTitleUz"
                placeholder={
                  lang === "ru" ? "Подзаголовок UZ" : "Alt sarlavha UZ"
                }
                className={cn({ "border-destructive": inputErrors.subTitleUz })}
              />
              <Textarea
                {...register("subTitleRu")}
                name="subTitleRu"
                placeholder={
                  lang === "ru" ? "Подзаголовок RU" : "Alt sarlavha RU"
                }
                className={cn({ "border-destructive": inputErrors.subTitleRu })}
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

export default CourseHelpForm;
