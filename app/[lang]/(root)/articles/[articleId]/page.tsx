import { FC } from "react";

interface Props {
  params: {
    atricleId: string;
  };
}

const SingleArticle: FC<Props> = ({ params: { atricleId } }): JSX.Element => {
  return <div>SingleArticle</div>;
};

export default SingleArticle;
