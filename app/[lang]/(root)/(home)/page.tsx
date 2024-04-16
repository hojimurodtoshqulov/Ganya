import CourceCard from "@/components/shared/cource-card/courceCard";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courceCardData } from "@/constants";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


export default function Home() {
  return (
    <div className="flex items-center justify-center p-10 flex-col gap-10">
      <Showcase />

      <SubscribtionForm />





      <Accordion type="single" collapsible>
        <CourceCard courceCardData={courceCardData} index="item-1" />
      </Accordion>


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
