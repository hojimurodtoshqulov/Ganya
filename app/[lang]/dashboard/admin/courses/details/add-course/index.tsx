import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import AddCourseForm from "./form";
import { postAction } from "@/lib/actions/course.actions";

interface Props {}

const AddNewCourse: FC<Props> = ({}): JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="main" className="h-12 text-sm px-6">
          Yangi kurs qo&apos;shing
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 !rounded-2xl">
        <DialogHeader className="text-2xl text-main-300 font-medium">
          Yangi kurs qo&apos;shing
        </DialogHeader>
        <AddCourseForm action={postAction} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourse;
