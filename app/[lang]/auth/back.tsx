import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Back: FC<{ lang: "uz" | "ru" }> = ({ lang }): JSX.Element => {
  return (
    <Link
      href={`/${lang}`}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex items-center gap-2 fixed top-5 left-5",
      )}
    >
      <ArrowLeft />
      {/* {lang === "ru" ? "Назад" : "Orqaga"} */}
    </Link>
  );
};

export default Back;
