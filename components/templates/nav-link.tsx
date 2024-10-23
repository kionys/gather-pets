"use client";

import { cn } from "@/lib/utils";
import { Heart, Home, MessageCircle, PlusSquare, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map(link => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            scroll={false}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;

const links = [
  { name: "대시보드", href: "/dashboard", icon: Home },
  {
    name: "검색",
    href: "/dashboard/search",
    icon: Search,
    hideOnMobile: true,
  },
  // {
  //   name: "릴스",
  //   href: "/dashboard/reels",
  //   icon: Clapperboard,
  // },
  {
    name: "메세지",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    name: "알림",
    href: "/dashboard/notifications",
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: "게시글 생성",
    href: "/dashboard/create",
    icon: PlusSquare,
  },
];
