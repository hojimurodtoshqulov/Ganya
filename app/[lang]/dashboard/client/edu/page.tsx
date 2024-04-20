import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCourses from "./details/my-courses";
import AllCourses from "./details/all-courses";

interface Props {}

const ClientEdu: FC<Props> = ({}): JSX.Element => {
  return (
    <div>
      <Tabs defaultValue="my-courses">
        <TabsList>
          <TabsTrigger value="my-courses">Mening xaridlarim</TabsTrigger>
          <TabsTrigger value="all-courses">Barcha kurslar</TabsTrigger>
        </TabsList>
        <TabsContent value="my-courses">
          <MyCourses />
        </TabsContent>
        <TabsContent value="all-courses">
          <AllCourses />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientEdu;
