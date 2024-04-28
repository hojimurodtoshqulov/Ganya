"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

const formSchema = z.object({
  titleUz: z.string().min(2).max(50),
  titleRu: z.string().min(2).max(50),
  image: z.instanceof(FileList),
});

const AddCourseForm: FC<Props> = ({ action }): JSX.Element => {
  const { handleSubmit, register, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, image: values.image[0] });

    const formData = new FormData();
    formData.append("image", values.image[0], values.image[0].name);
    formData.append("titleUz", values.titleUz);
    formData.append("titleRu", values.titleRu);
    formData.append("descriptionUz", "test description");
    formData.append("descriptionRu", "test description");

    const res = await fetch(
      "https://oar-api.onrender.com/api/v1/courses/create",
      {
        method: "POST",
        body: formData,
        // headers: {
        //   Accept: "application/json",
        //   "Content-type": "application/x-www-form-urlencoded",
        // },
        // cache: "no-store",
      },
    );
    const data = await res.json();
    console.log(data);
    console.log("end");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <h6 className="text-sm text-csneutral-400">Kurs nomi</h6>
        <Input
          type="text"
          {...register("titleUz")}
          placeholder="Title UZ"
          required
          className="invalid:[&:not(:focus)]:bg-red-400"
        />
        <Input
          {...register("titleRu")}
          type="text"
          name="titleRu"
          placeholder="Title RU"
        />
      </div>
      {/* <div className="space-y-1">
        <h6 className="text-sm text-csneutral-400">Kurs tarifi</h6>
        <Input type="text" name="descriptionUz" placeholder="Description UZ" />
        <Input type="text" name="descriptionRu" placeholder="Description RU" />
      </div> */}

      <Input
        accept="image/*"
        type="file"
        required
        {...register("image", {
          required: "Recipe picture is required",
        })}
      />
      <Button type="submit" variant={"main"} className="w-full">
        Davom etish
      </Button>
    </form>
  );
};

export default AddCourseForm;
