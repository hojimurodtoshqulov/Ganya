import { FC } from "react";

interface Props {
  params: {
    lesson: string;
  };
}

const SingleLesson: FC<Props> = ({ params: { lesson } }): JSX.Element => {
  return <div>SingleLesson</div>;
};

export default SingleLesson;
