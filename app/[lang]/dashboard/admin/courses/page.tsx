import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import AllCourses from "./details/all";
import AddNewCourse from "./details/add-course";
import ProgresCourses from "./details/all/progress";
import ArchivedCourses from "./details/all/archived";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";

const CoursesPage: FC<{ params: { lang: "uz" | "ru" } }> =  async({
  params: { lang },
}) => {

const dictionary = await getDictionary(lang)
  const accessToken = cookies().get("accessToken")?.value;
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <h3 className="font-comfortaa font-bold text-[26px] text-main-300">
          {dictionary.dashboard.admin.topbar.course}  
        </h3>
        <AddNewCourse accessToken={accessToken} lang={lang} btn={dictionary.dashboard.admin.topbar.btn} />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-3 sm:mb-6">
          <TabsTrigger value="all">{dictionary.dashboard.admin.topbar.text1}</TabsTrigger>
          <TabsTrigger value="progres">{dictionary.dashboard.admin.topbar.text2}</TabsTrigger>
          <TabsTrigger value="archive">{dictionary.dashboard.admin.topbar.text3}</TabsTrigger>
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
