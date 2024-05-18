import { FC } from "react";
import FormCreateLesson from "./FormCreateLesson";
import { cookies } from "next/headers";

interface Props {
  params: any;
}


const CreateLesson: FC<Props> = ({ params }): JSX.Element => {
  const accessToken = cookies().get('accessToken')?.value;


  return (
    <div><FormCreateLesson params={params} accToken={accessToken} /></div>
  )
};

export default CreateLesson;
