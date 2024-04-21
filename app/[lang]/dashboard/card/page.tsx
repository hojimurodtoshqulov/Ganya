import ModuleCard from "@/components/dashboard/module-card";
import Modules from "@/components/dashboard/module-card/module.card";
import { courceCardData } from "@/constants";

export default function Card() {

    return (
        <>
            <Modules />
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-6">
                <ModuleCard title={""} />
                <ModuleCard title={"Курс по грудному вскармливанию"} />
                <ModuleCard title="" />
                <ModuleCard title="" />
            </div>
        </>
    )
}