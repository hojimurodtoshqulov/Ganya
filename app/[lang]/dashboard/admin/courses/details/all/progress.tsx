import CourseCard from "@/components/dashboard/course-card";
import LinkById from "@/components/dashboard/link-by-id";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SquarePen } from "lucide-react";
import { FC } from "react";
import AddCourseForm from "../add-course/form";
import DeleteCourse from "./delete";
import ArchiveCourse from "./archive";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";

interface ICard {
  id: string;
  createdAt: string;
  updatedAt: string;
  titleUz: string;
  titleRu: string;
  image: string;
  descriptionUz: string;
  descriptionRu: string;
  courseStatus: string;
}

async function getData<T>(): Promise<T[] | Error> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/courses/all?status=inProgress",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return new Error("Failed to fetch data");
  }

  return res.json();
}

const ProgresCourses: FC<{ lang: "ru" | "uz" }> = async ({
  lang,
}): Promise<JSX.Element> => {
  const data = await getData<ICard>();
  if (data instanceof Error) {
    return <h2>Failed to fetch data.</h2>;
  }

  const dict = await getDictionary(lang);

  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map(
        ({
          id,
          image,
          titleRu,
          courseStatus,
          descriptionRu,
          descriptionUz,
          titleUz,
        }) => (
          <CourseCard
            image={image}
            title={lang === "uz" ? titleUz : titleRu}
            status={courseStatus}
            id={id}
            key={id}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full bg-white w-8 h-8 flex items-center justify-center cursor-pointer border-none outline-none text-black">
                  <SquarePen width={16} height={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl w-52 text-sm text-csneutral-500">
                <LinkById href={`${id}/update`} className="px-2 block">
                  {dict.dashboard.admin.popover.text1}
                </LinkById>
                <DropdownMenuSeparator />

                <Dialog>
                  <DialogTrigger asChild>
                    <p className="px-2 cursor-pointer">
                      {dict.dashboard.admin.popover.text2}
                    </p>
                  </DialogTrigger>
                  <DialogContent className="p-8 !rounded-2xl max-w-[648px]">
                    <DialogHeader className="text-2xl text-main-300 font-medium">
                      {dict.dashboard.admin.popover.text2}
                    </DialogHeader>
                    <AddCourseForm
                      method="PATCH"
                      id={id}
                      accessToken={cookies().get("accessToken")?.value}
                      defaultValues={{
                        titleRu,
                        titleUz,
                        descriptionRu,
                        descriptionUz,
                        image,
                      }}
                      dict={dict.dashboard.admin.curse.createmodal}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenuSeparator />
                <ArchiveCourse
                  id={id}
                  accessToken={cookies().get("accessToken")?.value}
                  btnText={dict.dashboard.admin.popover.text4}
                />
                <DropdownMenuSeparator />
                <DeleteCourse
                  id={id}
                  accessToken={cookies().get("accessToken")?.value}
                  btnText={dict.dashboard.admin.popover.text5}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </CourseCard>
        ),
      )}
    </div>
  );
};

export default ProgresCourses;
