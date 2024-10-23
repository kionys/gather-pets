import { IPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface IPropsPostActions {
  post: IPost;
  userId?: string;
  className?: string;
}

const PostActions = ({ post, className }: IPropsPostActions) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-6", className)}>
      {/* 좋아요 */}
      <Button variant={"ghost"} size={"icon"} className="h-9 w-9">
        <Heart className="text-red-500 fill-red-500" />
        <p>0</p>
      </Button>

      {/* 댓글 */}
      <Link href={`/dashboard/p/${post.id}`}>
        <Button variant={"ghost"} size={"icon"} className="h-9 w-9">
          <MessageCircle />
          <p>0</p>
        </Button>
      </Link>
    </div>
  );
};

export default PostActions;
