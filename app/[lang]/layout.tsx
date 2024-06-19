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
  description:
    "Платформа 'Академия осознанного родительства' создана Ганей Усмановой – мамой, предпринимателем и инфлюенсером с реальным опытом воспитания двух детей. На платформе вы сможете получить знания и опыт, которые собраны не только на личном опыте воспитания двоих детей, но и подтверждены последними научными исследованиями.",
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
      <body className={`${roboto.variable} ${comfortaa.variable} bg-[#f9f9f9]`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
