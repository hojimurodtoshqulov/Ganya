import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import AllCourses from "./details/all";
import AddNewCourse from "./details/add-course";

const CoursesPage: FC = (): JSX.Element => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-comfortaa font-bold text-[26px] text-main-300">
          Kurslar
        </h3>
        <AddNewCourse />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-3 sm:mb-6">
          <TabsTrigger value="all">Barcha kurslar</TabsTrigger>
          <TabsTrigger value="progres">Rivojlanishda</TabsTrigger>
          <TabsTrigger value="archive">Arxivda</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllCourses />
        </TabsContent>
        <TabsContent value="progres"></TabsContent>
        <TabsContent value="archive"></TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage;
