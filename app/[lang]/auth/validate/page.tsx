import { FC } from "react";
import { cookies } from "next/headers";
import Form from "./form";
import { smsValidateAction } from "@/lib/actions/auth.actions";

const ValidateSMS: FC = (): JSX.Element => {
  const sms = cookies().get("sms");

  return (
    <div className="max-w-[472px] flex flex-col gap-6 justify-center w-full rounded-2xl overflow-hidden bg-white p-6">
      <div className="text-center space-y-1">
        <h2 className="text-h2">Регистрация</h2>
        <p className="text-lg">Займет всего минуту</p>
      </div>
      <Form action={smsValidateAction} sms={sms} />
    </div>
  );
};

export default ValidateSMS;
