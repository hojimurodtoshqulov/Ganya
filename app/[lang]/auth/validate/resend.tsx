"use client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { FC, useEffect, useState } from "react";

const ResendCode: FC<{ sms?: RequestCookie }> = ({ sms }): JSX.Element => {
  console.log(sms?.value, "<--resend data");

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
        onClick={async () => {
          setDisBtn(true);
        }}
        type="button"
      >
        Отправить код еще раз
      </button>
    </div>
  );
};

export default ResendCode;
