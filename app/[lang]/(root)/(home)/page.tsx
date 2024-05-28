import Carousel from "@/components/shared/carousel";
import FAQ from "@/components/shared/faq";
import Fits from "@/components/shared/fits";
import CourceCard from "@/components/shared/cource-card/courceCard";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { Accordion } from "@/components/shared/cource-card/accordian-card";
import { Play } from "lucide-react";
import Info from "@/components/shared/info/info";
import TeamCard from "@/components/shared/team";
import Tariflar from "@/components/shared/tariflar/tariflar";
import Stati from "@/components/shared/stati/stati";
import CurseHelp from "@/components/shared/curs-helped";
import { teamMembers } from "@/constants/team";
import { getDictionary } from "@/lib/get-dictionary";
import MainVideo from "@/components/shared/main-video";
import Banner from "@/components/shared/banner";
import { Toaster } from "react-hot-toast";
import Reviews from "@/components/shared/review/reviews";

// async function getData<T>(): Promise<T[] | Error> {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + "/courses/all?status=completed",
//     {
//       cache: "no-store",
//     },
//   );



//   if (!res.ok) {
//     return new Error("Failed to fetch data");
//   }

//   return res.json();
// }

async function getCourse<T>(id: string): Promise<T[] | Error> {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/courses/single/" + id,
      {
        cache: "no-store",
      },
    );



    if (!res.ok) {
      return new Error("Failed to fetch data");
    }

    return res.json();
  } catch (e) {
    return new Error("Failed to fetch data");
  }
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: "ru" | "uz" };
}) {
  // const data = await getData<{
  //   id: string;
  // }>();

  // if (data instanceof Error) {
  //   return <h2>Failed to fetch data.</h2>;
  // }
  // // const courseId = data.pop()?.id ?? "";
  // const course = await getCourse<{
  //   id: string;
  //   titleUz: string;
  //   titleRu: string;
  //   image: string;
  //   descriptionUz: string;
  //   descriptionRu: string;
  //   courseStatus: string;
  //   Module: any[];
  // }>(courseId);

  // if (course instanceof Error) {
  //   return <h2>Failed to fetch data.</h2>;
  // }

  const dcitionary = await getDictionary(lang);
  return (
    <div>
      <div id="about">
        <Showcase dict={dcitionary.home} />
      </div>

      <div className="container">
        <MainVideo />
      </div>

      <div className="container">
        <Info lang={lang} data={dcitionary.home.abaut} />
      </div>

      <div className="container">
        <div className="my-10 md:my-20">
          <Banner />
        </div>
      </div>

      <div className="container">
        <Info sort={true} lang={lang} data={dcitionary.home.Lure} />
      </div>

      <div className=" mt-10 md:mt-20">
        <CurseHelp help={dcitionary.home.help} />
      </div>

      <div className="container">
        <div className="my-10 md:my-20">
          <Banner />
        </div>
      </div>

      <Fits fits={dcitionary.home.whocurse} />

      <div className="container my-10 md:my-20" id="courses">
        <Accordion type="single" collapsible>
          <CourceCard id={"66549f7c1eaeb378fe5fe9cb"} lang={lang} />
        </Accordion>
      </div>

      <div id="contacts">
        <SubscribtionForm dict={dcitionary.home} />
      </div>


      <div className="container my-10 md:my-20">
        <Reviews lang={lang} />
      </div>

      <div className="container my-10 md:my-20" id="team">
        <Carousel
          title={dcitionary.home.team.title}
          data={[...teamMembers, ...teamMembers].map((team, i) => (
            <TeamCard key={i} data={team} />
          ))}
        />
      </div>

      <div className="container">
        <div className="my-10 md:my-20">
          <Banner />
        </div>
      </div>

      <div className="container my-10 md:my-20">
        <Tariflar id={"66549f7c1eaeb378fe5fe9cb"} lang={lang} />
      </div>

      <FAQ
        title={dcitionary.home.answear.title}
        cards={dcitionary.home.answear.cards}
      />

      <div id="articles">
        <Stati
          container="container"
          lang={lang}
          articles={dcitionary.home.articlesHome}
        />
      </div>
    </div>
  );
}
