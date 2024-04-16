import FAQ from "@/components/shared/faq";
import CourceCard from "@/components/shared/cource-card/courceCard";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courceCardData } from "@/constants";


import {
  Accordion,
} from "@/components/shared/cource-card/accordian-card"




export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-10 w-full">
      <Showcase />
      <SubscribtionForm />




      <div className="p-10">



        <Accordion type="single" collapsible>
          <CourceCard courceCardData={courceCardData} index="item-1" />
        </Accordion>
      </div>


      <h2 className="text-3xl text-main-300 font-bold">Template Buttons</h2>
      <div className="flex flex-col justify-center gap-5">
        <Button>default</Button>

        <Button variant={"outline"}>outline</Button>
        <Button
          variant={"outline"}
          className="text-csneutral-500 border-csneutral-500 hover:bg-csneutral-100/80"
          rounded={"full"}
        >
          outline neutral
        </Button>
        <div
          className={buttonVariants({
            variant: "main",
          })}
        >
          text
        </div>
        <div
          className={buttonVariants({
            variant: "filled",
          })}
        >
          text
        </div>
        <Button variant={"main"}>main</Button>
        <Button variant={"filled"}>filled</Button>
        <Input placeholder="hello input" />
      </div>
    </div>
  );
}
