"use client";

import { elapsedTime } from "@/hooks/elapsed-time";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { usePostsInfinite } from "@/hooks/use-posts-infinite";
import { IPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import PostActions from "./post-actions";
import PostOptions from "./post-options";
import { PostsSkeleton } from "./skeleton";
import UserAvatar from "./user-avatar";

const Posts = ({ userId }: { userId?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const { posts, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isError, isLoading } = usePostsInfinite();

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timeId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timeId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timeId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  return (
    <>
      {!isLoading && !isError ? (
        posts?.pages?.map((page, i: number) => {
          return (
            <Fragment key={i}>
              {page.data.map((post: IPost, j: number) => {
                return (
                  <div key={j} className="flex flex-col space-y-2.5">
                    <div className="flex items-center justify-between px-3 sm:px-0">
                      <div className="flex space-x-2 items-center">
                        <UserAvatar user={post.user} />
                        <div className="text-sm">
                          <p className="space-x-1">
                            {/* <div className="flex items-center gap-3"> */}
                            <span className="font-semibold">{post.user.name}</span>
                            {/* <div className="flex gap-1"> */}
                            <span className="font-medium text-neutral-500 dark:text-neutral-400 text-xs">•</span>
                            <span className={"font-medium text-neutral-500 dark:text-neutral-400 text-xs"}>
                              {elapsedTime(new Date(post.createdAt).getTime())}
                            </span>
                            {/* </div> */}
                            {/* </div> */}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-white font-medium">
                            {post.user.email}, {post.user.authType}
                          </p>
                        </div>
                      </div>
                      <PostOptions post={post} userId={userId} />
                    </div>

                    <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
                      <Image src={post.fileUrl} alt="Post Image" fill className="sm:rounded-md object-cover" />
                    </Card>

                    <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

                    {post.title && (
                      <>
                        <div className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0">
                          <Link href={`/dashboard/${post.user.name}`} className="font-bold">
                            {post.user.name}
                          </Link>
                          <p>{post.title}</p>
                        </div>
                        {post.content.split("  ").map((content, k) => {
                          return (
                            <p
                              key={k}
                              className="text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0"
                            >
                              {content}
                            </p>
                          );
                        })}
                      </>
                    )}

                    {/* <Comments postId={post.id} comments={post.comments} user={session.user} /> */}
                  </div>
                );
              })}
            </Fragment>
          );
        })
      ) : isLoading ? (
        <>
          <PostsSkeleton />
        </>
      ) : isError ? (
        <div>다시 시도해주세요</div>
      ) : null}

      {(isFetching || hasNextPage || isFetchingNextPage) && <div>loading...</div>}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  );
};

export default Posts;
