import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/constants/faq";

const FAQ: FC = (): JSX.Element => {
  return (
    <div className="w-full container">
      <h2 className="text-h2 mb-10">Частые вопросы</h2>
      <Accordion
        type="single"
        collapsible
        className="space-y-2 rounded-[20px] md:rounded-[40px] overflow-hidden"
      >
        {faq.map((f, i) => (
          <AccordionItem value={`item-${i}`} key={f.title + i}>
            <AccordionTrigger>{f.title}</AccordionTrigger>
            <AccordionContent>{f.text}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
