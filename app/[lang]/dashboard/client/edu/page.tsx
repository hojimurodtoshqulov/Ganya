import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCourses from "./details/my-courses";
import AllCourses from "./details/all-courses";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
   params: { lang: "uz" | "ru" }
}

const ClientEdu: FC<Props> = async({ params: { lang } }): Promise<JSX.Element> => {
  const dictionary= await getDictionary(lang)
  return (
    <Tabs defaultValue="my-courses">
      <TabsList className="mb-3 sm:mb-6">
        <TabsTrigger value="my-courses">{dictionary.dashboard.client.mycourse }</TabsTrigger>
        <TabsTrigger value="all-courses">{dictionary.dashboard.client.allcourse}</TabsTrigger>
      </TabsList>
      <TabsContent value="my-courses">
        <MyCourses />
      </TabsContent>
      <TabsContent value="all-courses">
        <AllCourses />
      </TabsContent>
    </Tabs>
  );
};

export default ClientEdu;
