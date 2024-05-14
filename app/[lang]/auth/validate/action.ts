"use server";

import { cookies } from "next/headers";

export const btn = async () => {
  cookies().set("new", "hello world");
};
