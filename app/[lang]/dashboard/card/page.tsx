import LessonItem from "@/components/dashboard/add-lesson/lesson-item";
import SaveLesson from "@/components/dashboard/add-lesson/save-lesson";
import CreateTarif from "@/components/dashboard/create-tarif";
import ModuleCard from "@/components/dashboard/module-card";
import Modules from "@/components/dashboard/module-card/module.card";
import { courceCardData } from "@/constants";
import CreateLesson from "../admin/courses/[courseId]/[moduleId]/create/page";

export default function Card() {

    return (
        <>

            <div className="h-screen my-30">
                <CreateLesson />
            </div>

            <div className="flex flex-col gap-5 my-4">

                <SaveLesson link="/" title="Title Saved" />

                <LessonItem link='/' type="create" />
                <LessonItem link="/" type='item' value={{ number: 1, title: 'Salom Dunyo' }} />
            </div>


            <div className="pb-6">
                <CreateTarif />
            </div>


            <Modules courceCard={courceCardData} />
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-6">
                <ModuleCard title={""} />
                <ModuleCard title={"Курс по грудному вскармливанию"} />
                <ModuleCard title="" />
                <ModuleCard title="" />
            </div>
        </>
    )
}