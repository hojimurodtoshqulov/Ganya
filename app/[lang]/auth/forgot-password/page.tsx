import { FC } from "react";
import Form from "./form";

const ForgotPassword: FC<{
  params: { lang: "uz" | "ru" };
}> = ({ params: { lang } }): JSX.Element => {
  return (
    <div className="w-full max-w-96">
      <h2></h2>
      <Form lang={lang} />
    </div>
  );
};

export default ForgotPassword;
