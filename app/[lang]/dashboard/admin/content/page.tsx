import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Banner from "@/components/dashboard/kontent";
import Sharhlar from "@/components/dashboard/comments";
import MainVideo from "./main-video";
import About from "./about";
import Course from "./course";

const Content: FC<{ params: { lang: "uz" | "ru" } }> = ({
  params: { lang },
}): JSX.Element => {
  return (
    <div>
      <h3 className="font-comfortaa font-bold text-[26px] text-main-300 capitalize">
        {lang === "ru" ? "контент" : "Kontent"}
      </h3>

      <Tabs defaultValue="banners">
        <TabsList className="mb-3 sm:mb-6">
          <TabsTrigger value="banners">
            {lang === "ru" ? "Баннеры" : "Bannerlar"}
          </TabsTrigger>
          <TabsTrigger value="fikrlar">
            {lang === "ru" ? "Отзывы" : "Sharhlar"}
          </TabsTrigger>
          <TabsTrigger value="main_video">
            {lang === "ru" ? "Главное видео" : "Asosiy video"}
          </TabsTrigger>
          <TabsTrigger value="about">
            {lang === "ru" ? "О нас" : "Biz haqimizda"}
          </TabsTrigger>
          <TabsTrigger value="course">
            {lang === "ru" ? "Курс" : "Kurs"}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="banners">
          <Banner lang={lang} />
        </TabsContent>
        <TabsContent value="fikrlar">
          <Sharhlar lang={lang} />
        </TabsContent>
        <TabsContent value="main_video">
          <MainVideo lang={lang} />
        </TabsContent>
        <TabsContent value="about">
          <About lang={lang} />
        </TabsContent>
        <TabsContent value="course">
          <Course lang={lang} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
