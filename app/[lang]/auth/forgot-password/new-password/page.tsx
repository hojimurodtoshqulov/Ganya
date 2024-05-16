import { FC } from "react";
import Form from "./form";
import { cookies } from "next/headers";

const NewPassword: FC = (): JSX.Element => {
  const sms = JSON.parse(cookies().get("forgot-sms")?.value ?? "{}");

  return (
    <div className="w-full max-w-96">
      <Form sms={sms} />
    </div>
  );
};

export default NewPassword;
