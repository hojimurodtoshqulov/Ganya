import React from "react";
import FormEditArticle from "./FormEdit";
import { cookies } from "next/headers";
import { date } from "zod";

interface Props {
  params: {
    articlesId: string;
  };
}
async function getData(id: string) {
  const response = await fetch(
    `https://oar-api.onrender.com/api/v1/articles/single/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return new Error("Failed to fetch data");
  }

  return response.json();
}

const Post: React.FC<Props> = async ({ params }) => {
  const data = await getData(params.articlesId);

  if (data instanceof Error) return <div>{data.message}</div>;
  const accessToken = cookies().get("accessToken")?.value;
  return (
    <>
      <FormEditArticle
        articleId={params.articlesId}
        defaultValues={data}
        accessToken={accessToken}
      />
    </>
  );
};

export default Post;
