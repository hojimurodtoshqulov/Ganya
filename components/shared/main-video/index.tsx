"use client";
import { FC } from "react";
import VideoLink from "@/videos/ganyaVideo.mp4";
import imaes from "@/images/video-image.jpg";

const MainVideo: FC = (): JSX.Element => {
  return (
    <div className="my-10 md:my-20 bg-csneutral-100 rounded-2xl md:rounded-[40px] flex items-center justify-center w-full h-[100vh] max-lg:h-[80vh] max-md:h-[60vh] max-sm:h-[25vh]  relative overflow-hidden">
      <video
        className="rounded-2xl md:rounded-[40px] w-full h-full object-fill absolute top-0 left-0"
        controls
        preload="auto"
        // poster="./videoimage.jpg"
      >
        <source src={VideoLink} type="video/mp4" />
      </video>
    </div>
  );
};

export default MainVideo;
