import React from "react";
import FormEditArticle from "./FormEdit";

interface Props {
  params: {
    articlesId: string;
  };
}
async function getData(id: string) {
  const response = await fetch(
    `https://oar-api.onrender.com/api/v1/articles/single/${id}`,
  );

  if (!response.ok) {
    return new Error("Failed to fetch data");
  }

  return response.json();
}

const Post: React.FC<Props> = async ({ params }) => {
  const data = await getData(params.articlesId);
  if (data instanceof Error) return <div>{data.message}</div>;

  return (
    <>
      <FormEditArticle articleId={params.articlesId} defaultValues={data} />
    </>
  );
};

export default Post;
