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
import { Accordion } from "@/components/shared/cource-card/accordian-card";

const getData = async () => {
    const api = process.env.NEXT_PUBLIC_BASE_URL + '/courses/single/6634ef485708f2f994e5d899'
    try {
        const req = await fetch(api, { cache: 'no-store' })
        if (!req.ok) throw new Error('Something went wrong')
        const res = await req.json()
        // router.refresh()


        return res
        console.log(res)
    } catch (error: any) {
        console.log(error.message)
    }
}

export default async function Card() {
    const data = await getData();
    console.log(data)




    return (
        <div className="flex flex-col gap-4 space-y-9">



            <h1 className="w-full bg-white h-4 p-3">{'Home page Modules faqat bitta dars uchun '}</h1>
            <Accordion type="single" collapsible>
                <CourseCard data={data} type="" />
            </Accordion>

            <h1 className="w-full bg-white h-4 p-3">{"Home page Modules ko'p darslar uchun "}</h1>
            <div className="my-5  flex lg:grid lg:grid-cols-2 gap-6 " >
                <CourseCard data={data} type="grid" />
                <CourseCard data={data} type="grid" />
                <CourseCard data={data} type="grid" />
                <CourseCard data={data} type="grid" />
            </div>



            <h1 className="w-full bg-white h-4 p-3">{'Client yoki admin page uchun  Modules ko\'p darslar uchun'} </h1>


            <Modules data={data} />




            {/* <div className="my-10 flex flex-wrap gap-3 ">
                <EditShowThings type="showcase" />
                <EditHomeAbout />
                <EditHomeVideo type="video" />
                <EditShowcase />
            </div> */}



            <div className="flex flex-col gap-5 my-4" >
                <SaveLesson link="/" title="Title Saved" />
                <LessonItem link='/' type="create" />
                <LessonItem link="/" type='item' value={{ number: 1, title: 'Salom Dunyo' }} />
            </div>


            <div className="pb-6">
                {/* <CreateTarif method="POST" /> */}
            </div>


            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-6">
                <ModuleCard title={""} />
                <ModuleCard title={"Курс по грудному вскармливанию"} />
                <ModuleCard title="" />
                <ModuleCard title="" />
            </div>
        </div>
    )
}