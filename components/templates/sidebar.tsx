import { useCache } from "@/core/hooks/use-cache";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar } from "../elements/avatar";
import { MenuIcon } from "../icons/menu-icon";

export const SideBar = () => {
  const router = useRouter();
  const { setAuth } = useCache();
  const [slideIn, setSlideIn] = useState<boolean>(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const onClickLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/${e.currentTarget.name}`);
  };

  const onClickLogout = () => {
    setAuth(null);
    router.reload();
  };
  return (
    <div
      className={`hidden sm:block w-[400px] bg-white h-[100vh] overflow-scroll overflow-x-hidden pt-7 transition-transform duration-200 ${
        slideIn ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* 로고 */}
      <div className="w-full h-10 flex font-semibold justify-start ml-5 text-xl">Gather Pets</div>
      <div className="w-full flex flex-col justify-center gap-3 mt-20">
        {/* 프로필 */}
        <div className="w-full flex justify-center mb-2">
          <Avatar isActive={false} />
        </div>
        <div className="w-full flex flex-col justify-center mb-5">
          <div className="w-full flex justify-center font-semibold">User Name</div>
          <div className="w-full flex justify-center text-sm text-gray-400">@user</div>
        </div>

        {/* 피드, 팔로워, 팔로잉 */}
        <div className="w-full flex justify-center gap-4 px-3">
          <div className="w-[75px] flex flex-col justify-center items-center">
            <span>126</span>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
          <div className="w-[75px] flex flex-col justify-center items-center">
            <span>1.8k</span>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="w-[75px] flex flex-col justify-center items-center">
            <span>558</span>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>

        {/* 메뉴 */}
        <div className="w-full flex flex-col mt-[70px] px-6 gap-5">
          <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLink}>
            <MenuIcon />
            <p className="text-gray-700 text-md">Feed</p>
          </button>
          <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLink}>
            <MenuIcon />
            <p className="text-gray-700 text-md">Explore</p>
          </button>
          <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLink}>
            <MenuIcon />
            <p className="text-gray-700 text-md">Notification</p>
          </button>
          <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLink}>
            <MenuIcon />
            <p className="text-gray-700 text-md">Direct</p>
          </button>
          <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLink}>
            <MenuIcon />
            <p className="text-gray-700 text-md">Settings</p>
          </button>
          <div className="py-[35px] mt-[35px] border-t">
            <button className="w-full flex justify-start gap-4 items-center" onClick={onClickLogout}>
              <MenuIcon />
              <p className="text-gray-700 text-md">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
