"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const DeleteCourse: FC<{ id: string }> = ({ id }): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/courses/remove/${id}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      router.refresh();
      toast({
        description: "Course successfully archived!",
      });
    } else {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }
  return (
    <form className="px-2 w-full" onSubmit={handleSubmit}>
      <button className="text-sm text-destructive bg-none border-none w-full text-left">
        Удалить
      </button>
    </form>
  );
};

export default DeleteCourse;
