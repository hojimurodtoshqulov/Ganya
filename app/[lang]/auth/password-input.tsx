import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Eye from "@/icons/Eye.svg";
import ClosedEye from "@/icons/closed-eye.svg";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={open ? "text" : "password"}
          className={cn(
            "flex h-14 w-full rounded-xl border-2 border-csneutral-200 bg-background p-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:!border-main-200 disabled:cursor-not-allowed disabled:opacity-50 pr-12 placeholder:text-csneutral-400",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="absolute top-0 right-0 hover:bg-transparent"
          onClick={() => setOpen((p) => !p)}
        >
          <Image alt="icon" src={open ? Eye : ClosedEye} />
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
