import CourceCard from "@/components/shared/cource-card/courceCard";
import SubscribtionForm from "@/components/shared/subscribtion-form/subscribtionForm";

import Showcase from "@/components/shared/showcase";
import { Accordion } from "@/components/ui/accordion";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
    params: {
        lang: "ru" | "uz"
    }
}

const Page: React.FC<Props> = async ({ params: { lang } }) => {
    const dcitionary = await getDictionary(lang);

    return (
        <div>
            Sample Page


            <div id="about">
                <Showcase dict={dcitionary.home} />
            </div>

            <div className="container my-10 md:my-20" id="courses">
                <Accordion type="single" collapsible>
                    <CourceCard id={"66546dae8914c17f245e754c"} lang={lang} />
                </Accordion>
            </div>


            <div id="contacts">
                <SubscribtionForm dict={dcitionary.home} />
            </div>
        </div>
    );
};

export default Page;