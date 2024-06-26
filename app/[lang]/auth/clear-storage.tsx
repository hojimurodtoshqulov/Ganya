"use client";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import { FC } from "react";
import { clearCookies } from "./clear-cookie";
import { useRouter } from "next/navigation";

const ClearStorage: FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="fixed top-5 right-5"
      onClick={() => {
        const f = async () => {
          await clearCookies();
        };
        f();
        router.refresh();
        localStorage.clear();
        sessionStorage.clear();
      }}
    >
      <Paintbrush />
    </Button>
  );
};

export default ClearStorage;
