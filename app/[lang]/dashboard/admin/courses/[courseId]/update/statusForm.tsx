"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/actions/token";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const StatusForm: FC<{ id: string; accessToken?: string }> = ({
  id,
  accessToken,
}): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseStatus", "completed");
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/update/${id}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      },
    );
    if (res.status === 401) {
      const json = await getAccessToken();
      res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/courses/update/${id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
    }
    const data = await res.json();

    if (!res.ok) {
      toast({ description: data.message, variant: "destructive" });
    }
    if (res.ok) {
      router.refresh();

      toast({
        description: "Course successfully edited!",
      });
    }
  };
  return (
    <form onSubmit={(e) => submit(e)}>
      <Button variant={"main"} size={"sm"} className="text-sm px-6">
        Опубликовать
      </Button>
    </form>
  );
};

export default StatusForm;
