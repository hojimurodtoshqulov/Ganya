import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./lib/i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getAccessToken } from "./lib/actions/token";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale ?? "ru"}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  const refreshToken = request.cookies.get("refreshToken")?.value ?? "";
  if (!refreshToken && pathname.indexOf("/dashboard") > -1) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  const accessToken = request.cookies.get("accessToken")?.value ?? "";
  if (!accessToken && pathname.includes("/dashboard")) {
    console.log("ref", refreshToken);
    const data = {
      refreshToken: refreshToken,
    };
    const response = NextResponse.next();
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh-access-token",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    response.cookies.set({
      name: "accessToken",
      value: JSON.stringify(json.accessToken),
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      path: "/",
    });

    return response;
  }
  if (pathname.includes("/dashboard")) {
    console.log(accessToken);
    let res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/profile", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });
    // if (res.status === 401) {
    //   console.log("su ishladi");
    //   const nr = await fetch(
    //     process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh-access-token",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ refreshToken: refreshToken }),
    //     },
    //   );
    //   if (nr.ok) {
    //     const j = await nr.json();
    //     console.log(j);
    //   }
    //   res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/profile", {
    //     cache: "no-store",
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    // }
    const json = await res.json();
    console.log("jeejejeejej", json);
    if (pathname.includes("/admin") && json?.role === "admin") {
      return NextResponse.next();
    } else if (pathname.includes("/client") && json?.role === "user") {
      console.log("user");
      return NextResponse.next();
    } else if (pathname.includes("/client") && json?.role !== "user") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    } else if (pathname.includes("/admin") && json?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    if (json?.refreshToken) {
      const response = NextResponse.next();

      response.cookies.set({
        name: "refreshToken",
        value: json?.refreshToken,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 6.5,
        path: "/",
      });
      return response;
    }
    if (!res.ok) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
