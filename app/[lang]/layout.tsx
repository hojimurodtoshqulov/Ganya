import type { Metadata } from "next";
import { comfortaa, roboto } from "@/lib/fonts";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import appleTouchIcon from "../icons/apple-touch-icon.png";
import favicon32 from "../icons/favicon-32x32.png";
import favicon16 from "../icons/favicon-16x16.png";

export const metadata: Metadata = {
  title: "Академия родителей",
  description: "Первая обучающая платформа для родителей в Узбекистане",
  openGraph: {
    title: "Академия родителей",
    description: "Первая обучающая платформа для родителей в Узбекистане",
    url: "https://academiaroditeley.com/",
    siteName: "Академия родителей",
    locale: "ru",
    type: "website",
  },
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <head>
        <meta
          name="instagram"
          content="https://academiaroditeley.com/ru?utm_source=instagram&utm_medium=cpc&utm_campaign=promo"
        />
        <meta
          name="google"
          content="https://academiaroditeley.com/ru?utm_source=google&utm_medium=cpc&utm_campaign=promo"
        />
        <meta
          name="facebook"
          content="https://academiaroditeley.com/ru?utm_source=facebook&utm_medium=cpc&utm_campaign=promo"
        />
        <meta
          name="telegram"
          content="https://academiaroditeley.com/ru?utm_source=telegram&utm_medium=cpc&utm_campaign=promo"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={appleTouchIcon.src}
        />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16.src} />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${roboto.variable} ${comfortaa.variable} bg-[#f9f9f9]`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
