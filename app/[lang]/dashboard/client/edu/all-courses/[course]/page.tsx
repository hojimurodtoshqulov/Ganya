import { FC } from "react";

interface Props {
  params: {
    course: string;
  };
}

const OneOfAllCourses: FC<Props> = ({ params: { course } }): JSX.Element => {
  return <div>OneOfAllCourses</div>;
};

export default OneOfAllCourses;
