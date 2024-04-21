"use client";
import { FC } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface Props {}

const Link: FC<Props> = ({}): JSX.Element => {
  const pathname = usePathname();

  return (
    <NextLink
      href={`${pathname}/my-courses/nimadir-course`}
      className={cn(
        buttonVariants({ variant: "main" }),
        "w-full sm:w-max px-8 text-sm md:text-base",
      )}
    >
      Treningga o'tish
    </NextLink>
  );
};

export default Link;
