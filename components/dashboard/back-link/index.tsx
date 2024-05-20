"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  title: string;
  heading?: string;
}

const BackLink: FC<Props> = ({ title, heading }): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname, "<----patname");
  // router.push()
  return (
    <>
      <div
        className="flex items-center gap-1 mb-1 md:mb-2.5 cursor-pointer"
        onClick={() => router.back()}
      >
        <ChevronLeft width={16} height={16} className="flex-shrink-0" />
        <p className="text-sm font-normal">{title}</p>
      </div>
      <h2 className="text-2xl font-semibold text-main-300 tracking-wide">
        {heading}
      </h2>
    </>
  );
};

export default BackLink;
