"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserData = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let user = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/profile", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`,
    },
  });
  if (!user.ok) {
    redirect("/auth/sign-in");
  }
  const json = await user.json();

  return json;
};

export const logout = async (e: string) => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect(e);
};
