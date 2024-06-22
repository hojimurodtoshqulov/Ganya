"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";

import HashMain from "@/icons/hash-main.svg";
import Star1 from "@/icons/star-1.svg";

interface Props {
  method?: "POST" | "PATCH";
  courseId?: string;
  planId?: string;
  defaultValues?: {
    titleUz: string;
    titleRu: string;
    availablePeriod: number;
    detailsRu: string;
    detailsUz: string;
    descriptionUz: string;
    descriptionRu: string;
    price: number;
    discount?: number;
    discountExpiredAt?: string;
    includeResources?: any;
    includeSupport?: any;
    includePrivateGroupAccess?: any;
  };
  lang: "uz" | "ru";
  accessToken?: string;
}

const schema = z.object({
  titleUz: z.string().min(1),
  titleRu: z.string().min(1),
  availablePeriod: z.number().min(1),
  includeResources: z.any(),
  includeSupport: z.any(),
  includePrivateGroupAccess: z.any(),

  detailsRu: z.string().min(1),
  detailsUz: z.string().min(1),
  descriptionUz: z.string().min(1),
  descriptionRu: z.string().min(1),

  price: z.number().min(1),
  discount: z.number().optional(),
  discountExpiredAt: z.string().optional(),
  package: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

const CreateTarifForm: React.FC<Props> = ({
  courseId,
  method,
  planId,
  defaultValues,
  accessToken,
  lang,
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
        ? {
            ...defaultValues,
            includePrivateGroupAccess: defaultValues?.includePrivateGroupAccess
              ? "on"
              : "off",
            includeResources: defaultValues?.includeResources ? "on" : "off",
            includeSupport: defaultValues?.includeSupport ? "on" : "off",
            discountExpiredAt: defaultValues?.discountExpiredAt ?? "",
            discount: defaultValues?.discount,
          }
        : {
            titleUz: "",
            titleRu: "",
            availablePeriod: 0,
            includeResources: "off",
            includeSupport: "off",
            includePrivateGroupAccess: "off",
            price: 0,
            discount: 0,
            discountExpiredAt: `${new Date().toISOString()}`,
            detailsUz: "",
            detailsRu: "",
            descriptionUz: "",
            descriptionRu: "",
            package: "",
          },
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (val: Schema) => {
    const data = {
      ...val,
      includeResources: val.includeResources === "on" ? true : false,
      includeSupport: val.includeSupport === "on" ? true : false,
      includePrivateGroupAccess:
        val.includePrivateGroupAccess === "on" ? true : false,
    };
    if (!data?.discountExpiredAt) {
      delete data.discountExpiredAt;
    }
    if (!data?.discount) {
      delete data.discount;
    }

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
      className="grid grid-cols-2 gap-2.5"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="titleUz">{lang === "ru" ? "Название" : "Nomi"}</Label>
          <Input
            id="titleUz"
            placeholder={lang === "ru" ? "Название uz" : "Nomi uz"}
            {...register("titleUz")}
          />
          <Input
            id="titleRu"
            placeholder={lang === "ru" ? "Название ru" : "Nomi ru"}
            {...register("titleRu")}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-1.5">
          <div>
            <Label htmlFor="load">
              {lang === "ru" ? "Длительность" : "Davomiyligi"}
            </Label>
            <Input
              type="number"
              id="load"
              placeholder={lang === "ru" ? "Длительность" : "Kurs davomiyligi"}
              {...register("availablePeriod", {
                setValueAs: (value) => Number(value),
              })}
            />
          </div>

          <div className="flex flex-col justify-end gap-0.5">
            <Label htmlFor="package" className="flex gap-1 items-center">
              {lang === "ru" ? "Тип" : "Paket turi"}
              <p className="text-xs font-normal">
                (basic | standard | premium)
              </p>
            </Label>
            <Input
              id="package"
              placeholder={lang === "ru" ? "Тип" : "Paket turi"}
              {...register("package")}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="resourses"
            defaultChecked={defaultValues?.includeResources}
            onCheckedChange={(e) =>
              setValue("includeResources", e ? "on" : "of")
            }
            {...register("includeResources")}
          />
          <label
            htmlFor="resourses"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {lang === "ru"
              ? "Дополнительные текстовые материалы."
              : "Qo'llanma ma'lumotlari."}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="support"
            defaultChecked={defaultValues?.includeSupport}
            onCheckedChange={(e) =>
              setValue("includeSupport", e ? "on" : "off")
            }
            {...register("includeSupport")}
          />
          <label
            htmlFor="support"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {lang === "ru" ? "Онлайн консультации." : "Onlayn konsultatsiya."}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vip"
            defaultChecked={defaultValues?.includePrivateGroupAccess}
            onCheckedChange={(e) =>
              setValue("includePrivateGroupAccess", e ? "on" : "off")
            }
            {...register("includePrivateGroupAccess")}
          />
          <label
            htmlFor="vip"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {lang === "ru" ? "VIP группа" : "VIP guruh"}
          </label>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="price">{lang === "ru" ? "Сумма" : "Summa"}</Label>
          <Input
            type="number"
            id="price"
            placeholder="Введите сумму тарифного плана"
            {...register("price", {
              setValueAs: (value: any) => Number(value),
            })}
          />
        </div>
        <div className="w-full items-center gap-1.5 flex">
          <div>
            <Label htmlFor="discount">
              {lang === "ru" ? "Скидка" : "Chegirma"}
            </Label>
            <Input
              type="number"
              id="discount"
              // placeholder="Введите сумму тарифного плана"
              {...register("discount", {
                setValueAs: (value: any) => Number(value),
              })}
            />
          </div>
          <div>
            <Label htmlFor="discounExpiredAt">
              {lang === "ru" ? "Срок действия" : "Amal qilish muddati"}
            </Label>
            <Input
              type="date"
              id="discountExpiredAt"
              {...register("discountExpiredAt", {
                setValueAs: (value) => {
                  if (!value) return value;
                  const val = new Date(value ?? "").toISOString();
                  return val + "";
                },
              })}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex flex-col gap-2">
          <Label>{lang === "ru" ? "Описание" : "Tavsif"}</Label>
          <Textarea
            {...register("descriptionRu")}
            placeholder={lang === "ru" ? "Описание ru" : "Tavsif ru"}
          />
          <Textarea
            {...register("descriptionUz")}
            placeholder={lang === "ru" ? "Описание uz" : "Tavsif uz"}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p>{lang === "uz" ? "Qo'llanma" : "Руководство"}</p>
            <ul>
              <li className="flex items-center  gap-2.5">
                <span>#+text.</span> <MoveRight />
                <span className="flex items-center gap-2">
                  <Image src={HashMain} alt="light icon" />
                  text
                </span>
              </li>
              <li className="flex items-center  gap-2.5">
                <span>#-text.</span> <MoveRight />
                <span className="flex items-center gap-2 line-through">
                  <Image src={HashMain} alt="light icon" />
                  text
                </span>
              </li>
              <li className="flex items-center  gap-2.5">
                <span>*+text.</span> <MoveRight />
                <span className="flex items-center gap-2 ">
                  <Image src={Star1} alt="light icon" />
                  text
                </span>
              </li>
              <li className="flex items-center  gap-2.5">
                <span>*-text.</span> <MoveRight />
                <span className="flex items-center gap-2 line-through">
                  <Image src={Star1} alt="light icon" />
                  text
                </span>
              </li>
            </ul>
          </div>
          <Label>{lang === "ru" ? "Подробности" : "Ma'lumotlar"}</Label>
          <Textarea
            {...register("detailsRu")}
            placeholder={lang === "ru" ? "Подробности ru" : "Ma'lumotlar ru"}
          />
          <Textarea
            {...register("detailsUz")}
            placeholder={lang === "ru" ? "Подробности uz" : "Ma'lumotlar uz"}
          />
        </div>
      </div>
      <Button
        className="text-base font-normal col-span-2"
        variant={"main"}
        type="submit"
        disabled={isSubmitting}
      >
        {lang === "ru" ? "Сохранить" : "Saqlash"}
      </Button>
    </form>
  );
};

export default CreateTarifForm;
