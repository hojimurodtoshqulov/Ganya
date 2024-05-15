import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Banner from "@/components/dashboard/kontent";
import Sharhlar from "@/components/dashboard/Отзывы";

const Content: FC = (): JSX.Element => {
  return (
    <div>
      <h3 className="font-comfortaa font-bold text-[26px] text-main-300">
        Kontentlar
      </h3>

      <Tabs defaultValue="all">
        <TabsList className="mb-3 sm:mb-6">
          <TabsTrigger value="banners">Bannerlar</TabsTrigger>
          <TabsTrigger value="fikrlar">Fikrlar</TabsTrigger>
        </TabsList>
        <TabsContent value="banners">
          <Banner />
        </TabsContent>
        <TabsContent value="fikrlar">
          <Sharhlar/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
