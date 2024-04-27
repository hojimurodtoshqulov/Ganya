"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string | number;
  className?: string;
}

const LinkById: FC<Props> = ({ children, href, className }): JSX.Element => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${href}`} className={className}>
      {children}
    </Link>
  );
};

export default LinkById;
