import { FC, ReactNode } from "react";
import { Locale } from "@/lib/i18n-config";
import InnerLayout from "./layout-inner";
import { getUserData } from "@/lib/actions/user";
import { getDictionary } from "@/lib/get-dictionary";
import { UserButton } from "@/components/dashboard/details/userButton";

interface Props {
  children: ReactNode;
  params: { lang: Locale };
}

const Layout: FC<Props> = async ({
  children,
  params: { lang },
}): Promise<JSX.Element> => {
  const user = await getUserData();
  if (user instanceof Error) return <div>Something went wrong</div>;
  const dictionary = await getDictionary(lang);

  return (
    <InnerLayout
      params={{ lang, role: user?.role }}
      dictionary={dictionary.dashboard.admin.saidbar}
      userButton={<UserButton lang={lang} />}
    >
      {children}
    </InnerLayout>
  );
};

export default Layout;
