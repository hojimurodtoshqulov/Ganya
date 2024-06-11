import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import Link from "next/link";
import { FC } from "react";

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/all`, {
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
const AllUsersPage: FC<{
  params: { lang: "uz" | "ru" };
}> = async ({ params: { lang } }): Promise<JSX.Element> => {
  const users = await getData<{
    id: string;
    phone: string | null;
    email: string | null;
    role: string;
    avatar: string | null;
    name: string;
    surname: string;
    createdAt: string;
  }>();

  if (users instanceof Error) return <div>{users.message}</div>;

  return (
    <Table className="w-full bg-white border mb-5">
      <TableHeader>
        <TableRow>
          <TableHead>№</TableHead>
          <TableHead>{lang === "ru" ? "Телефон" : "Telefon"}</TableHead>
          <TableHead>{lang === "ru" ? "Email" : "Email"}</TableHead>
          <TableHead>{lang === "ru" ? "Имя" : "Ism"}</TableHead>
          <TableHead>{lang === "ru" ? "Фамилия" : "Familiya"}</TableHead>
          <TableHead>{lang === "ru" ? "Роль" : "Rol"}</TableHead>
          <TableHead>{lang === "ru" ? "Подробнее" : "Batafsil"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={user.id}>
            <TableCell className="w-max">{i + 1}</TableCell>
            <TableCell className="w-max">{user.phone ?? "----"}</TableCell>
            <TableCell className="w-max">{user.email ?? "----"}</TableCell>
            <TableCell className="w-max">{user.name}</TableCell>
            <TableCell className="w-max">{user.surname}</TableCell>
            <TableCell className="w-max">
              {user.role === "admin"
                ? lang === "ru"
                  ? "Админ"
                  : "Admin"
                : lang === "ru"
                  ? "Пользователь"
                  : "Foydalanuvchi"}
            </TableCell>
            <TableCell className="w-max">
              <Link
                href={`/${lang}/dashboard/admin/users/${user.id}`}
                className="underline"
              >
                {lang === "ru" ? "Подробнее" : "Batafsil"}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUsersPage;
