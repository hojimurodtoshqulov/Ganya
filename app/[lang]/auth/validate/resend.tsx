"use client";
import { useToast } from "@/components/ui/use-toast";
import { registerAction } from "@/lib/actions/auth.actions";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { FC, useEffect, useState } from "react";

const ResendCode: FC<{ sms?: RequestCookie }> = ({ sms }): JSX.Element => {
  const smsData = JSON.parse(sms?.value ?? '{}');
console.log(smsData, new Date())
  const { toast } = useToast();

  const handleClick = async() => {
    setDisBtn(true);

    const formData = new FormData();
    formData.append("emailOrPhone", smsData?.[smsData?.path]);
    formData.append("password", smsData?.password);
    formData.append("confirmPassword", smsData?.password);
    formData.append("terms", 'on');

    const res = await registerAction(formData);
    if(res?.errors){
      console.log('validation error',res?.errors)
    }else if(res?.sessionId){
      console.log(res?.sessionId,"<-- sessionId")
    }
    else{
      toast({
        description: res?.message,
        variant: "destructive",
       });
    }
    setDisBtn(false);
    setTime(59);
  }

  const [time, setTime] = useState(59);
  const [disBtn, setDisBtn] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <span>00 : {time > 9 ? time : "0" + time}</span>
      <button
        className="bg-none border-none text-main-300 text-sm disabled:cursor-not-allowed disabled:text-csneutral-400"
        disabled={time > 0 || disBtn}
        onClick={handleClick}
        type="button"
      >
        Отправить код еще раз
      </button>
    </div>
  );
};

export default ResendCode;
