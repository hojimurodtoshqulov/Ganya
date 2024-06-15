"use server";

import { cookies } from "next/headers";

export const saveLang = async (lang: "uz" | "ru") => {
  cookies().set("lang", lang);
};
