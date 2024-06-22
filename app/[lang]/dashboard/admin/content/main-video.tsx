import MainVideoCom from "@/components/dashboard/main-video";
import { FC } from "react";
const MainVideo: FC<{ lang: "uz" | "ru" }> = ({ lang }): JSX.Element => {
  return <div>
    <MainVideoCom lang={lang} />
  </div>;
};

export default MainVideo;
