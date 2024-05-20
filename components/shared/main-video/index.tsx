import { FC } from "react";
import VideoLink from "@/videos/ganyaVideo.mp4";

const MainVideo: FC = (): JSX.Element => {
  return (
    <div className="my-10 md:my-20 bg-csneutral-100 rounded-2xl md:rounded-[40px] flex items-center justify-center w-full aspect-[3/2] md:aspect-[5/2] relative overflow-hidden">
      <video
        className="rounded-2xl md:rounded-[40px] w-full h-full object-contain absolute top-0 left-0"
        controls
        preload="auto"
      >
        <source src={VideoLink} type="video/mp4" />
      </video>
    </div>
  );
};

export default MainVideo;