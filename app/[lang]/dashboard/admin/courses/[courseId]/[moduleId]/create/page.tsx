import { FC } from "react";
import FormCreateLesson from "./FormCreateLesson";

interface Props {
  params: any;
}

  
const CreateLesson: FC<Props> = ({ params }): JSX.Element => {
  return (
    <div><FormCreateLesson params={params} /></div>
  )
};

export default CreateLesson;
