import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          bu yerga banner crud ammallarni bajariladi
        </TabsContent>
        <TabsContent value="fikrlar">
          bu yerda fikrlar crud ammallarni bajariladi
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
