"use client";

import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  titleRu: z.string().min(1),
  titleUz: z.string().min(1),
  textUz: z.string().min(1),
  textRu: z.string().min(1),
  file: z.union([z.string(), z.instanceof(FileList)]),
});

type Schema = z.infer<typeof schema>;

function AbautModal({
  defaultValues,
  accessToken,
  lang,
  langue,
}: any): JSX.Element {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const route = useRouter();

  console.log(lang, "this is lange ");

  const file: any = watch("file") && (watch("file")[0] ?? {});

  async function onSubmit(data: Schema) {
    const formData = new FormData();
    if (typeof data.file !== "string") {
      formData.append("file", file);
    }
    formData.append("idx", "about");
    formData.append("titleRu", data.titleRu);
    formData.append("titleUz", data.titleUz);
    formData.append("textRu", data.textRu);
    formData.append("textUz", data.textUz);
    formData.append("subTitleUz", "");
    formData.append("subTitleRu", "");

    const api =
      process.env.NEXT_PUBLIC_BASE_URL + `/statics/66759bc6aca39d51d5d8dbf5`;

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
      route.refresh();
      toast.success("Article Muvaffaqiyatli yaratildi");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const DeleteFun = () => {
    fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/articles/remove/66759bc6aca39d51d5d8dbf5`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      },
    )
      .then((res) => res.text())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <SquarePen className="absolute top-4 right-3 text-main-300 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center max-w-[600px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3"
          >
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="titleRu">
                {langue.dashboard.admin.articels.forms.heading}
              </Label>
              <Input
                type="text"
                id="titleRu"
                placeholder={"kimdur"}
                className={cn({ "border-destructive": errors?.titleRu })}
                {...register("titleRu", { required: true })}
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              {/* <Label htmlFor="titleUz">Title Uz</Label> */}
              <Input
                type="text"
                id="titleUz"
                placeholder={"kimdur"}
                className={cn({ "border-destructive": errors?.titleRu })}
                {...register("titleUz", { required: true })}
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="titleRu">
                {langue.dashboard.admin.articels.forms.desck}
              </Label>
              <Textarea
                id="textRu"
                className={cn(`placeholder:text-csneutral-400`, {
                  "border-destructive": errors?.textRu,
                })}
                {...register("textRu", { required: true })}
              />
              <Textarea
                id="textUz"
                placeholder={"kimdur"}
                className={cn(`placeholder:text-csneutral-400`, {
                  "border-destructive": errors?.textUz,
                })}
                {...register("textUz", { required: true })}
              />
            </div>
            {/* <div className="grid w-full  items-center gap-1.5">
              <Input
                type="text"
                id="textUz"
                placeholder={"kimdur"}
                className={cn({ "border-destructive": errors?.titleRu })}
                {...register("textUz", { required: true })}
              />
            </div> */}
            <div className="border-[3px] rounded-lg border-dashed p-3 flex items-center justify-between">
              <Image
                src={defaultValues?.file}
                width={100}
                height={100}
                className="object-cover w-[80px] h-[80px] rounded"
                alt="Abaut us informatin"
              />
              <label
                className={buttonVariants({ variant: "filled" })}
                htmlFor="file1"
              >
                {lang === "uz" ? " Rasm tanlang" : "Выберите изображение"}
              </label>
              <Input
                type="file"
                accept="image/*"
                className="w-0 h-0 opacity-0 hidden"
                id="file1"
                {...register("file")}
              />
            </div>
            {/* <Button variant={"destructive"} onClick={() => DeleteFun()}>
              Delete
            </Button> */}
            <DialogClose asChild>
              <Button variant={"main"} type="submit">
                {langue.dashboard.admin.articels.forms.sent}
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AbautModal;
