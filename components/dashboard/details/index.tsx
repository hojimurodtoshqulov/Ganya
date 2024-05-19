import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/images/dashboard-logo.svg";
import Message from "@/images/message.svg";
import { FC } from "react";
import { ChevronRight, LucideIcon, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo: FC = (): JSX.Element => {
  return (
    <Link href={"/"}>
      <Image src={LogoImg} alt="dashboard-logo" width={146} height={42} />
    </Link>
  );
};

export const SidebarContact: FC<{ lang: 'ru' | 'uz' }> = ({lang}): JSX.Element => {
  return (
    <Link
      href={"#"}
      className="h-[68px] w-full bg-csneutral-100 rounded-xl px-6 py-4 flex gap-3 items-center"
    >
      <Image
        src={Message}
        width={24}
        height={24}
        alt="message"
        className="flex-shrink-0"
      />
      <div>
        <h5 className="font-bold text-sm font-comfortaa">{lang === "ru" ? "Связаться с нами" : "Biz bilan bog'lanish" }</h5>
        <p className="text-xs text-csneutral-400">{lang === "ru" ? "Ответим на все вопросы" : "Biz barcha savollarga javob beramiz"}</p>
      </div>
      <ChevronRight size={20} className="flex-shrink-0" />
    </Link>
  );
};

interface SidebarBtnProps {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  className?: string;
}

export const SidebarButton: FC<SidebarBtnProps> = ({
  label,
  icon: Icon,
  active,
  className,
}): JSX.Element => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center py-4 px-6 rounded-xl w-full cursor-pointer font-normal",
        {
          "text-main-300 bg-main-300/10": active,
        },
        className,
      )}
    >
      <Icon width={24} height={24} />
      <span>{label}</span>
    </div>
  );
};

export const UserButton: FC = (): JSX.Element => {
  return (
    <div className="flex gap-2 items-center">
      <UserCircle size={40} className="rounded-full" />
      <div className="hidden sm:block">
        <h5 className="font-bold text-sm font-comfortaa">John Doe</h5>
        <p className="text-xs text-csneutral-400">Ученик</p>
      </div>
    </div>
  );
};
