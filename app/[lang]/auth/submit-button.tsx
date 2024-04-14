"use client";
import { Button } from "@/components/ui/button";
import { FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  children: ReactNode;
  className?: string;
}

const SubmitBtn: FC<Props> = ({ children, className }): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={"main"}
      className={className}
      disabled={pending}
    >
      {children}
    </Button>
  );
};

export default SubmitBtn;
