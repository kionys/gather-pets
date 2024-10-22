"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Activity, Bookmark, ChevronLeft, LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const MoreDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showModeToggle, setShowModeToggle] = useState<boolean>(false);
  console.log(open);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="md:w-full !justify-center space-x-2 !px-3 " onClick={() => setOpen(!open)}>
          <Menu />
          <div className="hidden lg:block">더보기</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn("dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity", !open && "opacity-0")}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>설정</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Activity size={20} />
              <p>활동</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Bookmark size={20} />
              <p>저장됨</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem" onClick={() => setShowModeToggle(true)}>
              <Moon size={20} />
              <p>화면 설정</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
              <LogOut size={20} />
              <p>로그아웃</p>
            </DropdownMenuItem>
          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="font-bold ml-1">화면 설정</p>
              {theme === "dark" ? <Moon size={20} className="ml-auto" /> : <Sun size={20} className="ml-auto" />}
            </div>

            <Label htmlFor="dark-mode" className="menuItem">
              다크모드
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={checked => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdown;
