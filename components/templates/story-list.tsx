import { Avatar } from "@/components/elements/avatar";

export const StoryList = ({ avatars }: { avatars: any[] }) => {
  return (
    <div className="flex flex-col gap-3 w-full h-auto py-2 my-2 rounded-2xl bg-transparent">
      <div className="ml-4 font-semibold text-xl">Stories</div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab scroll-snap-x ml-4 mr-4">
        {avatars.map((_, i) => (
          <Avatar key={i} isActive />
        ))}
      </div>
    </div>
  );
};
