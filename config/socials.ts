import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@rishabmahor06",
    icon: Icons.gitHub,
    link: "https://github.com/rishabmahor06",
  },
  {
    name: "LinkedIn",
    username: "Rishab Kumar",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/rishab-kumar-b45890316/",
  },
  {
    name: "Instagram",
    username: "@rishab_mahor06",
    icon: Icons.instagram,
    link: "https://www.instagram.com/rishab_mahor06/",
  },
  {
    name: "Gmail",
    username: "connect.rishabmahor@gmail.com",
    icon: Icons.gmail,
    link: "mailto:connect.rishabmahor@gmail.com",
  },
];
