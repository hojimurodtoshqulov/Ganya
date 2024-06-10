import { cookies } from "next/headers";
import Image from "next/image";
import { FC } from "react";

async function getData<T>(id: string): Promise<T | Error> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${JSON.parse(cookies().get("accessToken")?.value ?? "")}`,
    },
  });
  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}
const UserDetails: FC<{
  params: {
    userId: string;
    lang: "uz" | "ru";
  };
}> = async ({ params: { userId, lang } }): Promise<JSX.Element> => {
  const data = await getData<{
    user: {
      id: string;
      phone: string | null;
      email: string | null;
      role: string;
      avatar: string | null;
      name: string;
      surname: string;
      createdAt: string;
    };
    courses: {
      id: string;
      titleUz: string;
      titleRu: string;
      image: string;
      descriptionUz: string;
      descriptionRu: string;
      courseStatus: string;
      plan: {
        id: string;
        price: number;
        availablePeriod: number;
        titleUz: string;
        titleRu: string;
        includeSupport: boolean;
        includeResources: boolean;
        includePrivateGroupAccess: boolean;
        descriptionUz: string;
        descriptionRu: string;
        detailsUz: string;
        detailsRu: string;
        discount?: number;
        discountExpiredAt?: string;
      };
    }[];
  }>(userId);
  if (data instanceof Error) return <div>Something went wrong</div>;
  const { user, courses } = data;
  return (
    <>
      <div className="flex gap-10 bg-white rounded-lg p-2.5">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="user avatar"
            width={128}
            height={128}
            className="rounded-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-md bg-csneutral-100 flex items-center justify-center">
            {lang === "ru" ? "Аватар" : "Avatar"}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-medium">
            {user.name} {user.surname}
          </h2>
          <p>
            {user.email
              ? user.email
              : lang === "ru"
                ? "Электронная почта недоступна"
                : "Email pochta mavjud emas"}
          </p>
          <p>
            {user.phone
              ? user.phone
              : lang === "ru"
                ? "Телефон недоступен"
                : "Telefon mavjud emas"}
          </p>
        </div>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-3 mt-10">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl">
              <div className="relative w-full aspect-video">
                <Image src={course.image} alt="course image" fill />
              </div>
              <div className="p-2.5">
                <h3 className="text-xl font-medium">
                  {lang === "ru" ? course.titleRu : course.titleUz}
                </h3>
                <div className="flex gap-2 justify-between mt-2.5">
                  <span>
                    {lang === "ru" ? "Название тарифа" : "Tarif nomi"}:
                  </span>
                  <span>
                    {lang === "ru" ? course.plan.titleRu : course.plan.titleUz}
                  </span>
                </div>
                <div className="flex gap-2 justify-between">
                  <span>{lang === "ru" ? "Стоимость" : "Tarif narxi"}:</span>
                  <span>
                    {course.plan.price} {lang === "ru" ? "сум" : "so'm"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl mt-5">
          {lang === "ru" ? "Курс не куплен" : "Kurs sotib olinmagan"}
        </h2>
      )}
    </>
  );
};

export default UserDetails;
