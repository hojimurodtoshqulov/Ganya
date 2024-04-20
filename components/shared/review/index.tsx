import { FC } from "react";

interface Props {
  name: string;
  title: string;
  text: string;
}

const ReviewCard: FC<Props> = ({ name, text, title }): JSX.Element => {
  return (
    <div className="w-full bg-csneutral-100 p-5 md:p-10 rounded-[20px] md:rounded-[40px] flex flex-col justify-between min-h-[480px]">
      <p className="mb-10 text-lg font-normal md:leading-8">{text}</p>

      <div>
        <h2 className="text-3xl font-bold leading-5 text-csneutral-600 mb-2 font-comfortaa">
          {name}
        </h2>
        <span className="text-lg">{title}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
