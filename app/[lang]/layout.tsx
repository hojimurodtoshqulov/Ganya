import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { i18n } from "@/lib/i18n-config";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Ganya",
  description: "Online courses",
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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
