import Image from "next/image";
import Link from "next/link";

import instagram from "@/icons/instagram.png";
import telegram from "@/icons/telegram.png";
import youtube from "@/icons/youtube.png";

const socialMedia = [
  {
    id: 1,
    name: "youtube",
    link: "https://youtube.com",
    icon: youtube,
  },
  {
    id: 2,
    name: "instagram",
    link: "https://instagram.com",
    icon: instagram,
  },
  {
    id: 3,
    name: "telegram",
    link: "https://telegram.org",
    icon: telegram,
  },
];

export default function SocialMediaLink() {
  return (
    <ul className="flex items-center gap-5 list-none z-10">
      {socialMedia.map((item) => (
        <li key={item.id}>
          <Link href={item.link}>
            <Image src={item.icon} alt={item.name} width={36} height={36} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
