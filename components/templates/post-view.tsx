"use client";

import { IPost } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import UserAvatar from "./user-avatar";

interface IPropsPostView {
  id: string;
  post: IPost;
}

const PostView = ({ id, post }: IPropsPostView) => {
  // const post = useQuery()

  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const router = useRouter();
  const href = `/dashboard/${post.user.name}`;

  return (
    <Dialog open={isPostModal} onOpenChange={open => !open && router.back()}>
      <DialogTitle>TEST</DialogTitle>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={post.user} />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {post.user.name}
            </Link>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostView;
