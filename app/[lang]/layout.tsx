import type { Metadata } from "next";
import { i18n } from "@/lib/i18n-config";
import { comfortaa, roboto } from "@/lib/fonts";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Академия родителей",
  description: "Первая обучающая платформа для родителей в Узбекистане",
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
      </head>
      <body className={`${roboto.variable} ${comfortaa.variable} bg-[#f9f9f9]`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
