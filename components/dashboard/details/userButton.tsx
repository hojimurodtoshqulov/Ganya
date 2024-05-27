import { getUserData } from "@/lib/actions/user";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const UserButton: FC<{
  lang: "uz" | "ru";
}> = async ({ lang }): Promise<JSX.Element> => {
  const user = await getUserData();

  return (
    <Link
      href={`/${lang}/dashboard/profile`}
      className="flex gap-2 items-center"
    >
      {user?.image ? null : ( // <Image />
        <UserCircle size={40} className="rounded-full" />
      )}
      <div className="hidden sm:block">
        <h5 className="font-bold text-sm font-comfortaa">
          {user?.name + " " + user?.surname}
        </h5>
        <p className="text-xs text-csneutral-400">
          {user?.role === "user"
            ? lang === "ru"
              ? "Ученик"
              : "O'quvchi"
            : lang === "uz"
              ? "Admin"
              : "Администратор"}
        </p>
      </div>
    </Link>
  );
};
