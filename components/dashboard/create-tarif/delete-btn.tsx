"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken } from "@/lib/actions/token";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

const DeleteBtn: FC<{ id: string; accessToken?: string }> = ({
  id,
  accessToken,
}): JSX.Element => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const { toast } = useToast();
  const router = useRouter();

  const submit = async () => {
    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/plans/delete/" + id,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
        },
      },
    );
    if (res.status === 401) {
      const json = await getAccessToken();
      res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/plans/delete/" + id,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
          },
        },
      );
    }
    if (!res.ok) {
      toast({
        description: "Something went wrong!",
        variant: "destructive",
      });
    } else {
      router.refresh();
      toast({
        description: "Plan successfully deleted!",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <Button
        variant="outline"
        size={"sm"}
        className="border-destructive text-destructive w-full"
        disabled={isSubmitting}
      >
        Delete
      </Button>
    </form>
  );
};

export default DeleteBtn;
