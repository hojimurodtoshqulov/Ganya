"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const ArchiveCourse: FC<{ id: string }> = ({ id }): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();

  const formData = new FormData();
  formData.append("courseStatus", "archived");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/courses/update/${id}`,
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (res.ok) {
      router.refresh();
      toast({
        description: "Course successfully archived!",
      });
    }
  }
  return (
    <form className="text-sm px-2 w-full" onSubmit={handleSubmit}>
      <button className="bg-none border-none w-full text-left">
        Переместить на архив
      </button>
    </form>
  );
};

export default ArchiveCourse;
