"use server";

import { cookies } from "next/headers";

export async function clearCookies() {
  const all = cookies().getAll();
  all.map((c) => cookies().delete(c.name));
}
