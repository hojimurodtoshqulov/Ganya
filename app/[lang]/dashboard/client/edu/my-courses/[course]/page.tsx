import { FC } from "react";

interface Props {
  params: {
    course: string;
  };
}

const OneOfMyCourses: FC<Props> = ({ params: { course } }): JSX.Element => {
  return <div>OneOfMyCourses</div>;
};

export default OneOfMyCourses;
