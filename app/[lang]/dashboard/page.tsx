import { getAccessToken } from "@/lib/actions/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

const Dashboard = async () => {
  const accessToken = cookies().get("accessToken")?.value ?? "";
  if (accessToken) {
    let res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/profile", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });
    // if (res.status === 401) {
    //   const json = await getAccessToken();
    //   res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/profile", {
    //     cache: "no-store",
    //     headers: {
    //       Authorization: `Bearer ${JSON.parse(accessToken)}`,
    //     },
    //   });
    // }

    // if (!res.ok) {
    //   redirect("/auth/sign-in");
    // }
    const json = await res.json();
    if (json.role === "admin") {
      console.log("admin dash", "<<<---");
      redirect("/dashboard/admin/courses");
    } else if (json.role === "user") {
      redirect("/dashboard/client/edu");
    }
    console.log(json, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,");
  }
};

export default Dashboard;
