import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import AllCourses from "./details/all";
import AddNewCourse from "./details/add-course";
import ProgresCourses from "./details/all/progress";
import ArchivedCourses from "./details/all/archived";
import { cookies } from "next/headers";

const CoursesPage: FC<{ params: { lang: "uz" | "ru" } }> = ({
  params: { lang },
}): JSX.Element => {
  const accessToken = cookies().get("accessToken")?.value;
  console.log(accessToken, "acc token");
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-comfortaa font-bold text-[26px] text-main-300">
          Kurslar
        </h3>
        <AddNewCourse accessToken={accessToken} lang={lang} />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-3 sm:mb-6">
          <TabsTrigger value="all">Barcha kurslar</TabsTrigger>
          <TabsTrigger value="progres">Rivojlanishda</TabsTrigger>
          <TabsTrigger value="archive">Arxivda</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllCourses lang={lang} />
        </TabsContent>
        <TabsContent value="progres">
          <ProgresCourses lang={lang} />
        </TabsContent>
        <TabsContent value="archive">
          <ArchivedCourses lang={lang} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;
