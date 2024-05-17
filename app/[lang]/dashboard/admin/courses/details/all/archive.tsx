"use client";

import { useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/actions/token";
import { useRouter } from "next/navigation";
import { FC, FormEvent } from "react";

const ArchiveCourse: FC<{ id: string; accessToken?: string }> = ({
  id,
  accessToken,
}): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();

  const formData = new FormData();
  formData.append("courseStatus", "archived");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/courses/update/${id}`,
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
        process.env.NEXT_PUBLIC_BASE_URL + `/courses/update/${id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
    }

    if (res.ok) {
      router.refresh();
      toast({
        description: "Course successfully archived!",
      });
    }
    if (!res.ok) {
      const json = await res.json();
      toast({
        description: json?.message ?? "Something went wrong!",
        variant: "destructive",
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
