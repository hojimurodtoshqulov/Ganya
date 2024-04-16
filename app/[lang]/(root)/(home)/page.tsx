import FAQ from "@/components/shared/faq";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <Showcase />

      <SubscribtionForm />

      <FAQ />
    </>
  );
}
