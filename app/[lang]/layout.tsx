import type { Metadata } from "next";
import { comfortaa, roboto } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import appleTouchIcon from "../icons/apple-touch-icon.png";
import favicon32 from "../icons/favicon-32x32.png";
import favicon16 from "../icons/favicon-16x16.png";
import Script from "next/script";

import "../globals.css";

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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TWVPFKX4');
          `}
        </Script>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWVPFKX4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
