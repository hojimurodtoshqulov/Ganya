import Carousel from "@/components/shared/carousel";
import FAQ from "@/components/shared/faq";
import Fits from "@/components/shared/fits";

import CourceCard from "@/components/shared/cource-card/courceCard";

import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { courceCardData, about, about1, reviews } from "@/constants";

import { Accordion } from "@/components/shared/cource-card/accordian-card";
import { Play } from "lucide-react";
import Info from "@/components/shared/info/info";
import ReviewCard from "@/components/shared/review";
import TeamCard from "@/components/shared/team";
import Tariflar from "@/components/shared/tariflar/tariflar";
import Stati from "@/components/shared/stati/stati";
import CurseHelp from "@/components/shared/curs-helped";

export default function Home() {
  return (
    <div>
      <div id="about">
        <Showcase />
      </div>
      <div className="container">
        <div className="my-10 md:my-32 bg-csneutral-100 rounded-2xl md:rounded-[40px] flex items-center justify-center w-full aspect-[3/2] md:aspect-[5/2]">
          <Play size={60} fill="#D5D6D8" className="text-csneutral-300" />
        </div>
      </div>
      <div className="container">
        <Info {...about} />
      </div>
      <div className="container">
        <div className="w-full bg-csneutral-100 rounded-2xl md:rounded-[40px] aspect-[2/1] md:aspect-[4/1] my-10 md:my-20" />
      </div>
      <div className="container">
        <Info {...about1} sort={true} />
      </div>

      <div className="mt-20">
        <CurseHelp />
      </div>
      <div className="container">
        <div className="w-full bg-csneutral-100 rounded-2xl md:rounded-[40px] aspect-[2/1] md:aspect-[4/1] my-10 md:my-20" />
      </div>
      <Fits />

      <div className="container my-20" id="courses">
        <Accordion type="single" collapsible>
          <CourceCard courceCard={courceCardData} />
        </Accordion>
      </div>

      <div className="container mb-16">
        <Carousel
          title="Отзывы прошлых потоков:"
          data={[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        />
      </div>
      <div className="container mb-16" id="team">
        <Carousel
          title="Команда"
          data={[0, 1, 2, 3, 4, 5].map((r, i) => (
            <TeamCard key={i} />
          ))}
        />
      </div>
      <div className="container">
        <div className="w-full bg-csneutral-100 rounded-2xl md:rounded-[40px] aspect-[2/1] md:aspect-[4/1] my-10 md:my-20" />
      </div>

      <div className="container">
        <Tariflar />
      </div>
      <FAQ />

      <div id="articles">
        <Stati />
      </div>

      <div id="contacts">
        <SubscribtionForm />
      </div>
    </div>
  );
}
