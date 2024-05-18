import { FC, ReactNode } from "react";
import { Locale } from "@/lib/i18n-config";
import InnerLayout from "./layout-inner";
import { getUserData } from "@/lib/actions/user";

interface Props {
  children: ReactNode;
  params: { lang: Locale };
}

const Layout: FC<Props> = async ({
  children,
  params: { lang },
}): Promise<JSX.Element> => {
  const user = await getUserData();

  return (
    <InnerLayout params={{ lang, role: user?.role }}>{children}</InnerLayout>
  );
};

export default Layout;
