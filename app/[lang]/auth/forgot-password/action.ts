"use server";
import { cookies } from "next/headers";

export const fs = async (json: any, key: string) => {
  cookies().set({
    name: "forgot-sms",
    value: JSON.stringify({
      sessionId: json.sessionId,
      path: key,
    }),
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 60 * 1000),
  });
};
