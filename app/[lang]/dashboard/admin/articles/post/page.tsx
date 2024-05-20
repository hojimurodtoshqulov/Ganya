import { cookies } from "next/headers";
import FormPostArticle from "./formPost";
import { getDictionary } from "@/lib/get-dictionary";

interface PageProps {
  params: {
    lang: "uz" | "ru";
  };
}

export default async function Page({ params: { lang } }: PageProps) {
  const accessToken = cookies().get("accessToken")?.value;
  const langue = await getDictionary(lang);
  return (
    <>
      <FormPostArticle lang={lang} langue={langue} accessToken={accessToken} />
    </>
  );
}
