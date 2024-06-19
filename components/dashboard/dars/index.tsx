"use client";
import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import devtoolsDetect from "devtools-detect";

type Props = {
  videoLink: string;
  next?: string;
  prev?: string;
  lang: "uz" | "ru";
};

const Dars = ({ videoLink, next, prev, lang }: Props) => {
  const router = useRouter();

  // const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  // useEffect(() => {
  //   const handleChange = (event: any) => {
  //     setIsDevToolsOpen(event.detail.isOpen);
  //   };

  //   window.addEventListener("devtoolschange", handleChange);

  //   // Initial check for devtools state
  //   if (devtoolsDetect?.isOpen && window) {
  //     setIsDevToolsOpen(true);
  //   }

  //   return () => {
  //     window.removeEventListener("devtoolschange", handleChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   const removeCode = () => {
  //     if (isDevToolsOpen) {
  //       const body = document.querySelector("body");
  //       if (!body) return;
  //       while (body.firstChild) {
  //         body.removeChild(body.firstChild);
  //       }
  //       body.innerHTML += `<h2 style="text-align: center; height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
  //       Oops! You must not use devtools on this page
  //     </h2>`;
  //     }
  //   };
  //   removeCode();

  //   return () => removeCode();
  // }, [isDevToolsOpen]);

  return (
    <div className="w-full p-6 rounded-2xl bg- flex gap-4 flex-col bg-white">
      <div className="w-full aspect-[5/3] bg-csneutral-100 rounded-xl flex justify-center items-center relative">
        <video
          controls
          controlsList="nodownload"
          className="w-full h-full rounded-sm absolute top-0 left-0"
        >
          <source src={videoLink} type="video/mp4" />
        </video>
      </div>
      <div className="btn-container flex justify-between items-center">
        <Button
          variant={"main"}
          size={"default"}
          disabled={!prev}
          onClick={() => router.replace(prev ?? "")}
          className="rounded-[10px] text-sm px-8 py-3 mt-8 max-[500px]:w-full"
        >
          {lang === "ru" ? "Предыдущий урок" : "Avvalgi dars"}
        </Button>
        <Button
          variant={"main"}
          size={"default"}
          disabled={!next}
          onClick={() => router.replace(next ?? "")}
          className="rounded-[10px] text-sm px-8 py-3 mt-8 max-[500px]:w-full"
        >
          {lang === "ru" ? "Следующий урок" : "Keyingi dars"}
        </Button>
      </div>
    </div>
  );
};

export default Dars;
