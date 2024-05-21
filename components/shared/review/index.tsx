import { FC } from "react";

interface Props {
  id: string,
  username: string,
  occupationUz: string,
  occupationRu: string,
  textUz: string,
  textRu: string,
  isPublished: boolean,
  createdAt: string,
  updatedAt: string
}

const ReviewCard: FC<{review: Props, lang:'uz' | 'ru'}> = ({review, lang}): JSX.Element => {
  return (
    <div className="w-full bg-csneutral-100 p-5 md:p-10 rounded-[20px] md:rounded-[40px] flex flex-col justify-between gap-16">
      <p className="text-lg max-[450px]:text-base font-normal md:leading-8">{lang==="ru" ? review.textRu: review.textUz}</p>

      <div>
        <h2 className="text-3xl max-[450px]:text-2xl font-bold leading-5 text-csneutral-600 mb-2 font-comfortaa">
          {review.username}
        </h2>
        <span className="text-lg">{lang === "ru" ? review.occupationRu : review.occupationUz}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
