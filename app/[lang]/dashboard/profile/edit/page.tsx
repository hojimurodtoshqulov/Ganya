import { cookies } from "next/headers";
import FormEditProfile from "./FormEditProfile";

const getUser = async (accessToken: any) => {
  const api = process.env.NEXT_PUBLIC_BASE_URL + "/users/profile";
  try {
    const req = await fetch(api, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken ?? "")}`
      }
    })

    if (!req.ok) throw new Error('Не удалось получить')

    const res = await req.json()
    return res
  } catch (error: any) {
    console.log(error.message);
  }
}

export default async function EditPage({ params: { lang } }: { params: { lang: "ru" | "uz" } }) {
  const accessToken = cookies().get('accessToken')?.value;
  const user = await getUser(accessToken);

  return (
    <FormEditProfile lang={lang} defaultValue={user} accToken={accessToken} />
  )
}