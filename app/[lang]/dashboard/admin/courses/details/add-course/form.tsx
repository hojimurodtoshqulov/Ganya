"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Album, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  titleUz: z.string().min(1),
  titleRu: z.string().min(1),
  image: z.union([z.string(), z.instanceof(FileList)]),
  descriptionUz: z.string().min(1),
  descriptionRu: z.string().min(1),
});

interface Props {
  method: "POST" | "PATCH";
  defaultValues?: {
    titleUz: string;
    titleRu: string;
    descriptionUz: string;
    descriptionRu: string;
    image: string;
  };
  id?: string;
}

const AddCourseForm: FC<Props> = ({
  method,
  id,
  defaultValues,
}): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [isImage, setIsImage] = useState<boolean>(!!defaultValues?.image);
  const {
    handleSubmit,
    register,
    formState: { errors: inputErrors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    console.log(values);
    if (values.image instanceof FileList) {
      formData.append("image", values.image[0], values.image[0].name);
    } else {
      formData.append("image", values.image);
    }
    formData.append("titleUz", values.titleUz);
    formData.append("titleRu", values.titleRu);
    formData.append("descriptionUz", values.descriptionUz);
    formData.append("descriptionRu", values.descriptionRu);

    const res = await fetch(
      `https://oar-api.onrender.com/api/v1/courses/${method === "POST" ? "create" : `update/${id}`}`,
      {
        method: method,
        body: formData,
      },
    );
    const data = await res.json();
    if (!res.ok) {
      toast({ description: data.message, variant: "destructive" });
    }
    if (res.ok) {
      router.refresh();
      if (method === "POST") {
        reset();
        // router.refresh();
        router.push(`${pathname}/${data.id}/update`);
      } else {
        toast({
          description: "Course successfully edited!",
        });
      }
    }
  }

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <h6 className="text-sm text-csneutral-400">Kurs nomi</h6>
        <Input
          type="text"
          {...register("titleUz")}
          placeholder="Title UZ"
          className={cn({ "border-destructive": inputErrors.titleUz })}
        />
        <Input
          {...register("titleRu")}
          type="text"
          name="titleRu"
          placeholder="Title RU"
          className={cn({ "border-destructive": inputErrors.titleRu })}
        />
      </div>
      <div className="space-y-1">
        <h6 className="text-sm text-csneutral-400">Kurs tarifi</h6>
        <Input
          {...register("descriptionUz")}
          type="text"
          name="descriptionUz"
          placeholder="description UZ"
          className={cn({ "border-destructive": inputErrors.descriptionUz })}
        />
        <Input
          {...register("descriptionRu")}
          type="text"
          name="descriptionRu"
          placeholder="description RU"
          className={cn({ "border-destructive": inputErrors.descriptionRu })}
        />
      </div>

      <label
        htmlFor="image"
        className={`p-4 flex items-center justify-between gap-3 rounded-2xl border-csneutral-300 border-2 ${isImage ? "border-none bg-csneutral-100" : "border-dashed"}`}
      >
        <div
          className={`w-14 h-14 ${isImage ? "bg-white" : "bg-csneutral-100"} rounded-xl flex items-center justify-center text-csneutral-500 flex-shrink-0`}
        >
          <Image width={24} height={24} />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-semibold">
            {isImage ? "Ваша обложка загружено" : "Обложка"}
          </h3>
          <p className="mt-1">Выберите или перетащите обложку для курса</p>
        </div>

        <div
          className={cn(
            buttonVariants({ variant: "filled" }),
            "h-10 font-normal rounded-lg cursor-pointer flex-shrink-0",
          )}
        >
          {isImage ? "Изменить" : "Выбрать"}
        </div>
        <Input
          className="absolute w-0 h-0 -z-50"
          accept="image/*"
          type="file"
          id="image"
          {...register("image", {
            required: "Recipe picture is required",
          })}
          onChange={() => {
            setIsImage(true);
          }}
          required={defaultValues?.image ? false : true}
        />
      </label>

      <Button
        type="submit"
        variant={"main"}
        className="w-full"
        disabled={isSubmitting}
      >
        Davom etish
      </Button>
    </form>
  );
};

export default AddCourseForm;
