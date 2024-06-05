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
import { getAccessToken } from "@/lib/actions/token";

const formSchema = z.object({
  titleUz: z.string().min(1),
  titleRu: z.string().min(1),
  image: z.union([
    z.string(),
    z.object({
      0: z.any(),
    }),
  ]),
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
  accessToken?: string;
  dict: any;
}

const AddCourseForm: FC<Props> = ({
  method,
  id,
  defaultValues,
  accessToken,
  dict,
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

    if (typeof values.image === "object") {
      formData.append("image", values?.image?.[0], values?.image?.[0]?.name);
    } else {
      formData.append("image", values.image);
    }
    formData.append("titleUz", values.titleUz);
    formData.append("titleRu", values.titleRu);
    formData.append("descriptionUz", values.descriptionUz);
    formData.append("descriptionRu", values.descriptionRu);

    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/courses/" +
        (method === "POST" ? "create" : `update/${id}`),
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

      res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/courses/" +
          (method === "POST" ? "create" : `update/${id}`),
        {
          method: method,
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
    }
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
        <h6 className="text-sm text-csneutral-400">{dict.text}</h6>

        <Input
          {...register("titleRu")}
          type="text"
          name="titleRu"
          placeholder={dict.text + " RU"}
          className={cn({ "border-destructive": inputErrors.titleRu })}
        />
        <Input
          type="text"
          {...register("titleUz")}
          placeholder={dict.text + " UZ"}
          className={cn({ "border-destructive": inputErrors.titleUz })}
        />
      </div>
      <div className="space-y-1">
        <h6 className="text-sm text-csneutral-400">{dict.desc}</h6>
        <Input
          {...register("descriptionRu")}
          type="text"
          name="descriptionRu"
          placeholder={dict.desc + " RU"}
          className={cn({ "border-destructive": inputErrors.descriptionRu })}
        />
        <Input
          {...register("descriptionUz")}
          type="text"
          name="descriptionUz"
          placeholder={dict.desc + " UZ"}
          className={cn({ "border-destructive": inputErrors.descriptionUz })}
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
            {isImage ? dict.imagetitle : dict.imagetitle}
          </h3>
          <p className="mt-1">{dict.imagetext}</p>
        </div>

        <div
          className={cn(
            buttonVariants({ variant: "filled" }),
            "h-10 font-normal rounded-lg cursor-pointer flex-shrink-0",
          )}
        >
          {isImage ? dict.btnchange : dict.btn}
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
        {dict.button}
      </Button>
    </form>
  );
};

export default AddCourseForm;
