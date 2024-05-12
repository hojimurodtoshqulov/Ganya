"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const StatusForm: FC<{ id: string }> = ({ id }): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseStatus", "completed");
    const res = await fetch(
      `https://oar-api.onrender.com/api/v1/courses/update/${id}`,
      {
        method: "PATCH",
        body: formData,
      },
    );
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
