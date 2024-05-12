"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FC, useState } from "react";
import SubmitBtn from "../submit-button";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import ResendCode from "./resend";

type ActionReturn = {
  errorMessage?: string;
  successMessage?: string;
};

interface Props {
  action: (params: FormData) => Promise<ActionReturn>;
  sms?: RequestCookie;
}

const Form: FC<Props> = ({ action, sms }): JSX.Element => {
  const [state, setState] = useState<ActionReturn>();
  console.log(state);
  if (!sms) {
    redirect("/auth/sign-up");
  }

  const smsData = JSON.parse(sms?.value);

  return (
    <form
      className="flex flex-col gap-6"
      action={async (e: FormData) => {
        const res = await action(e);
        setState(res);
        if (res?.successMessage) {
          redirect("/dashboard/client/edu");
        }
      }}
    >
      <InputOTP maxLength={5} name="code">
        <InputOTPGroup className="flex items-center justify-center gap-2 w-full">
          {[0, 1, 2, 3, 4].map((i) => (
            <InputOTPSlot
              index={i}
              key={i}
              className={cn({ "border-destructive ": state?.errorMessage })}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <input
        name="sessionId"
        defaultValue={smsData.sessionId}
        className="hidden"
      />
      <ResendCode sms={sms} />
      <SubmitBtn>Подтвердить</SubmitBtn>
    </form>
  );
};

export default Form;
