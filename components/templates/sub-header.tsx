import { BellIcon } from "../icons/bell-icon";
import { MessageIcon } from "../icons/message-icon";
import { SearchIcon } from "../icons/search-icon";

export const SubHeader = () => {
  return (
    <div className="hidden sm:flex gap-2 w-full h-auto py-7 justify-between pl-4 pr-4">
      <div className="relative w-[300px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <div className="flex items-center">
            <SearchIcon />
          </div>
        </span>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="bg-white rounded-full border-gray-500 px-10 w-full border h-[53px] placeholder:pl-2 text-[19px]"
        />
      </div>
      <div className="flex items-center space-x-4">
        <BellIcon isActive={true} />
        <MessageIcon isActive={true} />
      </div>
    </div>
  );
};
