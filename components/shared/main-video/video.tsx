"use client";
import { FC } from "react";
import images from "../../../public/images/videoimage.jpg";

const Video: FC<{ videoLink: string }> = ({ videoLink }): JSX.Element => {
  return (
    <div className="my-10 md:my-20 bg-csneutral-100 rounded-2xl md:rounded-[40px] flex items-center justify-center w-full h-[90vh] max-lg:h-[80vh] max-md:h-[60vh] max-sm:h-[25vh]  relative overflow-hidden">
      <video
        className="rounded-2xl md:rounded-[40px] w-full h-full object-fill absolute top-0 left-0"
        controls
        preload="auto"
        poster={images?.src}
      >
        <source src={videoLink} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
