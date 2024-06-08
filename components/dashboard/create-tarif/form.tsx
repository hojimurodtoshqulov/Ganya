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
          <Label htmlFor="titleUz">Title</Label>
          <Input id="titleUz" placeholder="Title uz" {...register("titleUz")} />
          <Input id="titleRu" placeholder="Title ru" {...register("titleRu")} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="load">Davomiyligi</Label>
          <Input
            type="number"
            id="load"
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
            onCheckedChange={(e) =>
              setValue("includeResources", e ? "on" : "of")
            }
            {...register("includeResources")}
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
            onCheckedChange={(e) =>
              setValue("includeSupport", e ? "on" : "off")
            }
            {...register("includeSupport")}
          />
          <label
            htmlFor="support"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Онлайн консультации.
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
            VIP group
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
        <div className="w-full items-center gap-1.5 flex">
          <div>
            <Label htmlFor="discount">Discount</Label>
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
            <Label htmlFor="discounExpiredAt">Discount expired </Label>
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
          <Label>Description</Label>
          <Textarea
            {...register("descriptionRu")}
            placeholder="Description ru"
          />
          <Textarea
            {...register("descriptionUz")}
            placeholder="Description uz"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Details</Label>
          <Textarea {...register("detailsRu")} placeholder="Details ru" />
          <Textarea {...register("detailsUz")} placeholder="Details uz" />
        </div>
      </div>
      <Button
        className="text-base font-normal col-span-2"
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
