"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

function MoreDropdown() {
  const [open, setOpen] = useState<boolean>(false);
  console.log(open);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close the dropdown when the user clicks outside
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // setShowModeToggle(false);
        setOpen(false);
      }
    }

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

      <DropdownMenuContent ref={ref}>
        <DropdownMenuItem>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
