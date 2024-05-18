"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAccessToken = async () => {
  const refreshToken = cookies().get("refreshToken")?.value;
  console.log(refreshToken, "refreshToken");
  if (!refreshToken) {
    redirect("/auth/sign-in");
  } else {
    const data = { refreshToken: JSON.parse(refreshToken) };
    console.log(data);
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh-access-token",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      redirect("/auth/sign-in");
      // console.log("token pge error");
    }
    const json = await res.json();
    console.log(json);
    cookies().set({
      name: "accessToken",
      value: JSON.stringify(json.accessToken),
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    return json;
  }
};
