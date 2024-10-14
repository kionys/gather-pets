import useScroll from "@/core/use-scroll";
import { useRouter } from "next/navigation";
import { BellIcon } from "../icons/bell-icon";
import { MessageIcon } from "../icons/message-icon";

export const Header = () => {
  const router = useRouter();
  const { isScrollingUp } = useScroll();

  const onClickLink = (link: string) => {
    router.push(link);
  };

  return (
    <header
      className={`sm:hidden fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out bg-white shadow-md ${
        isScrollingUp ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => onClickLink("/")}>
          Gather Pets
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <BellIcon isActive />
          </div>
          <button className="relative" onClick={() => onClickLink("/")}>
            <MessageIcon isActive />
          </button>
        </div>
      </div>
    </header>
  );
};
