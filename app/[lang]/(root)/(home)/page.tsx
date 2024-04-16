import CurseHelp from "@/components/shared/curs-helped";
import FAQ from "@/components/shared/faq";
import Fits from "@/components/shared/fits";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex justify-center flex-col gap-10 w-full">
      <Showcase />

      <CurseHelp />
      <Fits />
    </div>
  );
}
