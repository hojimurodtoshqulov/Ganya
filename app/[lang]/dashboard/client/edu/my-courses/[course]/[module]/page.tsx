import { FC } from "react";

interface Props {
  params: {
    module: string;
  };
}

const SingleModule: FC<Props> = ({ params: { module } }): JSX.Element => {
  console.log(module, "<singlemodule");
  return <div>SingleModule</div>;
};

export default SingleModule;
