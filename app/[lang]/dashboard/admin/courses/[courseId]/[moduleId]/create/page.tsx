import { FC } from "react";
import FormCreateLesson from "./FormCreateLesson";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";



export default async function CreateLesson({ params }: { params: any }) {
  const accessToken = cookies().get('accessToken')?.value;
  const dictionary = await getDictionary(params.lang);

  return (
    <><FormCreateLesson params={params} accToken={accessToken} dict={dictionary.dashboard} /></>

  );

}