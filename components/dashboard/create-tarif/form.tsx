"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/actions/token";

interface Props {
  method?: "POST" | "PATCH";
  courseId?: string;
  planId?: string;
  defaultValues?: {
    availablePeriod: number;
    includeResources: boolean;
    includeSupport: boolean;
    price: number;
  };
  accessToken?: string;
}

const schema = z.object({
  titleUz: z.string().min(1),
  titleRu: z.string().min(1),
  // title: z.string().min(1),
  availablePeriod: z.number().min(1),
  includeResources: z.any(),
  includeSupport: z.any(),
  // includeResources: z.boolean().default(false).optional(),
  // includeSupport: z.boolean().default(false).optional(),
  price: z.number().min(1),
});

type Schema = z.infer<typeof schema>;

const CreateTarifForm: React.FC<Props> = ({
  courseId,
  method,
  planId,
  defaultValues,
  accessToken,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues:
      method === "PATCH"
        ? defaultValues
        : {
            titleUz: "",
            titleRu: "",
            availablePeriod: 0,
            includeResources: "off",
            includeSupport: "off",
            price: 0,
          },
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (val: Schema) => {
    const data = {
      ...val,
      includeResources: val.includeResources === "on" ? true : false,
      includeSupport: val.includeSupport === "on" ? true : false,
    };

    const api =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/plans/${method === "POST" ? `create/${courseId}` : `update/${planId}`}`;

    try {
      let res = await fetch(api, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      });
      if (res.status === 401) {
        let json = await getAccessToken();
        res = await fetch(api, {
          method: method,
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        });
      }
      if (!res.ok) {
        toast({
          description: "Tarif yaratishda muommo yuzaga keldi",
          variant: "destructive",
        });
        return;
      }

      router.refresh();
      if (method === "POST") {
        reset();
        toast({
          description: "Tarif yaratildi",
        });
      } else {
        toast({
          description: "Tarif yangilandi",
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Title" {...register("title")} />
      </div> */}
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="titleUz">Title</Label>
        <Input id="titleUz" placeholder="Title uz" {...register("titleUz")} />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Input id="titleRu" placeholder="Title ru" {...register("titleRu")} />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="load">Davomiyligi</Label>
        <Input
          type="number"
          id="load"
          // defaultValue={defaultValues?.availablePeriod}
          placeholder="Kurs davomiyligi"
          {...register("availablePeriod", {
            setValueAs: (value) => Number(value),
          })}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="resourses"
          defaultChecked={defaultValues?.includeResources}
          onCheckedChange={(e) => setValue("includeResources", e ? "on" : "of")}
          {...register("includeResources", {
            // setValueAs: (value: any) => Boolean(value),
          })}
        />
        <label
          htmlFor="resourses"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Дополнительные текстовые материалы.
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="support"
          defaultChecked={defaultValues?.includeSupport}
          onCheckedChange={(e) => {
            console.log(e);
            setValue("includeSupport", e ? "on" : "off");
          }}
          {...register("includeSupport", {
            // setValueAs: (value: any) => Boolean(value),
          })}
        />
        <label
          htmlFor="support"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          1 онлайн - консультации со мной.
        </label>
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="price">Сумма</Label>
        <Input
          type="number"
          id="price"
          placeholder="Введите сумму тарифного плана"
          {...register("price", {
            setValueAs: (value: any) => Number(value),
          })}
        />
      </div>
      <Button
        className="text-base font-normal"
        variant={"main"}
        type="submit"
        disabled={isSubmitting}
      >
        Сохранить
      </Button>
    </form>
  );
};

export default CreateTarifForm;
