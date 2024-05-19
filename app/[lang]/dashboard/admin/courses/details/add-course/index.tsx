import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import AddCourseForm from "./form";
import { getDictionary } from "@/lib/get-dictionary";

interface Props {
  accessToken?: string;
  lang: "uz" | "ru";
  btn: string;
}

const AddNewCourse: FC<Props> = async ({
  lang,
  accessToken,
  btn,
}): Promise<JSX.Element> => {
  const dict = await getDictionary(lang);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="main" className="h-12 text-sm px-6">
          {btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 !rounded-2xl max-w-[648px]">
        <DialogHeader className="text-2xl text-main-300 font-medium">
          {dict.dashboard.admin.curse.createmodal.title}
        </DialogHeader>
        <AddCourseForm
          method="POST"
          accessToken={accessToken}
          dict={dict.dashboard.admin.curse.createmodal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourse;
