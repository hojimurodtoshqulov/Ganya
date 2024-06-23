import React from "react";
import Carousel from "../carousel";
import { getDictionary } from "@/lib/get-dictionary";
import ReviewCard from ".";
interface Review {
  id: string;
  username: string;
  occupationUz: string;
  occupationRu: string;
  textUz: string;
  textRu: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const Reviews = async ({ lang }: { lang: "uz" | "ru" }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/all`, {
    cache: "no-store",
  });
  const dcitionary = await getDictionary(lang);
  if (!res.ok) {
    return <div>Something went wrong</div>;
  }
  const dataComment = await res?.json();
  const dataComments = dataComment;
  return (
    <Carousel
      title={dcitionary.home.Reviews.title}
      data={dataComments.map((r: Review, i: number) => (
        <ReviewCard key={i} review={r} lang={lang} />
      ))}
    />
  );
};

export default Reviews;
