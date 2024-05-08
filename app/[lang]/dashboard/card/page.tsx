import LessonItem from "@/components/dashboard/add-lesson/lesson-item";
import SaveLesson from "@/components/dashboard/add-lesson/save-lesson";
import CreateTarif from "@/components/dashboard/create-tarif";
import ModuleCard from "@/components/dashboard/module-card";
import Modules from "@/components/dashboard/module-card/module.card";
import { courceCardData } from "@/constants";
import EditShowThings from "@/components/dashboard/EditShowThings";
import EditHomeVideo from "@/components/dashboard/EditShowThings/homeVideo";
import EditShowcase from "@/components/dashboard/EditShowThings/showcase";
import EditHomeAbout from "@/components/dashboard/EditShowThings/HomeAbout";
import CourseCard from "@/components/shared/cource-card/courceCard";

export default function Card() {

    return (
        <>

            {/* <div className="my-5  flex lg:grid lg:grid-cols-2 gap-3 " >
                <CourseCard courceCard={courceCardData} type="grid" />
                <CourseCard courceCard={courceCardData} type="grid" />
                <CourseCard courceCard={courceCardData} type="grid" />
                <CourseCard courceCard={courceCardData} type="grid" />
            </div> */}


            <div className="h-5 bg-white"></div>

            {/* <div className="my-10 flex flex-wrap gap-3 ">
                <EditShowThings type="showcase" />
                <EditHomeAbout />
                <EditHomeVideo type="video" />
                <EditShowcase />
            </div> */}



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