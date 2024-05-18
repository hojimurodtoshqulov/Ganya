import { cookies } from "next/headers";
import FormPostArticle from "./formPost";

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const accessToken = cookies().get("accessToken")?.value;
  return (
    <>
      <FormPostArticle accessToken={accessToken} />
    </>
  );
};

export default Page;
