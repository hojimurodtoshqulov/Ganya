import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";
import { FormSchemaType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getActionErrors = (
  fieldName: string,
  errors: ZodIssue[] | undefined,
) => {
  return errors
    ?.filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};

export async function fetchSendMessage(data: FormSchemaType) {
  const BASE_URL = "https://api.telegram.org";
  const TOKEN = process.env.BOT_TOKEN;
  // const TOKEN = '';
  const chatId = process.env.BOT_CHAT_ID;
  // const chatId = '

  try {
    const req = await fetch(`${BASE_URL}/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Name: ${data.fullName}. \nPhone: ${data.number} . \nIzoh: ${data.text}`,
      }),
    });
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getLangText = (
  lang: string,
  textUz: string,
  textRu: string,
): string => {
  return lang === "uz" ? textUz : textRu;
};
