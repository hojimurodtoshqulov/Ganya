import Carousel from "@/components/shared/carousel";
import FAQ from "@/components/shared/faq";
import Showcase from "@/components/shared/showcase";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";

export default function Home() {
  return (
    <>
      <Showcase />

      <Carousel title="heloo">hello</Carousel>
      <FAQ />
      <SubscribtionForm />
    </>
  );
}
