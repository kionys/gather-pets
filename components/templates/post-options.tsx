"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface IPropsPostOptions {
  post: IPost;
  userId?: string;
  className?: string;
}

const PostOptions = ({ post, userId, className }: IPropsPostOptions) => {
  const isPostMine = post.userId !== userId;
  return (
    <Dialog>
      <DialogTitle>
        <DialogTrigger asChild>
          <MoreHorizontal className={cn("h-5 w-5 cursor-pointer dark:text-neutral-400", className)} />
        </DialogTrigger>
      </DialogTitle>
      <DialogContent>
        {isPostMine && (
          <Button
            onClick={() => {
              window.alert(`userId: ${userId}, post.id: ${post.id}`);
            }}
          >
            게시글 삭제
          </Button>
        )}

        {isPostMine && (
          <Link scroll={false} href={`/dashboard/p/${post.id}/edit`} className="postOption p-3">
            게시글 수정
          </Link>
        )}
        <Button>신고하기</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostOptions;
